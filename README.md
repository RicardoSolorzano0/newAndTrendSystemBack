# Instrucciones de configuración y ejecución

Para poder hacer las configuraciones necesarias es importante copiar y pegar el archivo .env-template en la misma ruta que se encuentra, para luego rellenar la información que contiene según lo indicado

PORT=5000

URI=La cadena de conexión dada por mongodb online

JWT_SECRET= una password segura para los accessToken

JWT_REFRESH_SECRET=una contraseña segura para los refreshToken

NAMEBD=nombre de la base de datos

JWT_EXPIRES_IN=15m

REFRESH_TOKEN_EXPIRES_IN=7d

SALT_ROUNDS=usualmente tiene que ser de 10

NEWS_API_KEY=la api key de news api

**¿Como obtener URI para mongodb?**

Es necesario ir a https://www.mongodb.com/products/platform/cloud

y tener una cuenta en caso de que no se tenga se tendrá que crear, creara un cluster, indicara el usuario con acceso privilegiado, y hace la conexión con nodejs, en este caso, el usuario será necesario colocarlo al igual que la contraseña del paso anterior.

**¿Como conseguir la apikey de newsapi?**

Ingresara a

https://newsapi.org/

Seguido de darle en obtener api key, luego seguir los pasos que indica el sitio

# Documentación de la API

**Users**

Base Url:http://localhost:5000/users

**/register**

Descripción: Registrar un nuevo usuario

Método: POST

Body:

    {
    "username":"Usuario Test",
    "email":"usuariotest@gmail.com",
    "password":"123456"
    }

