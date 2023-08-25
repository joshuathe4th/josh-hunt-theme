import './scss/style.scss';
import './js/animations.js';  
import './js/portfolio-actions.js';
import './js/matter-skills.js'; 
import './js/matter-services.js';
 

document.addEventListener("DOMContentLoaded", function() {
  setNavColors();
  contactOpen();

}); // end On Load Event


  // Set Nav Colors
function setNavColors($) {
  var links = document.querySelectorAll('.wp-block-navigation-item__content');
   links.forEach(link => {
   var color = link.parentElement.parentElement.dataset.color;
   link.parentElement.style.backgroundColor = color;
   link.style.borderColor = color;
   link.style.color = color;
 
  });
 }


 function contactOpen() {
  // Watch for contact button click
  var contactButton = document.querySelectorAll('.contact-button');
  var i;
  for ( i = 0; i < contactButton.length; i++) {
   
   var btnText = contactButton[i].innerHTML;
    
    contactButton[i].addEventListener("click", function(evt) {

      var contactOptions = [
        '<a href="https://instagram.com/joshuanathanhunt" target="_blank">Message Me</a>',
        '<a href="mailto:josh@huntsman.media">Email Me</a>',
        '<a href="tel:19495687375">Call Me</a>',
       '<a id="close" >X</a>'].join("\n");
      
      this.innerHTML = contactOptions;

      if(evt.target.id === 'close') {
     //  console.log('close')
       console.log(this);
       this.innerHTML = btnText;
     }


    });

    
 
}

}


