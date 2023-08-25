//import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';






const ScrollLottie = (obj) => {

  let anim = lottie.loadAnimation({
   container: document.querySelector(obj.target), 
   renderer: 'svg',
   loop: false,
   autoplay: false,
   path: obj.path ,
 });
 

 let timeObj = {currentFrame: 0}
 let endString = (obj.speed === "slow") ? "+=2000" : (obj.speed === "medium") ? "+=900" : (obj.speed === undefined) ? "+=1250" : "+=500";
 ScrollTrigger.create({
   trigger: obj.target,
     scrub: true,
     pin: obj.pin,
     start: obj.start,
     end: endString,
     onUpdate: self => {
      if(obj.duration) {
       gsap.to(timeObj, {
        duration: obj.duration,
        currentFrame:(Math.floor(self.progress *  (anim.totalFrames - 1))),
        onUpdate: () => {
         anim.goToAndStop(timeObj.currentFrame, true)
        },
        ease: 'expo'
       })
      } else {
        anim.goToAndStop(self.progress *  (anim.totalFrames - 1), true)
      }
    
     }
 });  


}

// Link locomotivescroll (lenis) to GSAP
function onScroll({ scroll, limit, velocity, direction, progress }) {
  //console.log(scroll, limit, velocity, direction, progress);
  ScrollTrigger.update()
}


document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.remove('is-loading')

  // Don't load on admin
  if(document.body.classList.contains('wp-admin') ){
    return;
  }
  // init Locomotive Scroll
  var locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
    },
    scrollCallback: onScroll,
  });

  // Register Scroll Triger Plugin
  gsap.registerPlugin(ScrollTrigger);

  // Begin Animations
  jackScroll();
  devScroll();
  meetJosh();
  portfolioScroll();


  // Listn for Scroll Event - 
  window.addEventListener('move-down-letters', (e) => {
   moveDownLetters(e);
  });




  }); // End On Load Event



  function portfolioScroll() {
    let portfolioImgs = gsap.utils.toArray(".portfolio-wrapper");

    portfolioImgs.forEach((wrap) => {
  
    var img = wrap.querySelector('.portfolio-img');
  
      gsap.timeline({
        scrollTrigger:{
          trigger: img,
          start: "bottom 100%",
          end: "top 30%",
          scale: 1,
          scrub: 1,
          markers: false
        }
      })
      .to(img, {
        scale: 1 ,
        duration: 1, ease:'none',
      })
  
    });
  }


function jackScroll() {
  if (document.getElementById('jack') !== null) {
    return ScrollLottie({
      target: '#jack',
      path: window.location.origin + "/wp-content/themes/josh-hunt/assets/images/animations/jack.json",
      speed: 'medium',
      start: "top 60%", // when the ___ of the trigger hits the ___ of the viewport
      pin: false
    })
}

}

function devScroll() {
  if (document.getElementById('dev') !== null) {
    ScrollLottie({
      target: '#dev',
      path: window.location.origin + "/wp-content/themes/josh-hunt/assets/images/animations/dev.json",
      speed: 'medium',
      start: "top 70%", // when the ___ of the trigger hits the ___ of the viewport
      pin: false
    })
  }

}

function meetJosh() {
  if (document.querySelector('.profile') !=null) {
    var img = document.querySelector('.profile');

    var tm = gsap.timeline({
      scrollTrigger: {
        trigger:  '.meet-josh',
        start: "top 45%", // when the ___ of the trigger hits the ___ of the viewport
        end: "bottom top",
        scrub: true,
        markers: false
      }
    });
    tm.from(img, {
      scale: 0,
      rotate: 150
    })
    tm.to(img, {
      scale: 1,
      rotate: 0
    });

  }

}



    /**
    * Move Down Letters
    */
  
    function moveDownLetters(e) {
      
      var target = e.detail.target;
  
      // Add Style to Head
      const style = document.createElement('style');
      style.innerHTML = `
      .move-down-letters {
          position: relative;
      }
      .move-down-letters > * > span{
        display: inline-block; 
        overflow: hidden;
        position: relative;
    }
      .move-down-letters .word .letter {
          display: inline-block; 
          position: relative;
      }
      `;
      document.head.appendChild(style);
  
   
  

          const classList = target.classList;

         // const speed = target.dataset.speed ? target.dataset.speed : .5;
          const entranceStagger = target.dataset.entranceStagger ? target.dataset.entranceStagger : 0.9 ;
          const entranceDelay = target.dataset.entranceDelay ? target.dataset.entranceDelay : 0;
         // const entranceSpeed = target.dataset.entranceSpeed ? target.dataset.entranceSpeed : '';
          const classes = target.firstElementChild.classList;
          //const style = target.style;
          const words = target.textContent.split(" ");

          target.firstElementChild.textContent = "";
          
          // Add Classes back to item
          for (let i = 0; i < classes.length; i++) {
            target.classList.add(classes[i]);
          }

          for (let i = 0; i < words.length; i++) {

            var wordItem = document.createElement('span');
            wordItem.classList.add('word')
            wordItem.textContent = words[i];



            const letters = wordItem.textContent.split("");
            wordItem.innerHTML = "";
            for (let i = 0; i < letters.length; i++) {
              wordItem.innerHTML += "<span><span class='letter'>" + letters[i] + "</span></span>";
            }
            wordItem.innerHTML += "<span>&nbsp;</span>";
            

            
            target.classList = classList;
            target.firstElementChild.appendChild(wordItem)


            }
  

          // Get all spans
          let spans = target.querySelectorAll(".letter");
          //console.log(spans)
            
          var action = gsap.timeline()
          .fromTo(
              spans,
              {
                  yPercent: 105},
              {
                  yPercent: 0,
                  opacity: 1,
                  //duration: entranceSpeed,
                  delay: entranceDelay * .1,
                  stagger: {
                    amount: entranceStagger, 
                    ease: 'power0.out',
                  } 
              }
              );
              // Add animation to timeline
              target.timeline = action;

      
  
  

  
   
   }


