const element = document.getElementById('ball')

const gameState = {
  ball: {
    x: 0,
    y: 0,
  },
}

const gameLoop = () => {
  const time = Date.now() / 1000

  gameState.ball.x = Math.sin(time) * 200 + 200
  gameState.ball.y = Math.cos(time) * 200 + 200

  if (element) {
    element.style.left = `${gameState.ball.x}px`
    element.style.top = `${gameState.ball.y}px`
  }

  window.requestAnimationFrame(gameLoop)
}

gameLoop()

export default {}
