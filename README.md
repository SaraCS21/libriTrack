# LibriTrack

LibriTrack es una aplicación móvil que permite a los usuarios realizar un seguimiento de sus libros leídos y sus películas vistas, crear listas de deseos y saber el punto del libro en el que el usuario se ha podido quedar durante su lectura. 

El proyecto se divide en dos partes: una aplicación frontend desarrollada en Ionic con Angular y un backend en Express, que utiliza Sequelize como ORM y MySQL como base de datos. Ambos componentes están alojados en el mismo repositorio.

## Tabla de Contenidos 📑

1. [Comenzando 🚀](#comenzando)
    - [Pre-requisitos 📋](#pre-requisitos)
    - [Instalación 🔧](#instalación)
2. [Colección de Postman 🔗](#postman)
3. [Construido con 🛠️](#construido)
4. [Autora ✒️](#autora)

<a id="comenzando"></a>
## Comenzando 🚀

Sigue estas instrucciones para obtener una copia local del proyecto y prepararla para desarrollo y pruebas en tu entorno.

<a id="pre-requisitos"></a>
### Pre-requisitos 📋

Necesitas instalar las siguientes herramientas para ejecutar el proyecto localmente:

- Node.js (v14 o superior)
- NPM (v6 o superior)
- Ionic CLI
- Visual Studio Vode (opcional, para trabajar con el código del proyecto)
- MySQL (instalado y configurado)
- MySQL Workbench (opcional, para manejar la base de datos gráficamente)
- Postman (opcional, para probar las API)

<a id="instalacion"></a>
### Instalación 🔧

1. Clona el repositorio en tu máquina local:

```
git clone https://github.com/SaraCS21/libriTrack.git
```

2. Instala las dependencias del frontend (Ionic + Angular):

Navega a la carpeta libriTrackFE/ y ejecuta:

```
cd libriTrackFE/

npm install
```

3. Instala las dependencias del backend (Express + Sequelize):

```
cd libriTrackBE/

npm install
```

4. Configura las variables .env

En el backend hay un fichero .env.example que hay que rellenar y renombrar como .env.

5. Configura la base de datos:

Asegúrate de tener MySQL ejecutándose localmente. Puedes ver los datos en local para conectarte a MySQL Workbench dentro de libriTrackBE/config/db.config.js

Ten en cuenta, la primera vez que ejecutes el backend, que en el libriTrackBE/index.js debe estar comentada la línea 19 y descomentada de la 22 a la 24. Cuando ya tengas creada tu base de datos, debes tenerlo al contrario.

6. Ejecuta el servidor backend:

```
cd libriTrackBE/

npm start
```

El backend estará disponible en http://localhost:8080.

7. Ejecuta la aplicación frontend:

```
cd libriTrackFE/

ionic serve
```

La aplicación frontend estará disponible en http://localhost:8100.

<a id="postman"></a>
## Colección de Postman 🔗

Para facilitar la prueba de los endpoints del backend, puedes acceder a la colección de **Postman** desde el siguiente enlace:

[Acceder a la colección de Postman](https://red-space-909032.postman.co/workspace/Team-Workspace~bb29cf9f-f40c-4ede-875b-7cbba93858c3/collection/25947948-63618921-ea02-49ba-b92b-e745c6bfde20?action=share&creator=25947948)

Este enlace contiene todas las peticiones necesarias para interactuar con la API, incluyendo las rutas de registro, inicio de sesión y operaciones CRUD.


<a id="construido"></a>
## Construido con 🛠️

* [![Ionic](https://img.shields.io/badge/Ionic-%233880FF.svg?style=for-the-badge&logo=Ionic&logoColor=white)](https://ionicframework.com/) - Framework para desarrollo de aplicaciones móviles y web 
* [![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/) - Framework para el desarrollo del frontend
* [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) - Lenguaje utilizado para el desarrollo del frontend
* [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/) - Framework para el backend
* [![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org/) - ORM para manejo de bases de datos
* [![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/) - Sistema de gestión de bases de datos
* [	![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/) - Herramienta para pruebas de API
* [ ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ](https://jwt.io/) - Para la protección de rutas

<a id="autora"></a>
## Autora ✒️

* **Sara del Pino Cabrera Sánchez** - *Trabajo Inicial* - [SaraCS21](https://github.com/SaraCS21)
