// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BEBI O DICIONÁRIO',
  tagline: 'Firulas visuais enófilas',
  url: 'https://bebiodicionario.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'bebiodicionario', // Usually your GitHub org/user name.
  projectName: 'bebiodicionario-com', // Usually your repo name.
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',

        },
        googleAnalytics: {
          trackingID: 'UA-137392997-1',
          anonymizeIP: true,
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'BEBI O DICIONÁRIO',

        items: [
          //          {
          //            to: 'docs/category/o-grande-arquivo-de-piadas-enológicas',
          //            activeBasePath: 'docs',
          //            label: 'Arquivo',
          //            position: 'left',
          //          },
          {
            to: '/random',
            label: '🎲 Post Aleatório',
            position: 'right',
            className: 'navbar-random-link',
          },
          // {to: '/blog', label: 'Lojinha', position: 'left'},
          //          {
          //            href: 'https://instagram.com/bebiodicionario',
          //            label: 'Instagram',
          //            position: 'left',
          //          },
        ],
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },


    }),
};

module.exports = config;
