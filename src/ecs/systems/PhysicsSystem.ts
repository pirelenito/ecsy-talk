import { System, Entity } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'

const GRAVITY = 0.1

export default class PhysicsSystem extends System {
  runGravity(delta: number, entity: Entity) {
    const position = entity.getMutableComponent(PositionComponent)
    if (!position) return

    if (position.y < window.innerHeight - 40) {
      position.y += GRAVITY * delta
    }
  }

  execute(delta: number) {
    this.queries.rigidBodies.results.forEach((e) => this.runGravity(delta, e))
  }

  static queries = {
    rigidBodies: {
      components: [RigidBodyComponent, PositionComponent],
    },
  }
}
