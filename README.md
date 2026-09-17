# MiPan 2025 C.A.

Tienda estática preparada para GitHub Pages, móvil y escritorio.

## Incluye
- Catálogo responsive con búsqueda y filtros.
- Carrito local y pedido por WhatsApp.
- Inventario local con exportación JSON (PIN inicial `2025`; cámbialo en `assets/app.js` antes de publicar si lo necesitas).
- Modo claro/oscuro, identidad de temporada y PWA instalable.
- Service worker para cargar la aplicación básica sin conexión.
- Imagen de marca con resolución por nombre: `assets/images/14364.svg`. El logo existente `logo.jpg` se usa como imagen principal.
- Google Maps, Google Fonts y datos estructurados para SEO local.

## Publicar
En GitHub: **Settings → Pages → Deploy from a branch → main → /(root)**. No necesita compilación ni servidor.

## Imágenes de productos
Las imágenes de catálogo usan URLs públicas de Unsplash como demostración. Para imágenes propias, súbelas a `assets/images/` y cambia `image` en `assets/app.js`. La tienda no ejecuta código subido desde el inventario: solo acepta datos JSON y renderiza texto sanitizado.

> El PIN y el inventario local no son un sistema de autenticación multiusuario: cualquier usuario con acceso al navegador puede inspeccionarlo. Para administrar ventas reales, conecta un backend con autenticación y reglas de servidor.
