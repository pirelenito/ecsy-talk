import GameState from './GameState'

export default function runRendering(
  gameState: GameState,
  delta: number,
) {
  const element = document.getElementById('ball')
  if (!element) return

  element.style.left = `${gameState.x}px`
  element.style.top = `${gameState.y}px`
}
