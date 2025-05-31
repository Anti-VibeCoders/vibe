# Vibe

¡Bienvenido a **Vibe**!  
Una aplicación minimalista diseñada para conectar personas a través de publicaciones, con un estilo moderno, único y muchas posibilidades más.

## 🚀 Objetivo

Crear una plataforma donde los usuarios puedan compartir y descubrir publicaciones, fomentando la conexión y la interacción en un entorno visualmente atractivo y sencillo de usar.

## ✨ Características principales

- **Minimalismo:** Interfaz limpia y moderna, enfocada en la experiencia del usuario.
- **Conexión:** Facilita la interacción entre personas mediante publicaciones.
- **Estilo único:** Diseño visual distintivo y actual.
- **Escalable:** Pensada para crecer y añadir muchas más funcionalidades en el futuro.

## 📱 ¿Por qué Vibe?

Queremos que Vibe sea más que una simple red social. Buscamos crear un espacio donde cada publicación inspire, conecte y aporte valor a la comunidad.

## 🛠️ Estado del proyecto

Actualmente en desarrollo.  
¡Pronto habrá más novedades!

---

¿Te interesa colaborar o tienes ideas?  
¡No dudes en abrir un issue o contactarnos!

---

## 🔄 Guía para Resolver Conflictos en Git

### ¿Qué son los conflictos en Git?

Los conflictos ocurren cuando dos personas cambian la misma parte de un archivo y Git no sabe qué versión conservar. Esto suele pasar cuando:

- Haces `git merge` o `git pull` para combinar cambios
- Trabajas en la misma sección de código que otra persona

¡No te preocupes! Los conflictos son normales cuando varias personas trabajan en un proyecto. Aprender a resolverlos es una habilidad importante.

### ¿Cómo se ven los conflictos?

Git marca los conflictos en los archivos con unas líneas especiales:

```
<<<<<<< HEAD
Este es tu código (lo que tienes en tu rama)
=======
Este es el código nuevo (lo que viene de la otra rama)
>>>>>>> nombre-de-la-otra-rama
```

**Importante:** Estas marcas (<<<<<<< HEAD, =======, >>>>>>> nombre-de-la-otra-rama) NO son parte de tu código. Git las añade para mostrar el conflicto y debes eliminarlas cuando lo resuelvas.

### Cómo resolver conflictos: paso a paso

1. **Ver qué archivos tienen conflictos:**
   ```
   git status
   ```
   Verás algo como "Unmerged paths" o "Rutas no fusionadas"

2. **Abrir los archivos con conflictos** en tu editor (VS Code, por ejemplo)

3. **Editar los archivos para resolver el conflicto:**
   - Busca las secciones con las marcas de conflicto (<<<<<<< HEAD, =======, >>>>>>>)
   - Decide qué código quieres mantener: el tuyo, el otro, o una mezcla de ambos
   - Elimina las marcas de conflicto y deja solo el código que quieres conservar

4. **Guardar los cambios** en los archivos

5. **Marcar el conflicto como resuelto:**
   ```
   git add nombre-del-archivo
   ```

6. **Completar la fusión:**
   ```
   git commit -m "Resuelto conflicto en [nombre-archivo]"
   ```

### Consejos para evitar conflictos

- **Actualiza tu rama con frecuencia:**
  ```
  git pull origin main
  ```

- **Divide tu trabajo** en archivos diferentes cuando sea posible

- **Haz commits pequeños y frecuentes** para reducir los cambios en cada fusión

- **Habla con tu equipo** sobre quién está trabajando en qué archivos

### Comandos útiles

- Para cancelar una fusión con conflictos:
  ```
  git merge --abort
  ```

- Para ver las diferencias:
  ```
  git diff
  ```

¡Con un poco de práctica, resolver conflictos se volverá sencillo! Recuerda que todos los desarrolladores, incluso los más experimentados, enfrentan conflictos regularmente.
