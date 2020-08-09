import GameState from './GameState'

export default function runRendering(gameState: GameState, delta: number) {
  const ball = document.getElementById('ball')
  if (!ball) return

  ball.style.left = `${gameState.x}px`
  ball.style.top = `${gameState.y}px`
}
