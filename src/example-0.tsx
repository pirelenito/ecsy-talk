const SPEED = 0.2
const GRAVITY = 0.1

const gameState = {
  x: 0,
  y: 0,

  buttonUpPressed: false,
  buttonDownPressed: false,
  buttonLeftPressed: false,
  buttonRightPressed: false,
}

const runInput = (delta: number) => {
  const gamepad = navigator.getGamepads()[0]

  if (gamepad) {
    gameState.buttonUpPressed = gamepad.buttons[12].pressed
    gameState.buttonDownPressed = gamepad.buttons[13].pressed
    gameState.buttonLeftPressed = gamepad.buttons[14].pressed
    gameState.buttonRightPressed = gamepad.buttons[15].pressed
  }
}

const runPlayerMovement = (delta: number) => {
  const speed = SPEED * delta
  gameState.x += gameState.buttonRightPressed ? speed : gameState.buttonLeftPressed ? -speed : 0
  gameState.y += gameState.buttonDownPressed ? speed : gameState.buttonUpPressed ? -speed : 0
}

const runPhysics = (delta: number) => {
  gameState.y += gameState.y <= window.innerHeight - 40 ? GRAVITY * delta : 0
}

const runRendering = (delta: number) => {
  const ball = document.getElementById('ball')
  if (!ball) return

  ball.style.left = `${gameState.x}px`
  ball.style.top = `${gameState.y}px`
}

let previousTime = Date.now()

const gameLoop = () => {
  const time = Date.now()
  const delta = time - previousTime

  runInput(delta)
  runPlayerMovement(delta)
  runPhysics(delta)
  runRendering(delta)

  previousTime = time
  window.requestAnimationFrame(gameLoop)
}

gameLoop()

export default {}
