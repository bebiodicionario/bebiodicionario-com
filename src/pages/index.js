import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

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

  if (loading) return (
    <div className="text--center margin-vert--xl">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="margin-top--sm text--muted">Carregando firulas visuais enófilas, microagressões oxidativas e enopolêmicas...</p>
    </div>
  );

  if (error || !post) return null;

  return (
    <section className={clsx('margin-vert--xl', styles.featuredSection)}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h2 className={styles.sectionTitle}>Uma piada aleatória para você</h2>

        <div className={styles.featuredCard}>
          {post.image && (
            <div className={styles.cardImageContainer}>
              <img
                src={post.image}
                alt={post.title}
                className={styles.cardImage}
              />
            </div>
          )}
          <div className={styles.cardBody}>
            {post.legend && (
              <div className="text--center margin-vert--md">
                <p className={styles.cardLegend}>
                  "{post.legend}"
                </p>
              </div>
            )}
            <div className="text--center margin-top--lg">
              <Link to={post.url} className={clsx('button button--outline button--primary button--lg', styles.ctaButton)}>
                Ver explicação completa
              </Link>
            </div>
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
      description="Firulas visuais enófilas e humor refinado.">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--lg text--center">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <p style={{ fontSize: '1.4rem', fontWeight: '400', color: '#666', lineHeight: '1.8' }}>
                Bem-vindo ao <strong>Bebi o Dicionário</strong>.
                Por sete anos essas piadas foram criadas soltas no Instagram. Daí as piadas morreram, mas passam bem. Uma Inteligência Artificial agora cuida de manter as piadas vivas.
              </p>
            </div>
            <div className={styles.buttons}>
              <Link
                className={clsx('button button--primary button--lg', styles.ctaButton)}
                to="/docs/category/o-grande-arquivo-de-piadas-enológicas">
                Entrar no Arquivo
              </Link>
            </div>
          </div>
        </div>
        <FeaturedPost />
      </main>
    </Layout>
  );
}
