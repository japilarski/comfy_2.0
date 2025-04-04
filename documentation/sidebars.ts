import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Coding Standards',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: 'coding-standards',
        },
      ],
    },
    {
      type: 'category',
      label: 'Local development',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: 'local-development',
        },
      ],
    },
    {
      type: 'category',
      label: 'API Documentation',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: 'api-documentation',
        },
      ],
    },
  ],
};

export default sidebars;
