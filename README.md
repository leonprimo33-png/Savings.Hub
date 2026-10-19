# Savings.Hub

Sitio demostrativo de tienda online con cinco páginas HTML independientes.

## Archivos
- `index.html`: inicio.
- `tienda.html`: catálogo con búsqueda, filtros por categoría y carrito.
- `servicios.html`: servicios y proceso de compra.
- `nosotros.html`: historia, misión, visión, valores y presentación.
- `contacto.html`: formulario con validación nativa y envío de consulta por WhatsApp.
- `css/styles.css`: estilos propios mobile-first, Flexbox, Grid y media queries.
- `js/main.js`: filtros, carrito, almacenamiento local y formularios.

## Antes de publicar
1. Revisá el número de WhatsApp en `js/main.js` y el enlace de `contacto.html`. Está configurado como `5493564305591` a partir del teléfono proporcionado; comprobá que sea correcto.
2. Los productos y sus imágenes gráficas son de demostración. No se muestran precios; se consulta disponibilidad y precio por WhatsApp.
3. Bootstrap 5.3.3 se carga desde CDN, por lo que hace falta conexión a Internet para los componentes y utilidades de Bootstrap.

## Probar localmente
Abrí `index.html` en Firefox. Para una experiencia más confiable, podés instalar Live Server en Visual Studio Code y pulsar **Go Live**. No hace falta depurador para navegar el sitio.

## Publicar en GitHub Pages
1. Creá una cuenta en https://github.com/.
2. Creá un repositorio público llamado `savings-hub` (o un nombre disponible).
3. En el repositorio, elegí **Add file > Upload files** y subí el contenido de esta carpeta, no el ZIP.
4. Confirmá los cambios con **Commit changes**.
5. Abrí **Settings > Pages**.
6. En **Build and deployment**, elegí **Deploy from a branch**.
7. Seleccioná la rama `main` y la carpeta `/ (root)`, y guardá.
8. Esperá a que GitHub Pages publique el sitio. La URL suele ser `https://TU-USUARIO.github.io/savings-hub/`.
9. Probá cada página, los filtros, el carrito y los enlaces desde la URL publicada.

## Nota
GitHub Pages es hosting estático. Este proyecto no procesa pagos reales ni guarda pedidos en un servidor. El carrito se guarda en el navegador del visitante y prepara un mensaje para WhatsApp.
