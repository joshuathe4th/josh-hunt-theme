import { lightOrDark } from './lightOrDark.js';

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin();

  document.querySelectorAll('.portfolio-item').forEach(function(item) {
    
    
    // Trigger Portfolio Actions
      portfolio(item);


    

      // Hover Rotate Animation
      let hover = gsap.to(item.querySelector('.portfolio-img'), {
        rotate: -10, 
        duration: 0.25, 
        borderWidth: 20,
        paused: true, 
        ease: "power1.inOut"
      });
      item.addEventListener("mouseenter", () => hover.play());
      item.addEventListener("mouseleave", () => hover.reverse());
 

      // Assign dark or light mode to portfolio
      var color = getComputedStyle(item).getPropertyValue('--color');
      //console.log(color);
      var mode = lightOrDark(color);
      //console.log(mode)
      item.classList.add(mode);

  })


}); // end On Load Event


// Portfolio
function portfolio(item) {

  // Duplicate Text
  var titleScroll = item.querySelector('.portfolio-wrapper').getElementsByClassName('portfolio-title-scroll')[0];
  var titleText = item.querySelector('.portfolio-wrapper').getElementsByClassName('portfolio-title')[0].innerHTML;


  // if exists
  if(titleScroll) {

  var titleExtended =  [
    '<span class="extended">',
    ' * ', titleText, ' * ', titleText, ' * ', titleText, ' * ', titleText, ' * ', titleText, ' * ', titleText,

    '</span>'].join("\n");

  titleScroll.innerHTML = titleScroll.innerHTML + titleExtended;

  }


  
  // Duplicate Portolio Category
  var portfolioType = item.getElementsByClassName('portfolio-type')[0];
  var portfolioTypeText = portfolioType.innerHTML;
  
  var portfolioTypeExtended =  [
    '<span class="extended">',
    ' * ', portfolioTypeText, ' * ', portfolioTypeText, ' * ', portfolioTypeText,  ' * ', portfolioTypeText, ' * ', portfolioTypeText, ' * ', portfolioTypeText, ' * ', portfolioTypeText, ' * ', portfolioTypeText, ' * ', portfolioTypeText,

    '</span>'].join("\n");

  portfolioType.innerHTML = portfolioType.innerHTML + portfolioTypeExtended;

  ScrollTrigger.refresh();
 
  

    item.querySelector('.portfolio-wrapper').addEventListener('click', function(event) {
        
        // if not already open - open the portfolio item
       openPortfolio(this);
       // (this.querySelector('.portfolio-wrapper').classList.contains('open') ? '' :  openPortfolio(this.querySelector('.portfolio-wrapper')));

        function openPortfolio(item) {


        // console.log( item.parentNode );

         item.parentNode.classList.add('open');
         
            item.classList.add('open');

            ScrollTrigger.refresh();
          

        }

    });





     


var port = document.getElementsByClassName("portfolio-wrapper");
var close = document.getElementsByClassName("close-button");
var overlay = document.getElementById('gallery-overlay');
var i;


// For each close button 
for (i = 0; i < close.length; i++) {

  close[i].addEventListener("click", function() {
    
  
  
      this.style.display = 'none';
      this.parentNode.classList.remove('open');

      this.nextElementSibling.classList.remove('open');
      //console.log(this.nextElementSibling);
     
      ScrollTrigger.refresh();  
    
 
  });
}




// For Each portfolio
for (i = 0; i < port.length; i++) {



  port[i].addEventListener("click", function() {
    this.parentNode.getElementsByClassName('close-button')[0].style.display = 'block'
    this.classList.add('open')
    ScrollTrigger.refresh();

  });

}


// Create and Insert Overlay outside 
if(!document.querySelector('#gallery-overlay')) {

var overlay = document.createElement('div');
overlay.id = 'gallery-overlay';
overlay.innerHTML = '<img src="" class="gallery-overlay-img"><div class="close-button gal-btn"></div><div class="next-button gal-btn"></div> <div class="prev-button gal-btn"></div>      <div class="close-div"></div>';

document.body.appendChild( overlay );

}



function galleryOpen(el) {


overlay.classList.add('open');
overlay.firstElementChild.src = el.src;

if(el.previousElementSibling == null) {
document.querySelector('.prev-button').style.opacity = '0';
}else {
document.querySelector('.prev-button').style.opacity = '1';
}

if(el.nextElementSibling == null) {
document.querySelector('.next-button').style.opacity = '0';
}else {
document.querySelector('.next-button').style.opacity = '1';
}


}


// Gallery Open
var galleryItems = item.querySelectorAll('.gallery-item');
//console.log(galleryItems)

for (i = 0; i < galleryItems.length; i++) {
  
  galleryItems[i].addEventListener("click", function() {

   galleryOpen(this);

   currentEl = this;

   // Click Next
   var nextbtn = document.querySelector('.next-button');
     nextbtn.addEventListener("click", function() {
       galleryOpen(currentEl.nextElementSibling);
       currentEl = currentEl.nextElementSibling;
     });

   // Click Previous
   var prevbtn = document.querySelector('.prev-button');
   prevbtn.addEventListener("click", function() {
     galleryOpen(currentEl.previousElementSibling);
     currentEl = currentEl.previousElementSibling;
   });


 });
}





// Close Gallery Overlay
overlay.querySelector('.close-div').addEventListener("click", function() {

  overlay.classList.remove('open');
  overlay.firstElementChild.src = '';

});
}


