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

const playerOne = world.createEntity()
playerOne.addComponent(PlayerComponent)
playerOne.addComponent(RenderableComponent)
playerOne.addComponent(RigidBodyComponent)
playerOne.addComponent(GamepadComponent, { index: 0 })
playerOne.addComponent(PositionComponent)

const playerTwo = world.createEntity()
playerTwo.addComponent(PlayerComponent)
playerTwo.addComponent(RenderableComponent)
playerTwo.addComponent(RigidBodyComponent)
playerTwo.addComponent(GamepadComponent, { index: 1 })
playerTwo.addComponent(PositionComponent, { x: 100, y: 0 })

let previousTime = Date.now()

const gameLoop = () => {
  const time = Date.now()
  const delta = time - previousTime

  world.execute(delta, time)

  previousTime = time
  window.requestAnimationFrame(gameLoop)
}

gameLoop()
