import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/category/o-grande-arquivo-de-piadas-enológicas">
            Entrar no Arquivo
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeaturedPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/posts-metadata.json')
      .then(res => {
        if (!res.ok) throw new Error("Metadata not found");
        return res.json();
      })
      .then(data => {
        if (data.length > 0) {
          const random = data[Math.floor(Math.random() * data.length)];
          setPost(random);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text--center margin-vert--xl">Carregando destaque...</div>;
  if (error || !post) return null;

  return (
    <section className="margin-vert--xl fade-in">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="text--center margin-bottom--lg" style={{ fontSize: '2rem' }}>Destaque do Momento</h2>

        <div className="card shadow--lg" style={{ border: '1px solid var(--ifm-color-emphasis-200)' }}>
          {post.image && (
            <div className="card__image">
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: '100%',
                  maxHeight: '600px',
                  objectFit: 'contain',
                  backgroundColor: '#f5f5f5'
                }}
              />
            </div>
          )}
          <div className="card__body padding--lg">
            <h3 className="text--center margin-bottom--md" style={{ fontSize: '1.5rem' }}>
              <Link to={post.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                {post.title}
              </Link>
            </h3>
            {post.legend && (
              <div className="text--center">
                <p style={{
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  color: 'var(--ifm-color-emphasis-700)'
                }}>
                  "{post.legend}"
                </p>
              </div>
            )}
          </div>
          <div className="card__footer text--center padding-bottom--lg">
            <Link to={post.url} className="button button--primary button--lg button--block">
              Ver explicação completa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Início`}
      description="O maior arquivo de piadas enológicas da internet.">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl text--center">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <p style={{ fontSize: '1.5em', fontWeight: '300' }}>
                Bem-vindo ao <strong>Bebi o Dicionário</strong>, o maior arquivo de piadas enológicas da internet.
                Aqui catalogamos, explicamos e eternizamos as besteiras que eu posto no Instagram.
              </p>
            </div>
          </div>
        </div>
        <FeaturedPost />
      </main>
    </Layout>
  );
}
