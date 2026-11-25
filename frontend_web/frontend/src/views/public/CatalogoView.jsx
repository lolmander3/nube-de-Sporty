import React, { useState, useEffect } from 'react'
import ProductModel from '../../models/ProductModel'
import '../../styles/sporting-theme.css'
import '../../styles/PublicHome.css'
import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'

const AboutImage = ({ src, alt, className = 'about-image' }) => {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`${className} about-image-placeholder`}>
        <span>Agrega tu imagen aquí</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

const STATS = [
  { value: '01', label: 'Categorías por edad' },
  { value: '02', label: 'Horarios semanales' },
  { value: '03', label: 'Equipos y torneos' },
  { value: '04', label: 'Catálogo digital' }
]

const PILLARS = [
  {
    title: 'Formación técnica',
    description: 'Entrenamientos pensados por categoría y etapa de desarrollo.'
  },
  {
    title: 'Disciplina y valores',
    description: 'Respeto, compañerismo y compromiso dentro y fuera de la cancha.'
  },
  {
    title: 'Organización clara',
    description: 'Horarios, equipos y torneos gestionados en un solo lugar.'
  },
  {
    title: 'Comunidad Sporting',
    description: 'Una escuela orientada a formar atletas y personas.'
  }
]

const HIGHLIGHTS = [
  {
    title: 'Entrenamiento diario',
    description: 'Sesiones estructuradas para cada categoría.'
  },
  {
    title: 'Competencia interna',
    description: 'Torneos que mantienen la motivación al máximo.'
  },
  {
    title: 'Seguimiento del alumno',
    description: 'Fichas y control por año de nacimiento.'
  }
]

const CatalogoView = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await ProductModel.getAllProducts()
      if (result.success) {
        setProducts(result.data)
      } else {
        setError('No se pudieron cargar los productos')
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="public-home">
      {/* HERO */}
      <section className="ph-hero">
        <div className="ph-hero-inner">
          <div className="ph-hero-copy anim-fade-up">
            <span className="ph-eyebrow">Escuela de microfútbol</span>
            <h1>Forma tus campeones con Sporting</h1>
            <p>
              Plataforma y escuela orientadas a la formación deportiva:
              categorías, horarios, equipos y torneos en un solo lugar.
            </p>
            <div className="ph-hero-actions">
              <button type="button" className="ph-btn ph-btn-primary" onClick={() => scrollTo('catalogo')}>
                Ver catálogo
              </button>
              <button type="button" className="ph-btn ph-btn-ghost" onClick={() => scrollTo('sobre-nosotros')}>
                Conocer más
              </button>
            </div>
          </div>
          <div className="ph-hero-visual anim-fade-up delay-1">
            <AboutImage src={img1} alt="Entrenamiento Sporting Club" className="ph-hero-img" />
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="ph-stats">
        <div className="ph-stats-inner ph-stats-inner--full">
          <div className="ph-stats-grid">
            {STATS.map((item) => (
              <div key={item.value} className="ph-stat-item">
                <span className="ph-stat-num">{item.value}</span>
                <span className="ph-stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="ph-pillars">
        <div className="ph-section-head">
          <span className="ph-eyebrow dark">Por qué Sporting</span>
          <h2>Formación, orden y competencia</h2>
        </div>
        <div className="ph-pillars-grid">
          {PILLARS.map((item) => (
            <article key={item.title} className="ph-pillar-card">
              <div className="ph-pillar-mark" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS / GALLERY STYLE */}
      <section className="ph-highlights">
        <div className="ph-section-head">
          <span className="ph-eyebrow dark">En la cancha</span>
          <h2>Inspiración, método y juego limpio</h2>
        </div>
        <div className="ph-highlights-grid">
          {HIGHLIGHTS.map((item, index) => (
            <article key={item.title} className="ph-highlight-card">
              <div className={`ph-highlight-media ph-highlight-media--${index + 1}`}>
                {index === 0 ? (
                  <AboutImage src={img1} alt={item.title} className="ph-highlight-img" />
                ) : index === 1 ? (
                  <AboutImage src={img2} alt={item.title} className="ph-highlight-img" />
                ) : (
                  <div className="ph-highlight-fallback">Sporting</div>
                )}
              </div>
              <div className="ph-highlight-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ph-cta">
        <div className="ph-cta-inner">
          <div className="ph-cta-copy">
            <h2>De la formación a la competencia</h2>
            <p>
              Organiza categorías, asigna horarios y crea torneos sin perder el foco en tus atletas.
            </p>
            <button type="button" className="ph-btn ph-btn-light" onClick={() => scrollTo('catalogo')}>
              Explorar catálogo
            </button>
          </div>
          <div className="ph-cta-visual">
            <AboutImage src={img2} alt="Comunidad Sporting" className="ph-cta-img" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre-nosotros" className="ph-about">
        <div className="ph-about-inner">
          <div className="ph-about-text">
            <span className="ph-eyebrow dark">Quiénes somos</span>
            <h2>La próxima generación del microfútbol empieza aquí</h2>
            <p>
              Sporting centraliza la administración de tu club: estudiantes por categoría,
              horarios de entrenamiento, equipos, torneos y un catálogo digital para
              padres y alumnos.
            </p>
            <p>
              Disciplina, compañerismo y juego limpio, dentro y fuera de la cancha.
            </p>
            <ul className="ph-about-list">
              <li>Registro de alumnos por año de nacimiento</li>
              <li>Planificación semanal de entrenamientos</li>
              <li>Equipos y torneos internos</li>
            </ul>
          </div>
          <div className="ph-about-visual">
            <AboutImage src={img2} alt="Estudiantes Sporting Club" className="ph-about-img" />
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalogo" className="ph-catalog">
        <div className="ph-section-head">
          <span className="ph-eyebrow dark">Tienda oficial</span>
          <h2>Catálogo</h2>
          <p>Uniformes, inscripciones y todo lo necesario para entrenar.</p>
        </div>

        {loading && <p className="ph-catalog-status">Cargando catálogo...</p>}
        {error && <p className="ph-catalog-status ph-catalog-error">{error}</p>}

        {!loading && !error && (
          products.length === 0 ? (
            <p className="ph-catalog-status">No hay productos disponibles en este momento.</p>
          ) : (
            <div className="ph-catalog-grid">
              {products.map((product) => (
                <article key={product.id} className="ph-product-card">
                  <div className="ph-product-image">
                    {product.imagen ? (
                      <img src={product.imagen} alt={product.nombre} />
                    ) : (
                      <span className="ph-product-noimage">{product.nombre}</span>
                    )}
                  </div>
                  <div className="ph-product-body">
                    <h3>{product.nombre}</h3>
                    <p>{product.descripcion || 'Sin descripción'}</p>
                    <div className="ph-product-footer">
                      <span className="ph-product-price">${product.precio}</span>
                      <button type="button" className="ph-product-btn">
                        Pedir por WhatsApp
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )
        )}
      </section>
    </div>
  )
}

export default CatalogoView

