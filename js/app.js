/* ACE VOGUE - shared logic. Edit PRODUCTS and CONFIG below. */
const CONFIG={
  email:'hello@acevogue.example',            // PLACEHOLDER: contact form opens a mail draft to this address
  phone:'Phone number to be added',
  address:'Address to be added',
  social:{Instagram:'#',TikTok:'#',X:'#',WhatsApp:'#'} // PLACEHOLDER: replace '#' with real links (icons to follow)
};
const SIZES=['S','M','L','XL'];
const PRODUCTS=[ // PLACEHOLDER prices (NGN) and descriptions: edit freely
 {id:'silence-tee',name:'Silence. Strategy. Success. Tee',cat:'Tops',price:25000,color:'White',colorHex:'#F2F3F0',date:3,dark:false,
  a:'img/tee-ss-front.png',b:'img/tee-ss-back.png',
  desc:'An oversized white tee. A small spade mark sits on the chest. Across the back, the line the label is built on: Silence. Strategy. Success.',
  det:[['Fit','Oversized (as shown in photography)'],['Front','Spade mark, chest'],['Back','Silence. Strategy. Success.'],['Fabric and care','Details to be added']]},
 {id:'logo-tee',name:'Ace Vogue Logo Tee',cat:'Tops',price:22000,color:'White',colorHex:'#F2F3F0',date:2,dark:false,
  a:'img/tee-logo-front.png',b:'img/tee-logo-back.png',
  desc:'An oversized white tee with the Ace Vogue mark and wordmark in black on the chest. A clean, plain back.',
  det:[['Fit','Oversized (as shown in photography)'],['Front','Ace Vogue mark and wordmark, chest'],['Back','Plain'],['Fabric and care','Details to be added']]},
 {id:'denim-knickers',name:'Washed Denim Knickers',cat:'Bottoms',price:38000,color:'Washed black',colorHex:'#2a2c30',date:1,dark:true,
  a:'img/knicker-front.png',b:'img/knicker-back.png',
  desc:'Knee-length black denim with a washed finish and a wide leg. A silver chain hangs from the belt loop, the Ace Vogue mark sits on the front, and a woven label finishes the back waistband.',
  det:[['Length','Knee-length (as shown in photography)'],['Detail','Silver chain, front logo, back label'],['Colour','Washed black'],['Fabric and care','Details to be added']]}
];
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>'\u20A6'+n.toLocaleString('en-NG');
const byId=id=>PRODUCTS.find(p=>p.id===id);
let cart=[];try{cart=JSON.parse(localStorage.getItem('av_cart'))||[]}catch(e){}
const page=document.body.dataset.page;
if(!window.gsap||!window.ScrollTrigger)document.documentElement.classList.add('flat'); // graceful fallback if the animation library cannot load

/* ---------- shell ---------- */
const nav=[['shop.html','Shop','shop'],['about.html','About','about'],['contact.html','Contact','contact']];
document.body.insertAdjacentHTML('afterbegin',`<a class="sm" href="#main" style="position:absolute;left:-999px">Skip to content</a>
<header class="hd"><a class="lg" href="index.html" aria-label="Ace Vogue home"><img src="img/logo.png" alt="Ace Vogue"></a>
<div class="rt"><nav id="nv" aria-label="Main">${nav.map(n=>`<a href="${n[0]}" class="${page===n[2]?'on':''}">${n[1]}</a>`).join('')}</nav>
<button class="ct" id="oc" aria-label="Open cart">Cart (<span id="cc">0</span>)</button><button class="bg" id="bg" aria-label="Menu" aria-expanded="false"><i></i><i></i></button></div></header>
<div class="cur" id="cur"></div><div id="shd"></div>
<aside id="cart" aria-label="Cart" aria-hidden="true"><header><h2>Cart</h2><button class="lnk" id="xc">Close</button></header><ul id="cl"></ul>
<div class="ctot"><div><span>Subtotal</span><span id="st">${money(0)}</span></div><button class="btn solid" id="co">Checkout</button><small id="cn" role="status"></small></div></aside>`);
const so=Object.entries(CONFIG.social).map(([k,v])=>`<li><a href="${v}" ${v==='#'?'aria-disabled="true" title="Link coming soon"':'target="_blank" rel="noopener"'}>${k}</a></li>`).join('');
document.body.insertAdjacentHTML('beforeend',`<footer class="ft"><div class="tp"><div><img src="img/logo.png" alt="Ace Vogue" style="height:90px;margin-bottom:18px"><p>Silence. Strategy. Success.</p></div>
<div><h4>Explore</h4><ul><li><a href="shop.html">Shop</a></li><li><a href="shop.html?cat=Tops">Tops</a></li><li><a href="shop.html?cat=Bottoms">Bottoms</a></li></ul></div>
<div><h4>Brand</h4><ul><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li></ul></div>
<div><h4>Follow</h4><ul>${so}</ul></div></div><div class="big" aria-hidden="true">Ace Vogue</div>
<div class="note">&copy; <span id="yr"></span> Ace Vogue. Checkout requires payment integration (see README).</div></footer>`);
$('#yr').textContent=new Date().getFullYear();
$$('a[aria-disabled]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
const mainEl=$('main');if(mainEl)mainEl.id='main';

/* menu, transitions */
$('#bg').onclick=()=>{const o=document.body.classList.toggle('nav-open');$('#bg').setAttribute('aria-expanded',o)};
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||e.metaKey||e.ctrlKey||a.hasAttribute('aria-disabled'))return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin||(u.pathname===location.pathname&&u.search===location.search))return;
 e.preventDefault();$('#cur').classList.add('in');setTimeout(()=>location.href=a.href,400)});
