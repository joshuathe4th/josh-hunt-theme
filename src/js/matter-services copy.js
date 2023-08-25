import * as Matter from 'matter-js';

//https://stackoverflow.com/questions/64432514/how-to-make-items-draggable-and-clickable

window.addEventListener('servicesScrollEvent', (e) => {

  const matterContainer = document.querySelector("#servicez");
  const listEls = matterContainer.querySelectorAll(".circle");
  const THICCNESS = 60;

  const engine = Matter.Engine.create();
  
  // Create Boundaries
  //Matter.Bodies.rectangle(x, y, width, height, [options])
  var ground = Matter.Bodies.rectangle(
    matterContainer.clientWidth / 2,
    matterContainer.clientHeight + THICCNESS / 2,
    27184,
    THICCNESS,
    { isStatic: true }
  );
  
  let leftWall = Matter.Bodies.rectangle(
    0 - THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
  );
  
  let rightWall = Matter.Bodies.rectangle(
    matterContainer.clientWidth + THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
  );
  
  //console.log(matterContainer.scrollHeight)
  // Create Elements
  const stack = Matter.Composites.stack(
    // xx, yy, columns, rows, columnGap, rowGap, cb
    0, 0, listEls.length, 1, 0, 0,
    (xx, yy, i) => {
      let {x, y, diamater, height} = listEls[i].getBoundingClientRect();
      return Matter.Bodies.circle(x, y - diamater , diamater / 2 );
    }
  );


  const mouseConstraint = Matter.MouseConstraint.create(
    engine, {element: matterContainer}
  );


  Matter.Composite.add(engine.world, [stack]);
  Matter.Composite.add(engine.world, [ mouseConstraint, ground, leftWall, rightWall]);
  

  // Render Scene
  var render = Matter.Render.create({
    element: matterContainer,
    engine: engine,
    options: {
      width: matterContainer.clientWidth,
      height: matterContainer.clientHeight,
      background: "transparent",
      wireframes:true,
      showAngleIndicator: false
    }
  });
  //Matter.Render.run(render);


  listEls.forEach(e => {
    e.style.position = "absolute";
    e.addEventListener("click", e =>
      console.log(e.target.textContent)
    );
  });
 




 // console.log(engine.world.composites[0].bodies)

  (function update() {
    requestAnimationFrame(update);
    stack.bodies.forEach((block, i) => {
      const li = listEls[i];
      const {x, y} = block.vertices[0];
      li.style.top = `${y}px`;
      li.style.left = `${x}px`;
      li.style.transform = `translate(-50%, -50%) 
                            rotate(${block.angle}rad)
                            `;
    });
    Matter.Engine.update(engine);


  })();




}); // end On Load Event

