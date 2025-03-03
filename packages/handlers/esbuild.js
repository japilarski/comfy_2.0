import esbuild from 'esbuild';

const handlers = ['getProductsHandler.ts'];

const buildOptions = {
  entryPoints: handlers.map((handler) => `src/${handler}`),
  outdir: 'dist',
  bundle: true, // Bundles dependencies
  platform: 'node', // Ensures compatibility with Node.js
  format: 'cjs', // Use "cjs" if your project uses CommonJS
  external: ['aws-sdk'], // Add packages here if you want to exclude them from the bundle
};

esbuild.build(buildOptions).catch(() => process.exit(1));
