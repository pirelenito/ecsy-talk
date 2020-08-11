import { World } from 'ecsy'
import PositionComponent from './components/PositionComponent'
import RigidBodyComponent from './components/RigidBodyComponent'
import RenderableComponent from './components/RenderableComponent'
import GamepadComponent from './components/GamepadComponent'
import PlayerComponent from './components/PlayerComponent'
import RenderingSystemStateComponent from './state-components/RenderingSystemStateComponent'
import GamepadSystem from './systems/GamepadSystem'
import PlayerMovementSystem from './systems/PlayerMovementSystem'
import PhysicsSystem from './systems/PhysicsSystem'
import RenderingSystem from './systems/RenderingSystem'
import createPlayer from './entities/createPlayer'
import createStaticObject from './entities/createStaticObject'
import createPhysicalObject from './entities/createPhysicalObject'

const world = new World()

world.registerComponent(PositionComponent)
world.registerComponent(RigidBodyComponent)
world.registerComponent(RenderableComponent)
world.registerComponent(GamepadComponent)
world.registerComponent(PlayerComponent)

world.registerComponent(RenderingSystemStateComponent)

world.registerSystem(GamepadSystem)
world.registerSystem(PlayerMovementSystem)
world.registerSystem(PhysicsSystem)
world.registerSystem(RenderingSystem)

createPlayer(world, { index: 0 })
createPlayer(world, { index: 1 })

for (let index = 0; index < 20; index++) {
  createPhysicalObject(world)
}

for (let index = 0; index < 10; index++) {
  createStaticObject(world)
}

let previousTime = Date.now()

const gameLoop = () => {
  const time = Date.now()
  const delta = time - previousTime

  world.execute(delta, time)

  previousTime = time
  window.requestAnimationFrame(gameLoop)
}

gameLoop()
