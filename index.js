const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 64 * 16;
canvas.height = 64 * 9;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position, image }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image, this.position.x, this.position.y);
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

class Pallet {
  constructor({ position }) {
    this.position = position;
    this.radius = 3;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "white";
    c.fill();
    c.closePath;
  }
}

const pallets = []
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
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", "b", ".", ".", ".", "b", "b", "b", "b", ".", ".", ".", "b", "b", "|"],
  ["|", "b", ".", "b", ".", "b", ".", "b", "b", "b", "b", ".", "b", ".", ".", "b", "|"],
  ["|", "b", ".", "b", ".", "b", ".", ".", ".", ".", "b", ".", "b", "b", ".", "b", "|"],
  ["|", "b", ".", "b", ".", "b", "b", "b", "b", ".", "b", ".", "b", "b", ".", "b", "|"],
  ["|", "b", ".", "b", ".", "b", "b", "b", "b", ".", ".", ".", "b", "b", ".", "b", "|"],
  ["|", "b", ".", "b", ".", "b", "b", "b", "b", "b", "b", "b", "b", "b", ".", "b", "|"],
  ["|", "b", ".", ".", ".", "b", "b", "b", "b", "b", "b", "b", "b", "b", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];
function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

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
            image: createImage("./image/pipeHorizontal.png"),
          })
        );
        break;
      // case 2
      case "|":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./image/pipeVertical.png"),
          })
        );
        break;
      // case 3
      case "1":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./image/pipeCorner1.png"),
          })
        );
        break;
      // case 4
      case "2":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./image/pipeCorner2.png"),
          })
        );
        break;

      case "3":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./image/pipeCorner3.png"),
          })
        );
        break;

      case "4":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./image/pipeCorner4.png"),
          })
        );
        break;

      case "b":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./image/block.png"),
          })
        );
        break;
      case ".":
        pallets.push(
          new Pallet({
            position: {
              x: j * Boundary.width + Boundary.width / 2,
              y: i * Boundary.height + Boundary.height / 2,
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

  for (let i = pallets.length - 1; 0 < i; i--) {
    const pallet = pallets[i]
    pallet.draw()
    if (Math.hypot(pallet.position.x - player.position.x, pallet.position.y - player.position.y) < pallet.radius + player.radius) {
      console.log("touching")
      pallets.splice(i, 1)
    }
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

if (pallets.length === 0) {
  console.log("You win");
  window.alert("You win")
}

// addEventListener("keydown", ({ key }) => {
//   console.log(key);
//   switch (key) {
//     case "w":
//       keys.w.pressed = true;
//       lastKey = "w";
//       //   player.velocity.y = -5;
//       //   player.move_up();
//       break;
//     case "a":
//       keys.a.pressed = true;
//       lastKey = "a";

//       //   player.velocity.x = -5;
//       //   player.move_left();
//       break;
//     case "s":
//       keys.s.pressed = true;
//       lastKey = "s";

//       //   player.velocity.y = 5;
//       //   player.move_down();
//       break;
//     case "d":
//       keys.d.pressed = true;
//       lastKey = "d";

//       //   player.velocity.x = 5;
//       //   player.move_right();
//       break;
//   }
//   console.log(player.velocity);
// });

// addEventListener("keyup", ({ key }) => {
//   console.log(key);
//   switch (key) {
//     case "w":
//       keys.w.pressed = false;
//       //   player.velocity.y = 0;
//       //   player.move_up();
//       break;
//     case "a":
//       keys.a.pressed = false;
//       //   player.velocity.x = 0;
//       //   player.move_left();
//       break;
//     case "s":
//       keys.s.pressed = false;
//       //   player.velocity.y = 0;
//       //   player.move_down();
//       break;
//     case "d":
//       keys.d.pressed = false;
//       //   player.velocity.x = 0;
//       //   player.move_right();
//       break;
//   }
// });
