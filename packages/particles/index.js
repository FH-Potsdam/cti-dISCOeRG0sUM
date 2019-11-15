/**
 * @todo How to constrain the particle to the screen? / OK
 * @todo How to give an particle a live time? / OK
 * @todo How to create a new particle after 50 frames? / OK
 * @todo How to give the particle an on click action? / OK
 */
let canvas = undefined;
let jim = undefined;
let fillColor = undefined;
const agents = [];
function setup() {
  canvas = createCanvas(100, 100);
  canvas.parent("sketch");
  colorMode(HSB);
  fillColor = color(200, 0, 100);
  // jim = new Agent(random(width), random(height)); // jim ist scheiße!!
  // Agent().display(); will throw an error
}

function draw() {
  background(250);
  if (frameCount % 50 === 0) {
    agents.push(new Agent(mouseX, mouseY));
  }

  for (let i = 0; i < agents.length; i++) {
    if (agents[i].deathClock <= 0) {
      agents.splice(i, 1);
    }
  }

  // jim.update();
  // jim.display();
  for (const item of agents) {
    item.update();
    item.display();
  }
}

function mousePressed() {
  agents.push(new Agent(mouseX, mouseY));
}
function mouseDragged() {
  agents.push(new Agent(mouseX, mouseY));
  fillColor = color(
    round(random(0, 360)),
    round(random(10, 100)),
    round(random(10, 100))
  );
}
function keyPressed() {
  if (key === "s" || key === "S") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch", "png");
  }
}

function Agent(x, y) {
  if (!(this instanceof Agent)) {
    throw new TypeError(
      "Agent can not be called as a function. Create an instance by calling 'new Agent(x,y)'"
    );
  }

  /**
   * If you want the fancy noise driven movement you need to add
   * these variables
   */
  // this.xoff = x;
  // this.yoff = y;
  // this.noiseRange = 2;

  this.x = x;
  this.y = y;
  this.deathClock = 500;

  /**
   * If you want the fancy noise driven movement remove
   * this update function
   */
  this.update = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
    this.deathClock--;

    if (this.x > width || this.x < 0) {
      this.x = width / 2;
      this.y = height / 2;
    }
    if (this.y > height || this.y < 0) {
      this.x = width / 2;
      this.y = height / 2;
    }
  };

  /**
   * If you want the fancy noise driven movement you need to add
   * this update function
   */
  // this.update = function() {
  //   this.xoff += 0.01;
  //   let xn = noise(this.xoff) * this.noiseRange;
  //   this.yoff += 0.01;
  //   let yn = noise(this.yoff) * this.noiseRange;
  //   this.x = this.x + xn - this.noiseRange / 2; //random(-1, 1);
  //   this.y = this.y + yn - this.noiseRange / 2; // random(-1, 1);
  //   // constrain him to the canvas
  //   if (this.x <= 0) {
  //     this.x = 0;
  //   }
  //   if (this.x >= width) {
  //     this.x = width;
  //   }
  //   if (this.y <= 0) {
  //     this.y = 0;
  //   }
  //   if (this.y >= height) {
  //     this.y = height;
  //   }
  // };

  this.display = function() {
    strokeWeight(2);
    stroke(0);
    fill(fillColor);
    ellipse(this.x, this.y, 5);
  };
}
