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

    if (gamepad.buttonRightPressed) {
      position.x += speed
    }

    if (gamepad.buttonLeftPressed) {
      position.x -= speed
    }

    if (gamepad.buttonDownPressed) {
      position.y += speed
    }

    if (gamepad.buttonUpPressed) {
      position.y -= speed
    }
  }

  execute(delta: number) {
    this.queries.players.results.forEach((e) => this.runGravity(delta, e))
  }

  static queries = {
    players: {
      components: [PlayerComponent, GamepadComponent, PositionComponent],
    },
  }
}
