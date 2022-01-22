import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <main id="main">
      <div class="block landing block-type-banner">
          <div class="block_inner">
              <h1 class="mega-title"><a href="docs/category/o-grande-arquivo-de-piadas-enológicas" class="mega-title-link">O grande arquivo de piadas enológicas do Bebi o Dicionário</a></h1>
          </div>
        </div>
        </main>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={``}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