addEventListener('pageshow',()=>{$('#cur').classList.remove('in');document.body.classList.remove('nav-open')});

/* ---------- cart ---------- */
const save=()=>{try{localStorage.setItem('av_cart',JSON.stringify(cart))}catch(e){}render()};
function render(){
 $('#cc').textContent=cart.reduce((s,i)=>s+i.qty,0);
 $('#cl').innerHTML=cart.length?cart.map((i,n)=>{const p=byId(i.id);return `<li><img src="${p.a}" alt=""><div><h3>${p.name}</h3><small>Size ${i.size} / ${money(p.price)}</small><div class="q"><button data-q="${n}" data-d="-1" aria-label="Decrease">&minus;</button><span>${i.qty}</span><button data-q="${n}" data-d="1" aria-label="Increase">+</button></div></div><button class="x" data-r="${n}">Remove</button></li>`}).join(''):'<li style="display:block;border:0;color:var(--frost)">Your cart is empty. <a class="lnk" href="shop.html">Browse the shop</a></li>';
 $('#st').textContent=money(cart.reduce((s,i)=>s+i.qty*byId(i.id).price,0));
}
const openCart=o=>{$('#cart').classList.toggle('open',o);$('#shd').classList.toggle('open',o);$('#cart').setAttribute('aria-hidden',!o);if(o)$('#xc').focus()};
$('#oc').onclick=()=>openCart(true);$('#xc').onclick=$('#shd').onclick=()=>openCart(false);
addEventListener('keydown',e=>{if(e.key==='Escape')openCart(false)});
$('#cl').addEventListener('click',e=>{const q=e.target.dataset;
 if(q.q!==undefined){cart[q.q].qty+=+q.d;if(cart[q.q].qty<1)cart.splice(q.q,1);save()}
 if(q.r!==undefined){cart.splice(q.r,1);save()}});
$('#co').onclick=()=>{$('#cn').textContent=cart.length?'Payment is not connected yet. Add Paystack or Flutterwave to enable checkout.':'Add something to your cart first.'};
function add(id,size,qty=1){const f=cart.find(i=>i.id===id&&i.size===size);f?f.qty+=qty:cart.push({id,size,qty});save();$('#cn').textContent='';openCart(true)}
render();

/* ---------- cards + tilt ---------- */
const card=p=>`<article class="card" data-id="${p.id}"><a class="cm ${p.dark?'lt':''}" data-tilt href="product.html?id=${p.id}" aria-label="${p.name}"><img class="a" src="${p.a}" alt="${p.name}, front"><img class="b" src="${p.b}" alt="${p.name}, back" loading="lazy"></a>
<div class="ci"><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><span>${money(p.price)}</span></div>
<div class="sz" role="group" aria-label="Size">${SIZES.map(s=>`<button aria-pressed="${s==='M'}" data-s="${s}">${s}</button>`).join('')}</div><button class="btn" data-add>Add to cart</button></article>`;
document.addEventListener('click',e=>{
 const s=e.target.closest('.card .sz button');if(s){$$('button',s.parentNode).forEach(b=>b.setAttribute('aria-pressed',b===s))}
 if(e.target.closest('[data-add]')&&e.target.closest('.card')){const c=e.target.closest('.card');add(c.dataset.id,$('[aria-pressed=true]',c).dataset.s)}});
