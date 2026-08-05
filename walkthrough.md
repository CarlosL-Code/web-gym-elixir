# 💳 Integración de Mercado Pago (Dynamic Checkout)

¡Lo logramos! Hemos transformado los simples botones de tu página en una verdadera máquina de ventas automatizada utilizando el **SDK Oficial de Mercado Pago**.

## 🛠️ ¿Qué implementamos en el código?

### 1. El Backend Oculto (Vercel Serverless Functions)
Hemos creado una función ultrarrápida (API) alojada en `api/create-preference.js`.
- Es un servidor seguro que solo se despierta cuando alguien va a comprar.
- Su trabajo es contactar a Mercado Pago de forma confidencial (usando tu llave secreta) para crear una **"Preferencia de Pago"** con el monto exacto del plan seleccionado.

### 2. El Frontend Interactivo (Angular)
- Eliminamos los links estáticos a WhatsApp en la sección de Planes.
- Ahora, cuando un cliente presiona un plan, verá un pequeño indicador de **"PROCESANDO..."** para que sepa que el sistema está trabajando.
- Inmediatamente, la página lo redirigirá a la pantalla oficial de pago de Mercado Pago, donde podrá usar su tarjeta de crédito, débito o transferencia.

---

> [!CAUTION]
> **PASO FINAL CRÍTICO: Configurar Vercel**
> 
> Actualmente, la página está intentando hacer cobros pero **no sabe a quién enviarle el dinero**, por lo que dará error. Para que funcione en vivo, debes hacer esto una sola vez:
> 
> 1. Inicia sesión en **Mercado Pago Developers** (https://www.mercadopago.cl/developers).
> 2. Crea una aplicación nueva y copia el **"Access Token de Producción"** (un código muy largo).
> 3. Entra a tu panel de **Vercel** > Selecciona tu proyecto (`web-gym-elixir`) > Ve a **Settings** > **Environment Variables**.
> 4. Crea una variable con estos datos:
>    - **Key:** `MP_ACCESS_TOKEN`
>    - **Value:** *(Pega aquí tu Access Token de Mercado Pago)*
> 5. Dale a **Guardar (Save)**.
> 6. Haz un "Redeploy" en Vercel para que tome los cambios. ¡Y listo, a recibir pagos!
