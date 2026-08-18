import { Injectable } from '@angular/core';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private posts: BlogPost[] = [
    {
      id: 1,
      slug: 'beneficios-entrenamiento-alto-rendimiento-temuco',
      title: '5 Beneficios del Entrenamiento de Alto Rendimiento en Temuco Centro',
      summary: 'Descubre por qué entrenar con maquinaria premium y en un entorno enfocado en resultados puede transformar tu físico y tu salud de manera definitiva.',
      content: `
        <p>Entrenar en un gimnasio de verdad va mucho más allá de levantar pesas sin rumbo. En el corazón de la Región de La Araucanía, específicamente en nuestro gimnasio en Temuco Centro, hemos descubierto que el entrenamiento de alto rendimiento marca una diferencia brutal en los resultados de nuestros atletas y clientes.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">1. Resultados Acelerados y Reales</h3>
        <p>A diferencia de los gimnasios tradicionales donde la gente va a socializar, en un entorno de alto rendimiento todo está diseñado para que progreses. Las máquinas ergonómicas (como nuestras Nautilus y Life Fitness) aseguran que el estímulo muscular sea perfecto, reduciendo el tiempo necesario para ver cambios físicos.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">2. Menor Riesgo de Lesiones</h3>
        <p>Entrenar pesado no es sinónimo de lesionarse. De hecho, el uso correcto de equipamiento biomecánicamente superior ayuda a estabilizar tus articulaciones. Nuestros entrenadores personales en Temuco se enfocan en la técnica antes que en el peso.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">3. Entorno de Motivación Absoluta</h3>
        <p>La energía se contagia. Cuando entrenas rodeado de personas enfocadas en superar sus límites, es imposible no dar tu 100%. Nuestro espacio en Manuel Montt 1027 está diseñado con luces y acústica que te meten "en la zona" apenas cruzas la puerta.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">4. Entrenamiento Funcional Aplicado</h3>
        <p>El alto rendimiento no es solo para fisicoculturistas. Mejora tu calidad de vida diaria, te da más energía para el trabajo y fortalece tu sistema inmunológico, algo clave para los fríos inviernos del sur de Chile.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">5. Comunidad y Soporte</h3>
        <p>No eres un número más. Al unirte a Elixir Gym, te unes a una comunidad que te respalda. Si buscas el mejor gimnasio en Temuco Centro para transformar tu físico, te invitamos a agendar tu clase de prueba gratuita.</p>
      `,
      imageUrl: '/assets/images/fondo-hero-principal.jpg',
      date: '18 Agosto 2026',
      author: 'Equipo Elixir Gym'
    }
  ];

  constructor() { }

  getPosts(): BlogPost[] {
    return this.posts;
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find(post => post.slug === slug);
  }
}
