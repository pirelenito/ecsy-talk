const gameState = {
  x: 0,
  y: 0,
  speed: 0.2,
  gravity: 0.1,
}

const runInput = (delta: number) => {
  const gamepad = navigator.getGamepads()[0]

  if (gamepad) {
    const buttonUp = gamepad.buttons[12].pressed
    const buttonDown = gamepad.buttons[13].pressed
    const buttonLeft = gamepad.buttons[14].pressed
    const buttonRight = gamepad.buttons[15].pressed

    const speed = gameState.speed * delta
    gameState.x += buttonRight ? speed : buttonLeft ? -speed : 0
    gameState.y += buttonDown ? speed : buttonUp ? -speed : 0
  }
}

const runPhysics = (delta: number) => {
  gameState.y += gameState.y <= window.innerHeight - 40 ? gameState.gravity * delta : 0
}

const runRendering = (delta: number) => {
  const ball = document.getElementById('ball')

  ball.style.left = `${gameState.x}px`
  ball.style.top = `${gameState.y}px`
}

let previousTime = Date.now()

const gameLoop = () => {
  const time = Date.now()
  const delta = time - previousTime

  runInput(delta)
  runPhysics(delta)
  runRendering(delta)

  previousTime = time
  window.requestAnimationFrame(gameLoop)
}

gameLoop()
