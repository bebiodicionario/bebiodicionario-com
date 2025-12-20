import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function HomepageIntro() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className="container home-intro">
      <p>
        <strong>{siteConfig.title} </strong>
        — O grande arquivo digital do @bebiodicionario.
        <br />
        <span style={{ opacity: 0.7 }}>
          Por sete anos, centenas de piadas sobre vinho foram criadas soltas no Instagram. Um dia, os neurônios responsáveis por elas morreram. Agora, uma Inteligência Artificial cuida de mantê-las vivas.
        </span>
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link
          className="button"
          to="/docs/category/o-grande-arquivo-de-piadas-enológicas">
          Acessar Arquivo
        </Link>
        <Link
          className="button"
          to="/docs"
          style={{ marginLeft: '1rem', border: 'none' }}>
          O que é isso?
        </Link>
      </div>
    </section>
  );
}

function FeaturedPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/posts-metadata.json')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (data.length > 0) {
          setPost(data[Math.floor(Math.random() * data.length)]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!post) return null;

  return (
    <section className="container featured-section">
      <div className="row">
        <div className="col col--12">
          <strong>Uma piada aleatória para você:</strong>
        </div>
      </div>
      <div className="row">
        <div className="col col--12">
          {post.image && (
            <div className="featured-image-container">
              <Link to={post.url}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="featured-image"
                />
              </Link>
            </div>
          )}
          {post.legend && (
            <p className="featured-legend">
              {post.legend}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Início"
      description="Firulas visuais enófilas e humor refinado.">
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <HomepageIntro />
        <FeaturedPost />
      </main>
    </Layout>
  );
}
