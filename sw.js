if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),l={module:{uri:c},exports:o,require:t};i[c]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-c1760cce"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.39018cde.css",revision:null},{url:"assets/index.a9f55318.js",revision:null},{url:"index.html",revision:"5a67ed55605b69ca946f8a983614a78c"},{url:"icons/192.png",revision:"958a9d8df277219d71c45f3b7c303c02"},{url:"icons/192-maskable.png",revision:"b3de50261380c96cf9235d7215b269aa"},{url:"icons/512-maskable.png",revision:"bdd0a60478f9e356350db6f17f2a594f"},{url:"icons/512.png",revision:"ccaed34fc90514a4954b287641091173"},{url:"manifest.webmanifest",revision:"5c83c6baa2faf53cbd4ffaee9b028739"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
