// MANE edit preview image fixer
(function(){
  // Make all images visible
  document.querySelectorAll('style').forEach(function(s){
    s.textContent=s.textContent.replace(/visibility:\s*hidden/g,'visibility:visible');
  });
  // Image paths from repo
  var w='/images/hair-wavy.png',c='/images/hair-curly.png',d='/images/hair-deep-curly.png';
  var hm='/images/hero-model.png',mc='/images/model-curly-1.png';
  var ms='/images/model-straight-1.png',ms2='/images/model-straight-2.png';
  // Home page product cards
  var hp=document.querySelectorAll('#page-home .product-card-img img');
  if(hp[0])hp[0].src=w;if(hp[1])hp[1].src=c;if(hp[2])hp[2].src=d;
  // Texture guide
  var tg=document.querySelectorAll('.texture-guide-img img');
  if(tg[0])tg[0].src=ms;if(tg[1])tg[1].src=hm;if(tg[2])tg[2].src=mc;
  // Promise section
  var pi=document.querySelector('.promise-img img');if(pi)pi.src=ms2;
  // UGC gallery
  var ug=document.querySelectorAll('.ugc-item img');
  [hm,mc,ms,ms2,hm].forEach(function(src,i){if(ug[i])ug[i].src=src;});
  // Product detail page
  var mi=document.getElementById('productMainImg');if(mi)mi.src=hm;
  var si=document.getElementById('stickyImg');if(si)si.src=w;
  // Shop page
  var sp=document.querySelectorAll('#page-shop .product-card-img img');
  if(sp[0])sp[0].src=w;if(sp[1])sp[1].src=c;if(sp[2])sp[2].src=d;
  // Education page
  var ei=document.querySelectorAll('.texture-card-img img');
  if(ei[0])ei[0].src=w;if(ei[1])ei[1].src=c;if(ei[2])ei[2].src=d;
  // Fix JS products array for navigation
  if(window.products){products[0].img=w;products[1].img=c;products[2].img=d;}
})();
