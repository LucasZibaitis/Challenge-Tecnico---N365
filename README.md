¡Claro, aquí tienes el texto para el README!

---

# Gestión de Pagos Bancarios - Desafío Técnico

## Instrucciones de Instalación

Para configurar el entorno de desarrollo local, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Abre una terminal y navega hasta la carpeta `Server`.
3. Ejecuta `npm install` para instalar las dependencias del servidor.
4. Luego, navega hasta la carpeta `Front`.
5. Ejecuta `npm install` para instalar las dependencias del frontend.

## Configuración de la Base de Datos

Para que la base de datos funcione localmente, es necesario modificar las siguientes variables en el archivo `Server/src/db.js`:

- `DATABASE`
- `USERNAME`
- `PASSWORD`
- `HOSTNAME`
- `PORT`

Ajusta estas variables según tu configuración local de PostgreSQL.

## Configuración de la Aplicación

Para utilizar la aplicación localmente, debes cambiar los endpoints de las solicitudes realizadas desde el frontend para que apunten a tu URL local. Esto se hace modificando los archivos siguientes:

- `front/src/app/components/LoginForm.jsx`
- `front/src/app/components/RegisterForm.jsx`
- `front/src/app/registerPayment/page.jsx`
- `front/src/app/payments/page.jsx`

Reemplaza las URLs actuales por tu nueva URL local, por ejemplo: `localhost:3001`.

## Cómo Ejecutar la Aplicación

Una vez que hayas realizado las configuraciones necesarias, puedes iniciar la aplicación localmente de la siguiente manera:

1. Desde la carpeta `Front`, ejecuta `npm run dev` para levantar el frontend.
2. Desde la carpeta `Server`, ejecuta `npm start` para levantar el backend.

Ahora la aplicación debería estar disponible localmente en tu navegador.
