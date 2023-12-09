function moveRight() {
  player.move_right();
}
function moveLeft() {
  player.move_left();
}
function moveUp() {
  player.move_up();
}
function moveDown() {
  player.move_down();
}

Sk.builtins.move_right = function () {
  moveRight();
};
Sk.builtins.move_left = function () {
  moveLeft();
};
Sk.builtins.move_up = function () {
  moveUp();
};
Sk.builtins.move_down = function () {
  moveDown();
};
