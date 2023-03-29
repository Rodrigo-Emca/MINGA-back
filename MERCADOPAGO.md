Configuración de la API de MERCADOPAGO

DESDE MERCADO PAGO: 
1. Crear un usuario en MercadoPago, si es que no se lo tiene ya. 
2. Acceder al siguiente link https://www.mercadopago.com.ar/developers/
3. Crear una aplicación (si no se cuenta ya con una) para iniciar. Luego de esto, MercadoPago developers permitirá crear usuarios de prueba.
4. Crear 2 usuarios de prueba (uno para VENDEDOR, y otro COMPRADOR). Configurar los montos $ que posee cada uno.
5. Iniciar sesión con el usuario de prueba VENDEDOR, crear una nueva aplicación (darle nombre y elegir integración con Checkout API).
6. Tambien esta la opción de Checkout Pro.
7. Una vez creada la aplicación, ACTIVAR CREDENCIALES. (Existen las CREDENCIALES DE PRUEBA, que servirán para simular compras y ventas).
8. Guardamos el ACCESS TOKEN que nos provee las Credenciales. 

DESDE FRONT:
1. Configurar el componente necesario (en mi caso, a partir del componente FOOTER, cambié un botón por un componente llamado DONATIONS).
2. Dentro del componente, creé un array de 3 objetos (uno para cada tipo de donación: $1000, $5000, $10000). Se mapea cada objeto. 
3. Cree otro componente llamado DonationCard donde se ejecutará la petición async. 

DESDE EL BACK:
1. Instalar la libreria de Mercado Pago con npm install mercadopago.
2. Dentro del archivo .env, crear ACCESS_TOKEN= (Access token que dió la credencial de MercadoPago).
3. Dentro de la carpeta routes, en el archivo index.js, importar y configurar la ruta que usaremos para enviar la petición a MercadoPago.
En mi caso: import paymentRouter from './payment.js' y router.use('/payment', paymentRouter). Crear en la carpeta routes, el archivo payment.js
5. Importar EXPRESS y passport (si se quiere agregar la seguridad del token).
6. Configurar la ruta router.post('/', ... ). En mi caso, agrego el passport.authenticate('jwt',{session:false}) para que verifique el acceso por token.
7. Crear un controlador. PaymentControllers.js. Allí importar MercadoPago.
8. configurar mercadopago importado, con mercadopago.configure({access_token: process.env.ACCESS_TOKEN}). De esta forma, se le pasa el accessToken a MercadoPago, protegiendo el Token con el .env
9. Dentro del controlador, createPayment para controlar el proceso de recepción y envio de información.
10. Establecer una const que reciba el req.body (esto se recibe desde el front con la petición).
11. Establecer PREFERENCE. 
Esta es un objeto que contiene: items (un array con un objeto personalizable con la info de los productos que necesitemos), 
back_urls (contiene un objeto con success, failure, y pending para redireccionar luego del exito, fracazo o pendiente),
y binary_mode (para configurar si deseo que la transacción tenga solo opciones de success o failure).
12. Usar mercadopago.preferences.createPayment(preference) para instanciar la preferencia con la info recibida por la petición.
13. De aqui, se obtiene una respuesta que puede ser exitosa (status 200) o de error (status 400).
14. Dentro de la respuesta, se encuentra un link dentro de la propiedad Init_point. Este es el link al que debe redirigir el front, una vez realizada la petición.

DE VUELTA AL FRONT. 
1. Configurar el OnClick en el botón que enviará la petición de donación.
2. Establecer el token y el header para el envio de info.
3. Crear una petición async de tipo post (con axios) a la ruta establecida, pasando el objeto (que contiene los datos del producto) y el headers.
4. Configurar la respuesta, para que si es correcta, redirija al link ofrecido por el init_point que retorna la petición de MercadoPago.
            .then((res)=>window.location.href = res.data.response.body.init_point);    