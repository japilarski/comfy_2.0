import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Comfy',
  tagline: 'Comfy documentation',
  baseUrl: '/',
  url: 'https://japilarski.github.io',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  projectName: 'comfy-2.0',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          routeBasePath: '/',
          path: 'src',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./main.css'),
        },
      },
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            spec: '_openapi/openapi-docs.yml',
            route: '/service/',
          },
        ],
        theme: {
          options: { disableSearch: true, hideDownloadButton: true },
          theme: {},
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        title: 'Comfy',
        logo: {
          alt: 'logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/',
            label: 'Docs',
            docId: 'introduction',
            position: 'left',
            // Avoid applying the active styling when on API docs.
            activeBaseRegex: '^(?:(?!api).)*$',
          },
          {
            href: 'https://github.com/japilarski/comfy_2.0',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: 'Copyright (c) 2025 Jakub Pilarski | Licensed under the MIT License. | Contributions are welcome!',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    },
};

export default config;
