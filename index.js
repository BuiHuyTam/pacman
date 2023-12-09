const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 10;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath;
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  move_right() {
    player.velocity.x = 5;
    this.update();
  }

  move_left() {
    player.velocity.x = -5;
    this.update();
  }

  move_up() {
    player.velocity.y = -5;
    this.update();
  }

  move_down() {
    player.velocity.y = 5;
    this.update();
  }
}

const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey = "";
const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];
map.forEach((row, i) =>
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          })
        );
        break;
    }
  })
);

function circleCollidesWithRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...player, velocity: { x: 0, y: -5 } },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    }
  } else if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...player, velocity: { x: 0, y: 5 } },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    }
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 5;
  }

  boundaries.forEach((boundary) => {
    boundary.draw();

    if (
      circleCollidesWithRectangle({
        circle: player,
        rectangle: boundary,
      })
    ) {
      console.log("we are coliding");
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });
  player.update();
  //   player.velocity.x = 0;
  //   player.velocity.y = 0;
}

animate();
player.update();

addEventListener("keydown", ({ key }) => {
  console.log(key);
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      //   player.velocity.y = -5;
      //   player.move_up();
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";

      //   player.velocity.x = -5;
      //   player.move_left();
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";

      //   player.velocity.y = 5;
      //   player.move_down();
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";

      //   player.velocity.x = 5;
      //   player.move_right();
      break;
  }
  console.log(player.velocity);
});

addEventListener("keyup", ({ key }) => {
  console.log(key);
  switch (key) {
    case "w":
      keys.w.pressed = false;
      //   player.velocity.y = 0;
      //   player.move_up();
      break;
    case "a":
      keys.a.pressed = false;
      //   player.velocity.x = 0;
      //   player.move_left();
      break;
    case "s":
      keys.s.pressed = false;
      //   player.velocity.y = 0;
      //   player.move_down();
      break;
    case "d":
      keys.d.pressed = false;
      //   player.velocity.x = 0;
      //   player.move_right();
      break;
  }
  console.log(player.velocity);
});
