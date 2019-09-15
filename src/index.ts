import Game from './game';

if (module.hot) {
  module.hot.accept(() => {
    const HMRGame = require('./game.ts').default;
    const hmrGame = new HMRGame(); // eslint-disable-line
  });
}

const game = new Game(); // eslint-disable-line

// service worker bit
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}
