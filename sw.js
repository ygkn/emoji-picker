if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const t=e=>i(e,o),l={module:{uri:o},exports:c,require:t};s[o]=Promise.all(n.map((e=>l[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3ea082d2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.0c4738a8.css",revision:null},{url:"assets/index.3ecd2185.js",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"index.html",revision:"7f4d47f3cb0868a865b84048096b78b0"},{url:"icons/192.png",revision:"958a9d8df277219d71c45f3b7c303c02"},{url:"icons/192-maskable.png",revision:"b3de50261380c96cf9235d7215b269aa"},{url:"icons/512-maskable.png",revision:"bdd0a60478f9e356350db6f17f2a594f"},{url:"icons/512.png",revision:"ccaed34fc90514a4954b287641091173"},{url:"manifest.webmanifest",revision:"5c83c6baa2faf53cbd4ffaee9b028739"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
