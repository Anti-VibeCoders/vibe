import os
from supabase import create_client
from django.core.exceptions import ValidationError
from moviepy import VideoFileClip
from io import BytesIO
import tempfile
import logging
import uuid

logger = logging.getLogger(__name__)


class SupabaseStorageService:
    def __init__(self):
        self.client = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_SERVICE_KEY")
        )
    
    def validate_file(self, file):
        """Valida tamaño y tipo de archivo en memoria"""
        max_size = int(os.getenv("MAX_FILE_SIZE_MB")) * 1024 * 1024
        
        # Obtener content_type
        content_type = self._get_content_type(file)
        
        if file.size > max_size:
            raise ValidationError(f"El archivo excede el límite de {os.getenv('MAX_FILE_SIZE_MB')}MB")
        
        if content_type.startswith("video/"):
            self._validate_video(file, content_type)

    def _get_content_type(self, file):
        """Obtiene el content_type de diferentes tipos de objetos file"""
        if hasattr(file, 'content_type'):
            return file.content_type
        if hasattr(file, 'file') and hasattr(file.file, 'content_type'):
            return file.file.content_type
        
        import mimetypes
        return mimetypes.guess_type(file.name)[0] or 'application/octet-stream'

    def _validate_video(self, file, content_type):
        """Valida videos usando un archivo temporal (requerido por VideoFileClip)"""
        with tempfile.NamedTemporaryFile(suffix=os.path.splitext(file.name)[1]) as tmp:
            for chunk in file.chunks():
                tmp.write(chunk)
            tmp.seek(0)
            
            try:
                video = VideoFileClip(tmp.name)
                if video.duration > int(os.getenv("MAX_VIDEO_DURATION")):
                    raise ValidationError(f"El video excede los {int(os.getenv('MAX_VIDEO_DURATION'))//60} minutos")
            except Exception as e:
                raise ValidationError("Error al procesar el video")

    def upload_to_posts(self, file, post_id, user_id):
        return self._upload_file(
            file=file,
            bucket=os.getenv("POSTS_BUCKET"),
            folder=f"user_{user_id}/posts",
            prefix=f"post_{post_id}"
        )
        
    def upload_to_message(self, file, message_id, user_id):
        return self._upload_file(
            file=file,
            bucket=os.getenv("MESSAGES_BUCKET"),
            folder=f"user_{user_id}/message",
            prefix=f"message_{message_id}"
        )

    def _upload_file(self, file, bucket, folder, prefix):
        """Metodo privado para subida generica"""
        try:
            # 1. Obtener propiedades del archivo
            file_name = getattr(file, 'name', 'file')
            file_ext = os.path.splitext(file_name)[1]
            content_type = self._get_content_type(file)
            
            # 2. Leer el contenido como bytes
            if hasattr(file, 'read'):
                file.seek(0)  # Rebobinar si es necesario
                file_content = file.read()
            else:
                file_content = b"".join([chunk for chunk in file.chunks()])
            
            # 3. Crear nombre único
            unique_name = f"{prefix}_{uuid.uuid4().hex}{file_ext}"
            file_path = f"{folder}/{unique_name}"
            
            # 4. Subir a Supabase (versión que acepta bytes)
            res = self.client.storage.from_(bucket).upload(
                path=file_path,
                file=file_content,  # Pasar los bytes directamente
                file_options={"content-type": content_type}
            )
            
            if hasattr(res, 'error') and res.error:
                raise Exception(f"Error al subir: {res.error}")
                
            return self._generate_public_url(bucket, file_path)
            
        except Exception as e:
            logger.error(f"Error en _upload_file: {str(e)}")
            raise

    def _generate_public_url(self, bucket, path):
        return f"{os.getenv('SUPABASE_URL')}/storage/v1/object/public/{bucket}/{path}"


class SupabaseUploadUserFill:
    def __init__(self):
        self.client = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_SERVICE_KEY")
        )
    
    def validate_file(self, file):
        """Valida tamaño y tipo de archivo en memoria"""
        max_size = int(os.getenv("MAX_FILE_SIZE_MB")) * 1024 * 1024
        
        # Obtener content_type
        content_type = self._get_content_type(file)
        
        if file.size > max_size:
            raise ValidationError(f"El archivo excede el límite de {os.getenv('MAX_FILE_SIZE_MB')}MB")
        
        if content_type.startswith("video/"):
            raise ValidationError(f"El arvhivo subido no debe ser un video {content_type}")

    def delete_file(self, file_url):
        try:
            # Extraer bucket y path de la URL
            parts = file_url.split("/object/public/")
            
            if len(parts) != 2:
                raise ValueError("Invalid file URL format")
            
            bucket_path = parts[1].split('/')
            bucket = bucket_path[0]
            file_path = "/".join(bucket_path[1:])
            
            # Eliminar el archivo
            res = self.client.storage.from_(bucket).remove([file_path])
            
            if hasattr(res, "error") and res.error:
                raise Exception(f"Supabase deletion error: {res.error}")
        except Exception as e:
            logger.error(f"Error deleting file {file_url}: {str(e)}")
            raise


    def _get_content_type(self, file):
        """Obtiene el content_type de diferentes tipos de objetos file"""
        if hasattr(file, 'content_type'):
            return file.content_type
        if hasattr(file, 'file') and hasattr(file.file, 'content_type'):
            return file.file.content_type
        
        import mimetypes
        return mimetypes.guess_type(file.name)[0] or 'application/octet-stream'

    def upload_avatar_user(self, file, user_id):
        return self._upload_file(
            file=file,
            bucket=os.getenv("AVATAR_BUCKET"),
            folder=f"user_{user_id}/avatar",
            prefix=f"avatar_{user_id}"
        )
        
    def upload_background_user(self, file, user_id):
        return self._upload_file(
            file=file,
            bucket=os.getenv("BACKGROUND_BUCKET"),
            folder=f"user_{user_id}/background",
            prefix=f"background_{user_id}"
        )
    
    def _upload_file(self, file, bucket, folder, prefix):
        """Metodo privado para subida generica"""
        try:
            # 1. Obtener propiedades del archivo
            file_name = getattr(file, 'name', 'file')
            file_ext = os.path.splitext(file_name)[1]
            content_type = self._get_content_type(file)
            
            # 2. Leer el contenido como bytes
            if hasattr(file, 'read'):
                file.seek(0)  # Rebobinar si es necesario
                file_content = file.read()
            else:
                file_content = b"".join([chunk for chunk in file.chunks()])
            
            # 3. Crear nombre único
            unique_name = f"{prefix}_{uuid.uuid4().hex}{file_ext}"
            file_path = f"{folder}/{unique_name}"
            
            # 4. Subir a Supabase (versión que acepta bytes)
            res = self.client.storage.from_(bucket).upload(
                path=file_path,
                file=file_content,  # Pasar los bytes directamente
                file_options={"content-type": content_type}
            )
            
            if hasattr(res, 'error') and res.error:
                raise Exception(f"Error al subir: {res.error}")
                
            return self._generate_public_url(bucket, file_path)
            
        except Exception as e:
            logger.error(f"Error en _upload_file: {str(e)}")
            raise

    def _generate_public_url(self, bucket, path):
        return f"{os.getenv('SUPABASE_URL')}/storage/v1/object/public/{bucket}/{path}"