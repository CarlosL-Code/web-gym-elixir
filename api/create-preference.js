import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { title, price } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: 'Faltan parámetros title y price' });
  }

  try {
    // Inicializar cliente con el Access Token
    // Nota: El cliente deberá definir MP_ACCESS_TOKEN en las variables de entorno de Vercel
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
    
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'membresia',
            title: title,
            quantity: 1,
            unit_price: Number(price),
            currency_id: 'CLP',
          }
        ],
        // Las URLs de retorno después del pago (volver a la página del gimnasio)
        back_urls: {
          success: 'https://web-gym-elixir.vercel.app/',
          failure: 'https://web-gym-elixir.vercel.app/',
          pending: 'https://web-gym-elixir.vercel.app/'
        },
        auto_return: 'approved'
      }
    });

    // Devolvemos el link de pago oficial de Mercado Pago
    res.status(200).json({ init_point: result.init_point });
    
  } catch (error) {
    console.error('Error al crear preferencia de Mercado Pago:', error);
    res.status(500).json({ error: 'Hubo un error al procesar el pago.' });
  }
}
