if(!self.define){let e,l={};const i=(i,n)=>(i=new URL(i+".js",n).href,l[i]||new Promise((l=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=l,document.head.appendChild(e)}else e=i,importScripts(i),l()})).then((()=>{let e=l[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(l[o])return;let s={};const t=e=>i(e,o),f={module:{uri:o},exports:s,require:t};l[o]=Promise.all(n.map((e=>f[e]||t(e)))).then((e=>(r(...e),s)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"interval-flow"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/interval-flow/css/app.46a3adcb.css",revision:null},{url:"/interval-flow/img/logo.4dbea3ed.png",revision:null},{url:"/interval-flow/index.html",revision:"d2520eb999df284a55b72357f255f131"},{url:"/interval-flow/js/about.ea75b8b7.js",revision:null},{url:"/interval-flow/js/app.74184efd.js",revision:null},{url:"/interval-flow/js/chunk-vendors.2355013a.js",revision:null},{url:"/interval-flow/manifest.json",revision:"75caa32931d9be2b61c5557fdefda05c"},{url:"/interval-flow/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map