document.addEventListener('mousemove',e=>{const t=e.target.closest&&e.target.closest('[data-tilt]');if(!t||matchMedia('(hover:none)').matches)return;
 const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 $$('img',t).forEach(i=>i.style.transform=`rotateY(${x*14}deg) rotateX(${-y*10}deg) scale(1.04)`)});
document.addEventListener('mouseout',e=>{const t=e.target.closest&&e.target.closest('[data-tilt]');if(t)$$('img',t).forEach(i=>i.style.transform='')});

/* ---------- pages ---------- */
const qs=new URLSearchParams(location.search);
if(page==='home'){$('#best').innerHTML=[...PRODUCTS].sort((a,b)=>a.date-b.date).map(card).join('');
 $('#hf').innerHTML=PRODUCTS.map(p=>`<a href="product.html?id=${p.id}">${p.name}<span>${money(p.price)}</span></a>`).join('')}
if(page==='shop'){
 let cat=qs.get('cat')||'All';const g=$('#grid'),q=$('#q'),so=$('#so');q.value=qs.get('q')||'';
 const draw=()=>{let l=PRODUCTS.filter(p=>(cat==='All'||p.cat===cat)&&p.name.toLowerCase().includes(q.value.trim().toLowerCase()));
  const k=so.value;l.sort((a,b)=>k==='lo'?a.price-b.price:k==='hi'?b.price-a.price:k==='az'?a.name.localeCompare(b.name):b.date-a.date);
  g.innerHTML=l.length?l.map(card).join(''):'<p class="empty">No products match. Clear the search or choose All.</p>';
  $$('#cats button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===cat));$('#cnt').textContent=l.length+(l.length===1?' piece':' pieces')};
 $('#cats').onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;draw()}};q.oninput=so.onchange=draw;draw();
}
if(page==='product'){
 const p=byId(qs.get('id'))||PRODUCTS[0];document.title=p.name+' | Ace Vogue';let size='M',qty=1,flipped=false;
 $('#pv').innerHTML=`<div class="pst ${p.dark?'lt':''}" data-pt><div class="pfl" id="pf"><img src="${p.a}" alt="${p.name}, front"><img class="b" src="${p.b}" alt="${p.name}, back"></div><button class="turn" id="tn">Turn over</button></div>`;
 $('#pi').innerHTML=`<p class="sm" style="color:var(--steel)">${p.cat}</p><h1>${p.name}</h1><div class="pr">${money(p.price)}</div><p>${p.desc}</p>
 <div class="opt"><h4>Colour</h4><span class="sw"><i style="background:${p.colorHex}"></i>${p.color}</span></div>
 <div class="opt"><h4>Size</h4><div class="sz" id="sz">${SIZES.map(s=>`<button aria-pressed="${s===size}" data-s="${s}">${s}</button>`).join('')}</div></div>
 <div class="opt"><h4>Quantity</h4><div class="qty"><button id="qm" aria-label="Decrease">&minus;</button><output id="qv">1</output><button id="qp" aria-label="Increase">+</button></div></div>
 <div class="buy"><button class="btn solid" id="ab">Add to cart</button><a class="lnk" href="shop.html">Keep shopping</a></div>
 <div class="dl">${p.det.map(d=>`<div><span>${d[0]}</span><b>${d[1]}</b></div>`).join('')}</div>`;
 const pf=$('#pf'),rot=(x=0,y=0)=>pf.style.transform=`rotateY(${(flipped?180:0)+x}deg) rotateX(${y}deg)`;
 $('#tn').onclick=()=>{flipped=!flipped;rot()};
 $('[data-pt]').addEventListener('mousemove',e=>{if(matchMedia('(hover:none)').matches)return;const r=e.currentTarget.getBoundingClientRect();pf.style.transition='transform .15s';rot(((e.clientX-r.left)/r.width-.5)*16,-((e.clientY-r.top)/r.height-.5)*10)});
 $('[data-pt]').addEventListener('mouseleave',()=>{pf.style.transition='';rot()});
 $('#sz').onclick=e=>{if(e.target.dataset.s){size=e.target.dataset.s;$$('#sz button').forEach(b=>b.setAttribute('aria-pressed',b===e.target))}};
 $('#qm').onclick=()=>$('#qv').textContent=qty=Math.max(1,qty-1);$('#qp').onclick=()=>$('#qv').textContent=++qty;
 $('#ab').onclick=()=>add(p.id,size,qty);
 $('#rel').innerHTML=PRODUCTS.filter(x=>x.id!==p.id).map(card).join('');
}
if(page==='contact'){
 const f=$('#cf'),v={name:x=>x.trim().length>1||'Enter your name.',email:x=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x)||'Enter a valid email address.',message:x=>x.trim().length>=10||'Write at least 10 characters.'};
 f.addEventListener('submit',e=>{e.preventDefault();let ok=true;
  Object.keys(v).forEach(k=>{const r=v[k](f[k].value),m=$('#e-'+k);m.textContent=r===true?'':r;f[k].setAttribute('aria-invalid',r!==true);if(r!==true)ok=false});
  if(!ok){f.querySelector('[aria-invalid=true]').focus();return}
  location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Message from '+f.name.value)}&body=${encodeURIComponent(f.message.value+'\n\n'+f.email.value)}`;
  $('#ok').textContent='Thanks. Your email app should open with the message ready to send.';f.reset()});
}

