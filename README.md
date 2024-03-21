
# Superhéroes App
¡Bienvenido a la aplicación Superhéroes! Esta aplicación te permite gestionar un listado de superhéroes, ver sus detalles, editarlos y crear nuevos superhéroes. Está construida utilizando la última versión LTS de Angular (16.2.14) con standalone components.

## Funcionalidades
- Ver un listado de superhéroes
- Ver información detallada sobre cada superhéroe
- Editar superhéroes existentes
- Crear nuevos superhéroes
- Eliminar superhéroes

## Empezando
Para empezar con la aplicación Superhéroes, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias ejecutando `npm install`.
3. Inicia el servidor JSON para el backend ejecutando `npm run backend`. Esto iniciará el servidor en el puerto 3000.
4. Inicia el servidor de desarrollo de Angular ejecutando `ng serve`. Esto iniciará el frontend en el puerto 4200.
5. Abre tu navegador web y ve a http://localhost:4200 para acceder a la aplicación superheros.

## Estructura de Carpetas
La aplicación superheros sigue una estructura modular con tres carpetas principales:

- **core:** Contiene elementos esenciales de la aplicación, como servicios y utilidades.
- **features:** Contiene funcionalidades específicas de la aplicación, organizadas en módulos de características.
- **shared:** Contiene elementos compartidos entre diferentes partes de la aplicación, como pipes y componentes.

## Tests
La aplicación superheros incluye pruebas para el _**superherosService**_, _**ImagePipe**_, y _**superheroditComponent**_ utilizando Jasmine. Estas pruebas aseguran que los componentes críticos de la aplicación funcionen según lo esperado y ayudan a mantener la calidad del código.
