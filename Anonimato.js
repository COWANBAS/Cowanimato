// ==UserScript==
// @name          Cowanimato
// @description   Um UserScript que tenta fazer com que você fique anônimo ao máximo na internet.
// @namespace     CowanNIMO
// @license       CowBas
// @version       2.0
// @author        Cowanbas
// @match         *://*/*
// @run-at        document-start
// ==/UserScript==

(function () {
  'use strict';

  // Função utilitária para redefinir propriedades de objetos
  function redefine(obj, prop, value) {
    try {
      Object.defineProperty(obj, prop, { get: () => value, set: () => { }, configurable: true });
    } catch (e) { }
  }

  // Bloqueia cookies de rastreamento
  redefine(document, 'cookie', '');

  setInterval(() => redefine(document, 'cookie', ''), 1000);

  // Bloqueia Referer
  redefine(document, 'referrer', '');

  // Altera propriedades do navigator
  const fakeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';
  redefine(navigator, 'userAgent', fakeUA);
  redefine(navigator, 'platform', 'Win32');
  redefine(navigator, 'language', 'en-US');
  redefine(navigator, 'languages', ['en-US', 'en']);
  redefine(navigator, 'webdriver', false);
  redefine(navigator, 'plugins', []);
  redefine(navigator, 'hardwareConcurrency', 4);
  redefine(navigator, 'deviceMemory', 8);

  // Impede fingerprinting básico (Canvas, WebGL, Audio)
  function blockFingerprinting() {
    // Canvas
    function protectCanvas(ctx) {
      if (!ctx) return;
      const originalGetImageData = ctx.getImageData;
      ctx.getImageData = function (x, y, w, h) {
        const data = originalGetImageData.call(this, x, y, w, h);
        for (let i = 0; i < data.data.length; i += 4) {
          data.data[i] ^= 0xFF; // altera pixels
        }
        return data;
      };
      // Protege toDataURL e toBlob (técnicas comuns)
      const scramble = str => str.split('').reverse().join('');
      const origToDataURL = ctx.toDataURL;
      ctx.toDataURL = function () {
        return scramble(origToDataURL.apply(this, arguments));
      };
      const origToBlob = ctx.toBlob;
      ctx.toBlob = function (callback, ...args) {
        origToBlob.call(this, function (blob) {
          callback(blob);
        }, ...args);
      };
    }
    if (window.CanvasRenderingContext2D) protectCanvas(CanvasRenderingContext2D.prototype);

    // WebGL
    function fakeWebGL(proto) {
      if (!proto) return;
      const originalGetParameter = proto.getParameter;
      proto.getParameter = function (param) {
        if (param === 37445) return 'Intel OpenGL Fake';
        if (param === 37446) return 'Fake GPU Model';
        return originalGetParameter.call(this, param);
      };
    }
    fakeWebGL(window.WebGLRenderingContext && WebGLRenderingContext.prototype);
    fakeWebGL(window.WebGL2RenderingContext && WebGL2RenderingContext.prototype);

    // Audio
    if (window.OfflineAudioContext) {
      const origStartRendering = OfflineAudioContext.prototype.startRendering;
      OfflineAudioContext.prototype.startRendering = function () {
        this.oncomplete = null;
        return origStartRendering.apply(this, arguments);
      };
    }
  }
  blockFingerprinting();

  // Remove ou neutraliza APIs de rastreamento
  const blockAPIs = [
    'deviceorientation', 'devicemotion', 'geolocation', 'clipboard', 'bluetooth'
  ];
  blockAPIs.forEach(api => {
    if (navigator[api]) redefine(navigator, api, undefined);
  });

  // Remove permissões de rastreamento (Geolocalização, etc)
  if (navigator.permissions) {
    const originalQuery = navigator.permissions.query;
    navigator.permissions.query = function (parameters) {
      if (parameters.name === 'geolocation') {
        return Promise.resolve({ state: 'denied' });
      }
      return originalQuery.apply(this, arguments);
    };
  }

  // Tenta bloquear WebRTC (vaza IP local)
  if (window.RTCPeerConnection) {
    window.RTCPeerConnection = function () {
      throw new Error('WebRTC blocked');
    };
  }

  // Limpa localStorage e sessionStorage
  try { localStorage.clear(); } catch (e) { }
  try { sessionStorage.clear(); } catch (e) { }

  // Remove Service Workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  // Remove event listeners suspeitos
  window.addEventListener = function () { };
  document.addEventListener = function () { };

  // Remove métodos de fingerprinting conhecidos
  if (window.Intl) window.Intl = undefined;
  if (window.screen) {
    redefine(window.screen, 'width', 1920);
    redefine(window.screen, 'height', 1080);
    redefine(window.screen, 'colorDepth', 24);
  }
})();