Response:

    {
    "user": {
    "id": "67045cf33c2c0f400f1a6347",
    "username": "Usuario Test",
    "email": "usuariotest@gmail.com",
    "rol": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQ1Y2YzM2MyYzBmNDAwZjFhNjM0NyIsImlhdCI6MTcyODMzOTE4NywiZXhwIjoxNzI4MzQwMDg3fQ.SC62d2prbanUEZ7T2Brq8yfmOKAfGrObfGHXtIbfVNg",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQ1Y2YzM2MyYzBmNDAwZjFhNjM0NyIsImlhdCI6MTcyODMzOTE4NywiZXhwIjoxNzI4OTQzOTg3fQ.GPgKiPTgdCeysgI7gGpcfO6Pt8gqVN5wlYcmPVrAeHg"
    }

**/login**

Descripción: Loguearse con un usuario

Método: POST

Body:

    {
    "email":"usuariotest@gmail.com",
    "password":"123456"
    }

Response:

    {
    "user": {
    "id": "67045cf33c2c0f400f1a6347",
    "username": "Usuario Test",
    "email": "usuariotest@gmail.com",
    "rol": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQ1Y2YzM2MyYzBmNDAwZjFhNjM0NyIsImlhdCI6MTcyODMzOTI1NywiZXhwIjoxNzI4MzQwMTU3fQ.sm2jgiE7lSzamAdqOS5p9uM8oBP-NRAQGmOirBqxvIs",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQ1Y2YzM2MyYzBmNDAwZjFhNjM0NyIsImlhdCI6MTcyODMzOTI1NywiZXhwIjoxNzI4OTQ0MDU3fQ.Q491cVEUiFBTUeI_zGJMu1lOA-t_S3FG6oSRwFc4-tw"
    }

**/login**

Descripción: Loguearse con un usuario

Método: POST

Body:

    {
    "email":"usuariotest@gmail.com",
    "password":"123456"
    }

Response:

    {
        "user": {
        "id": "67045cf33c2c0f400f1a6347",
        "username": "Usuario Test",
        "email": "usuariotest@gmail.com",
        "rol": "user"
        },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQ1Y2YzM2MyYzBmNDAwZjFhNjM0NyIsImlhdCI6MTcyODMzOTI1NywiZXhwIjoxNzI4MzQwMTU3fQ.sm2jgiE7lSzamAdqOS5p9uM8oBP-NRAQGmOirBqxvIs",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQ1Y2YzM2MyYzBmNDAwZjFhNjM0NyIsImlhdCI6MTcyODMzOTI1NywiZXhwIjoxNzI4OTQ0MDU3fQ.Q491cVEUiFBTUeI_zGJMu1lOA-t_S3FG6oSRwFc4-tw"
    }

**/refresh-token**

Descripción: Refrescar token

Método: POST

Body:

    {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQ1Y2YzM2MyYzBmNDAwZjFhNjM0NyIsImlhdCI6MTcyODMzOTI1NywiZXhwIjoxNzI4OTQ0MDU3fQ.Q491cVEUiFBTUeI_zGJMu1lOA-t_S3FG6oSRwFc4-tw"
    }

Response:

    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQ1Y2YzM2MyYzBmNDAwZjFhNjM0NyIsImlhdCI6MTcyODMzOTI1NywiZXhwIjoxNzI4MzQwMTU3fQ.sm2jgiE7lSzamAdqOS5p9uM8oBP-NRAQGmOirBqxvIs",
    }

**News**

Base Url:http://localhost:5000/news

**/?topic=technology&page=1**

Descripción: Obtiene noticias sobre un tema específico

Metodo: GET

Response:

    {
    "articles": [
        {
    	    "source": {
    		    "id": null,
    		    "name": "Xataka.com"
    	    },
    	    "author": "Juan Carlos López",
    	    "title": "China está ",
    	    "description": "Las sanciones",
    	    "url": "https://www.",
    	    "urlToImage": "https://i.blogs.es/9e9872/ymtc-ap/840_560.jpeg",
    	    "publishedAt": "2024-09-23T13:03:42Z",
    	    "content": "Las sanciones de E"
        }
    ],
    "totalResults": 239,
    "currentPage": 1,
    "totalPages": 30
    }

**Trends**

Base Url:http://localhost:5000/trends

Descripción: Obtiene tendencias actuales

Método: GET

Response

    {
    "articles": [
        {
    	    "source": {
    		    "id": null,
    		    "name": "Sports Illustrated"
    	    },
        "author": null,
        "title": "Zac Taylor Explains Late Playc",
        "description": null,
        "url": "https://www.s",
        "urlToImage": null,
        "publishedAt": "2024-10-06T20:56:37Z",
        "content": "{\"en\":{\"access_d"
        },
    ],
    "totalResults": 35,
    "currentPage": 1,
    "totalPages": 7
    }

**Analyze**

Base Url:http://localhost:5000/analyze

Descripción: Realiza un análisis simple de sentimiento o extracción de palabras clave de un texto

Método: POST

Body

    {
    "topic": "tecnología",
    "headlines": "bueno perfecto bonito",
    "user":"66fe1a24c5be714361917895"
    }

Response

    {
    "user": "66fe1a24c5be714361917895",
    "topic": "tecnología",
    "results": "positivo",
    "headlines": "bueno perfecto bonito",
    "date": "2024-10-07T22:26:22.630Z",
    "sentiment": 2.33,
    "_id": "6704600e3c2c0f400f1a634a",
    "__v": 0
    }

**History**

Base Url:http://localhost:5000/history

?id=6700ad43a1f5508625d6200d

Descripción: Buscamos el historial por usuario, si el usuario es administrador mostrara la informacion de todos los usuarios

Método: GET

    {
        "history": [
    	    {
    		    "id": "6700b7ecb14d494f1a15d9df",
    		    "userId": "6700ad43a1f5508625d6200d",
    		    "text": "buena acción",
    		    "sentiment": "Neutral",
    		    "keywords": [
    			    "buena",
    			    "acción"
    		    ],
    		    "date": "2024-10-05T03:52:12Z"
    	    },
        ]
    }

# Explicación de la arquitectura y decisiones de diseño:

Este proyecto sigue una arquitectura de **API RESTful**, donde el frontend y el backend están desacoplados. El servidor backend está construido con **Express.js** y utiliza **MongoDB** como base de datos para almacenar datos persistentes, como el historial de análisis de sentimiento.

Componentes Principales

**Backend (API):** Implementado con Node.js y Express.js. Gestiona las rutas de los endpoints y la lógica de negocio.

**Base de datos:** MongoDB se utiliza para almacenar el historial de análisis de los usuarios, aprovechando su flexibilidad con datos no estructurados.

**Análisis de Sentimiento:** Se realiza utilizando la librería **natural** para procesar y analizar el texto, detectando si el sentimiento de una noticia o un fragmento de texto es positivo, negativo o neutral.

**Servicios Externos:** Se integran APIs de noticias, como NewsAPI, para obtener artículos relevantes según el tema seleccionado por el usuario.

# Decisiones de Diseño

Desacoplamiento del Backend y Frontend decidi mantener el backend y el frontend desacoplados para que ambos puedan escalar de forma independiente. Esto también facilita el reemplazo o la actualización de uno sin afectar al otro.

# Consideraciones importantes:

Es importante tomar en cuenta que se hizo las siguientes api

app.use("/users", userRoutes); En donde podremos registrar un nuevo usuario, loguearse y pedir un nuevo accesstoken

app.use("/news", newsRoutes); En donde podremos pedir noticias apartir de un tema en particular

app.use("/trends", trendsRoutes);En donde podremos ver tendencias relevantes

app.use("/analyze", analyzeRoutes); En donde la podemos usar para analizar tanto texto en ingles como en español

app.use("/history", historyRoutes) En donde podemos ver tanto el historial de un usuario como el historial de todos los usuarios en caso de ser administradores
