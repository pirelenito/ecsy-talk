import { World } from 'ecsy'
import PositionComponent from './components/PositionComponent'
import RigidBodyComponent from './components/RigidBodyComponent'
import RenderableComponent from './components/RenderableComponent'
import GamepadComponent from './components/GamepadComponent'
import PlayerComponent from './components/PlayerComponent'
import ThreeRenderingSystemStateComponent from './state-components/ThreeRenderingSystemStateComponent'
import GamepadSystem from './systems/GamepadSystem'
import PlayerMovementSystem from './systems/PlayerMovementSystem'
import PhysicsSystem from './systems/PhysicsSystem'
import ThreeRenderingSystem from './systems/ThreeRenderingSystem'
import createPlayerEntity from './entities/createPlayerEntity'
import createStaticObjectEntity from './entities/createStaticObjectEntity'
import createPhysicalObjectEntity from './entities/createPhysicalObjectEntity'

const world = new World()

world.registerComponent(PositionComponent)
world.registerComponent(RigidBodyComponent)
world.registerComponent(RenderableComponent)
world.registerComponent(GamepadComponent)
world.registerComponent(PlayerComponent)

world.registerComponent(ThreeRenderingSystemStateComponent)

world.registerSystem(GamepadSystem)
world.registerSystem(PlayerMovementSystem)
world.registerSystem(PhysicsSystem)
world.registerSystem(ThreeRenderingSystem)

createPlayerEntity(world, 0)
createPlayerEntity(world, 1)
createPlayerEntity(world, 2)
createPlayerEntity(world, 3)

for (let index = 0; index < 10; index++) {
  createPhysicalObjectEntity(world)
}

for (let index = 0; index < 10; index++) {
  createStaticObjectEntity(world)
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
