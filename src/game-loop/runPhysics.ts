import GameState from './GameState'

const GRAVITY = 0.1

export default function runPhysics(gameState: GameState, delta: number) {
  if (gameState.y <= window.innerHeight - 40) {
    gameState.y += GRAVITY * delta
  }
}
