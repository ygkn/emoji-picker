if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const d=e=>i(e,r),a={module:{uri:r},exports:o,require:d};s[r]=Promise.all(n.map((e=>a[e]||d(e)))).then((e=>(c(...e),o)))}}define(["./workbox-3ea082d2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-2761587a.js",revision:"d1ba3e9383f6cbafbea9c8a4c0364a5d"},{url:"assets/index-ecfc5a78.css",revision:"dbb00fe69cdb06d807ce472b63bf46de"},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:"b8c9397a5a7bdb9aee024d2c57d41845"},{url:"index.html",revision:"96c293c6e8fe1f8517e4c2d0f7e256c5"},{url:"icons/192.png",revision:"958a9d8df277219d71c45f3b7c303c02"},{url:"icons/192-maskable.png",revision:"b3de50261380c96cf9235d7215b269aa"},{url:"icons/512-maskable.png",revision:"bdd0a60478f9e356350db6f17f2a594f"},{url:"icons/512.png",revision:"ccaed34fc90514a4954b287641091173"},{url:"manifest.webmanifest",revision:"5c83c6baa2faf53cbd4ffaee9b028739"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
