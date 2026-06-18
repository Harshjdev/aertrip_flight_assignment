// Babel is only used by Jest (Vite uses esbuild/SWC for the app itself).
// These presets let Jest transpile modern JS + JSX in the test environment.
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
