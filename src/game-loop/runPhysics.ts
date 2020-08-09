import GameState from './GameState'

const GRAVITY = 0.1

export default function runPhysics(gameState: GameState, delta: number) {
  gameState.y += gameState.y <= window.innerHeight - 40 ? GRAVITY * delta : 0
}
