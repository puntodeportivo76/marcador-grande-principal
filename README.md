# P76 · Tablero de básquet

Control del teléfono y pantalla independiente para computador o Smart TV, sin iniciar sesión en ChatGPT.

## Publicar

1. Sube los archivos de esta carpeta a la raíz del repositorio.
2. En Settings → Pages → Build and deployment, elige Deploy from a branch.
3. Selecciona main y / (root), y pulsa Save.
4. GitHub mostrará el enlace publicado cuando termine.

## Usar

Abre index.html en el sitio publicado y pulsa Crear partido. El teléfono abrirá control.html. Abre el enlace de pantalla en la TV o computador: pantalla.html solo muestra el marcador.

Guarda el enlace del control: contiene una clave que autoriza cambios. Comparte únicamente el enlace de pantalla con espectadores. Usa un solo control por partido. Ambos dispositivos necesitan Internet y el reloj del sistema ajustado automáticamente.

Incluye puntos +1/+2/+3 y corrección −1, nombres, faltas, tiempos utilizados, reloj, períodos y prórrogas. Avanzar de período reinicia faltas; reiniciar partido conserva nombres.

## Sincronización

GitHub Pages aloja la interfaz estática. Los partidos se sincronizan mediante el servicio online P76 existente en https://p76-tablero-basket.botanicalmesa8.chatgpt.site. El servicio usa una clave por partido para autorizar cambios y permite lecturas desde GitHub Pages. La web no requiere una cuenta de ChatGPT; la infraestructura del servicio continúa alojada en Sites. Para una migración completa de infraestructura, debe sustituirse API por un servicio como Firebase o un Worker propio.

La carpeta backend incluye una copia del servidor para poder migrarlo. Requiere un Cloudflare Worker con un binding R2 llamado BUCKET. No se ejecuta en GitHub Pages. No contiene credenciales.
