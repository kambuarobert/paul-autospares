const products=[
const productsGrid=document.getElementById('productsGrid')
const loadMoreBtn=document.getElementById('loadMoreBtn')
const filterCategory=document.getElementById('filterCategory')
const sortSelect=document.getElementById('sortSelect')
const searchInput=document.getElementById('searchInput')
const searchBtn=document.getElementById('searchBtn')
const cartBtn=document.getElementById('cartBtn')
const cartCount=document.getElementById('cartCount')
const productModal=document.getElementById('productModal')
const modalBody=document.getElementById('modalBody')
const modalClose=document.getElementById('modalClose')
let cart=[]
function formatCurrency(n){return"KSh "+n.toLocaleString()}
function renderProducts(){
productsGrid.innerHTML=''
const category=filterCategory.value
const q=searchInput.value.trim().toLowerCase()
let list=products.filter(p=> (category==='all'||p.category===category) && (p.title.toLowerCase().includes(q)||String(p.price).includes(q)))
const sort=sortSelect.value
if(sort==='price-asc')list.sort((a,b)=>a.price-b.price)
if(sort==='price-desc')list.sort((a,b)=>b.price-a.price)
list.slice(0,displayed).forEach(p=>{
const el=document.createElement('div')
el.className='product'
el.innerHTML=`<img src="${p.img}" alt="${p.title}"><h4>${p.title}</h4><div><p class="price">${formatCurrency(p.price)}</p></div><div class="meta"><button class="btn small" data-id="${p.id}">View</button><button class="btn small" data-add="${p.id}">Add to cart</button></div>`
productsGrid.appendChild(el)
})
if(list.length<=displayed)loadMoreBtn.style.display='none' else loadMoreBtn.style.display='inline-block'
}
loadMoreBtn.addEventListener('click',()=>{displayed+=3;renderProducts()})
filterCategory.addEventListener('change',()=>{displayed=6;renderProducts()})
sortSelect.addEventListener('change',()=>{renderProducts()})
searchBtn.addEventListener('click',()=>{displayed=6;renderProducts()})
searchInput.addEventListener('keydown',e=>{if(e.key==='Enter'){displayed=6;renderProducts()}})
document.addEventListener('click',e=>{
const id=e.target.getAttribute('data-id')
const add=e.target.getAttribute('data-add')
if(id){
const p=products.find(x=>x.id==id)
showModal(p)
}
if(add){
const p=products.find(x=>x.id==add)
addToCart(p)
}
})
function showModal(p){
modalBody.innerHTML=`<div style="display:flex;gap:18px;align-items:flex-start"><img src="${p.img}" style="width:320px;height:220px;object-fit:cover;border-radius:8px"><div style="flex:1"><h3>${p.title}</h3><p style="color:var(--muted)">Category: ${p.category}</p><p style="font-weight:800;margin:10px 0">${formatCurrency(p.price)}</p><div style="display:flex;gap:8px"><button class="btn primary" id="modalAdd" data-id="${p.id}">Add to cart</button><button class="btn outline" id="modalCloseBtn">Close</button></div></div></div>`
productModal.classList.remove('hidden')
}
modalClose.addEventListener('click',()=>productModal.classList.add('hidden'))
document.addEventListener('click',e=>{if(e.target.id==='modalCloseBtn')productModal.classList.add('hidden')})
function addToCart(p){
const found=cart.find(x=>x.id===p.id)
if(found)found.qty++ else cart.push({id:p.id,title:p.title,price:p.price,qty:1})
cartCount.textContent=cart.reduce((s,i)=>s+i.qty,0)
animateCart()
}
function animateCart(){cartBtn.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}],{duration:300})}
const testimonials=document.getElementById('testimonials')
const sampleReviews=[
{name:'James M.',text:'Fast fitting and great prices.'},
{name:'Aisha K.',text:'Genuine parts and friendly staff.'},
{name:'Peter N.',text:'Tyres lasted longer than expected.'}
]
sampleReviews.forEach(r=>{const t=document.createElement('div');t.className='testimonial';t.innerHTML=`<strong>${r.name}</strong><p style="color:var(--muted)">${r.text}</p>`;testimonials.appendChild(t)})
const contactForm=document.getElementById('contactForm')
contactForm.addEventListener('submit',e=>{e.preventDefault();alert('Thank you. We received your message and will contact you shortly.');contactForm.reset()})
renderProducts()
