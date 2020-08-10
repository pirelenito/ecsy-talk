const element = document.getElementById('ball')

const gameState = {
  x: 0,
  y: 0,
}

const gameLoop = () => {
  const time = Date.now()

  gameState.x = Math.sin(time / 1000) * 200 + 200
  gameState.y = Math.cos(time / 1000) * 200 + 200

  if (element) {
    element.style.left = `${gameState.x}px`
    element.style.top = `${gameState.y}px`
  }

  window.requestAnimationFrame(gameLoop)
}

gameLoop()

export default {}