/* ---------- motion ---------- */
const mqFlat=matchMedia('(max-width:860px),(prefers-reduced-motion:reduce)');
mqFlat.addEventListener('change',()=>location.reload());
const REDUCE=matchMedia('(prefers-reduced-motion:reduce)').matches;
addEventListener('load',()=>{
 const ld=$('#ld');
 const start=()=>{$('#cur').classList.remove('in');if(window.gsap&&window.ScrollTrigger)motion()};
 if(ld&&window.gsap&&!sessionStorage.getItem('av_seen')&&!REDUCE){sessionStorage.setItem('av_seen','1');
  gsap.timeline({onComplete:()=>{ld.remove();start()}}).to('#ld img',{opacity:1,duration:.7}).to('#ld i',{width:160,duration:.6},'<.2').to('#ld',{yPercent:-100,duration:.7,ease:'power3.inOut'},'+=.25')}
 else{ld&&ld.remove();start()}
});
function motion(){
 gsap.registerPlugin(ScrollTrigger);
 if(page==='home'){
  const deal=$('#deal');
  if(deal&&!matchMedia('(hover:none)').matches)$('.hero').addEventListener('mousemove',e=>{const r=deal.getBoundingClientRect();
   deal.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*18);deal.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*10)});
 }
 if(REDUCE)return;
 const st=(el,s,e)=>({trigger:el,start:s,end:e,scrub:true});
 if(page==='home'){
  gsap.timeline().from('.pc',{'--s':0,'--dy':320,opacity:0,duration:1.1,stagger:.14,ease:'power3.out'}).from('.hero h1 span',{yPercent:60,opacity:0,duration:.9,stagger:.12,ease:'power3.out'},0);
  gsap.fromTo('.pc',{'--s':1},{'--s':1.45,ease:'none',immediateRender:false,scrollTrigger:st('.hero','top top','bottom top')});
  $$('.mr').forEach(r=>{const b=$('b',r);gsap.fromTo(b,{x:'-14vw',color:'#8A929C'},{x:0,color:'#F2F3F0',ease:'none',scrollTrigger:st(r,'top 98%','top 55%')})});
 }
 $$('[data-rv],.sh,.tx,.look figure,.cp,.ab-h .im,.promo>*,.ct-l,#cf').forEach(el=>gsap.fromTo(el,{y:50,opacity:0},{y:0,opacity:1,ease:'none',scrollTrigger:st(el,'top 95%','top 72%')}));
 $$('[data-clip]').forEach(el=>gsap.fromTo(el,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',ease:'none',scrollTrigger:st(el,'top 95%','top 55%')}));
 $$('[data-par]').forEach(el=>gsap.fromTo(el,{yPercent:-(+el.dataset.par)},{yPercent:+el.dataset.par,ease:'none',scrollTrigger:st(el.parentElement,'top bottom','bottom top')}));
 if(page!=='home')return;
 const mm=gsap.matchMedia();
 mm.add('(min-width:861px)',()=>{
  const tee=$('#tee');
  gsap.fromTo(tee,{backgroundColor:'#0A0B0D'},{backgroundColor:'#F2F3F0',ease:'none',scrollTrigger:st(tee,'top 90%','top 30%')});
  gsap.timeline({defaults:{ease:'power2.inOut'},scrollTrigger:{trigger:tee,start:'top top',end:'+=230%',pin:true,scrub:1,anticipatePin:1}})
   .fromTo('.tee-stage',{scale:.7,y:120,opacity:0,rotateX:22},{scale:1,y:0,opacity:1,rotateX:0,duration:2})
   .fromTo('.t1 .ln',{yPercent:115},{yPercent:0,stagger:.25,duration:1.2},'<.5')
   .fromTo('.t1 p,.t1 .tee-note',{opacity:0,y:20},{opacity:1,y:0,duration:1,stagger:.2},'<.7')
   .to({},{duration:.8})
   .to('.flip',{rotateY:180,y:-20,duration:3})
   .to('.t1',{opacity:0,y:-40,duration:1.2},'<')
   .fromTo('.t2 .ln',{yPercent:115},{yPercent:0,duration:1.2},'<1.3')
   .fromTo('.t2 li',{opacity:0,x:-40},{opacity:1,x:0,stagger:.4,duration:1},'>-.4')
   .fromTo('.t2 .btn',{opacity:0,y:20},{opacity:1,y:0,duration:1},'>-.2')
   .to({},{duration:.8});
  const kt=gsap.timeline({defaults:{ease:'power2.inOut'},scrollTrigger:{trigger:'#knicker',start:'top top',end:'+=260%',pin:true,scrub:1,anticipatePin:1}});
  kt.fromTo('.k-f',{clipPath:'inset(100% 0 0 0)',scale:1.18},{clipPath:'inset(0% 0 0 0)',scale:1,duration:2})
   .fromTo('.k-left h2,.k-cta',{opacity:0,y:30},{opacity:1,y:0,duration:1,stagger:.2},'<.8')
   .fromTo('.k-1',{opacity:0,y:24},{opacity:1,y:0,duration:1},'<.4')
   .to({},{duration:.6})
   .to('.k-f',{xPercent:-55,duration:2}).fromTo('.k-b',{opacity:0,xPercent:40,rotateY:-35},{opacity:1,xPercent:55,rotateY:0,duration:2},'<')
   .to('.k-1',{opacity:0,duration:.6},'<').fromTo('.k-2',{opacity:0,y:24},{opacity:1,y:0,duration:1},'<1')
   .to({},{duration:.6})
   .to('.k-b',{opacity:0,xPercent:90,duration:1}).to('.k-2',{opacity:0,duration:.6},'<')
   .to('.k-f',{xPercent:-4,scale:2.4,duration:2.4},'<').fromTo('.k-3',{opacity:0,y:24},{opacity:1,y:0,duration:1},'>-.8')
   .to({},{duration:.8});
 });
 mm.add('(max-width:860px)',()=>{
  gsap.fromTo('.flip',{rotateY:0},{rotateY:180,ease:'none',scrollTrigger:st('.tee-stage','top 75%','bottom 30%')});
  gsap.fromTo('#tee',{backgroundColor:'#0A0B0D'},{backgroundColor:'#F2F3F0',ease:'none',scrollTrigger:st('#tee','top 90%','top 45%')});
  gsap.fromTo('.k-f',{xPercent:-30,opacity:0},{xPercent:0,opacity:1,ease:'none',scrollTrigger:st('.k-stage','top 85%','top 40%')});
  gsap.fromTo('.k-b',{xPercent:30,opacity:0},{xPercent:0,opacity:1,ease:'none',scrollTrigger:st('.k-stage','top 85%','top 40%')});
  $$('.tee-copy>div,.k-copy>div').forEach(el=>gsap.fromTo(el,{y:40,opacity:0},{y:0,opacity:1,ease:'none',scrollTrigger:st(el,'top 95%','top 70%')}));
 });
}
if(page==='contact'){$('#em').innerHTML=`<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;$('#ph').textContent=CONFIG.phone;$('#ad').textContent=CONFIG.address;
 $('#so2').innerHTML=Object.entries(CONFIG.social).map(([k,v])=>`<a href="${v}" ${v==='#'?'aria-disabled="true"':'target="_blank" rel="noopener"'}>${k}</a>`).join(', ');$$('#so2 a[aria-disabled]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()))}
