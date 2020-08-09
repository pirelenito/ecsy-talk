import { System, Entity } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import GamepadComponent from '../components/GamepadComponent'
import PlayerComponent from '../components/PlayerComponent'

const SPEED = 0.2

export default class PlayerMovementSystem extends System {
  runGravity(delta: number, entity: Entity) {
    const position = entity.getMutableComponent(PositionComponent)
    const gamepad = entity.getComponent(GamepadComponent)
    if (!gamepad || !position) return

    const speed = SPEED * delta

    position.x += gamepad.buttonRightPressed ? speed : gamepad.buttonLeftPressed ? -speed : 0
    position.y += gamepad.buttonDownPressed ? speed : gamepad.buttonUpPressed ? -speed : 0
  }

  execute(delta: number) {
    this.queries.players.results.forEach((e) => this.runGravity(delta, e))
  }

  static queries = {
    players: { components: [PlayerComponent, GamepadComponent, PositionComponent] },
  }
}
