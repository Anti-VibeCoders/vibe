import os
from supabase import create_client
from django.core.exceptions import ValidationError
from moviepy import VideoFileClip
from io import BytesIO
import tempfile

class SupabaseStorageService:
    def __init__(self):
        self.client = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_KEY")
        )
    
    def validate_file(self, file):
        """Valida tamaño y duracion de video"""
        max_size = int(os.getenv("MAX_FILE_SIZE_MB")) * 1024 * 1024
        
        if file.size > max_size:
            raise ValidationError(f"El archivo exede el limite de {os.getenv("MAX_FILE_SIZE_MB")}MB")
        
        if file.content_type.startswith("video/"):
            with tempfile.NamedTemporaryFile(suffix=os.path.splitext(file.name)[1]) as tmp:
                for chunk in file.chunks():
                    tmp.write(chunk)
                tmp.seek(0)
                
                try:
                    video = VideoFileClip(tmp.name)
                    if video.duration > int(os.getenv("MAX_VIDEO_DURATION")):
                        raise ValidationError(f"El video exede los {int(os.getenv("MAX_VIDEO_DURATION"))//60} minutos")
                except Exception as e:
                    raise ValidationError("Error al procesar el video")
                
    def upload_to_posts(self, file, post_id, user_id):
        return self._upload_file(
            file=file,
            bucket=os.getenv("POSTS_BUCKET"),
            folder=f"user_{user_id}/posts",  # Nueva estructura de carpetas
            prefix=f"post_{post_id}"
        )

    def upload_to_messages(self, file, message_id, user_id):
        return self._upload_file(
            file=file,
            bucket=os.getenv("MESSAGES_BUCKET"),
            folder=f"user_{user_id}/messages",  # Nueva estructura de carpetas
            prefix=f"msg_{message_id}"
        )
    
    def _upload_file(self, file, bucket, folder, prefix):
        """Metodo privado para subida generica"""
        self.validate_file(file)
        
        file_ext = os.path.splitext(file.name)[1]
        file_name = f"{prefix}_{os.urandom(8).hex()}{file_ext}"
        file_path= f"{folder}/{file_name}"
        
        file_bytes = b"".join([chunk for chunk in file.chunks()])
        
        res = self.client.storage.from_(bucket).upload(
            path=file_path,
            file= BytesIO(file_bytes),
            file_options={"content-type": file.content_type}
        )
        
        if res.status_code == 200:
            return self._generate_public_url(bucket, file_path)
        raise Exception("Error al subir archivo")
    
    def _generate_public_url(self, bucket, path):
        return f"{os.getenv("SUPABASE_URL")}/storage/v1/object/public/{bucket}/{path}"