import { Component, TagComponent, Types, System, SystemStateComponent, Not, Entity, World } from 'ecsy'

class PositionComponent extends Component<PositionComponent> {
  x: number
  y: number

  static schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
  }
}

class RigidBodyTagComponent extends TagComponent {}

class RenderableTagComponent extends TagComponent {}

class PlayerComponent extends TagComponent {}

class GamepadComponent extends Component<GamepadComponent> {
  index!: number
  buttonUpPressed: boolean
  buttonDownPressed: boolean
  buttonLeftPressed: boolean
  buttonRightPressed: boolean

  static schema = {
    index: { type: Types.Number },
    buttonUpPressed: { type: Types.Boolean, default: false },
    buttonDownPressed: { type: Types.Boolean, default: false },
    buttonLeftPressed: { type: Types.Boolean, default: false },
    buttonRightPressed: { type: Types.Boolean, default: false },
  }
}

class GamepadSystem extends System {
  updateGamepad(entity: Entity) {
    const gamepadComponent = entity.getMutableComponent(GamepadComponent)

    const gamepad = navigator.getGamepads()[gamepadComponent.index]

    if (gamepad) {
      gamepadComponent.buttonUpPressed = gamepad.buttons[12].pressed
      gamepadComponent.buttonDownPressed = gamepad.buttons[13].pressed
      gamepadComponent.buttonLeftPressed = gamepad.buttons[14].pressed
      gamepadComponent.buttonRightPressed = gamepad.buttons[15].pressed
    }
  }

  execute() {
    this.queries.gamepads.results.forEach((e) => this.updateGamepad(e))
  }

  static queries = {
    gamepads: {
      components: [GamepadComponent],
    },
  }
}

class RenderingSystemStateComponent extends SystemStateComponent<RenderingSystemStateComponent> {
  element: HTMLDivElement

  static schema = {
    element: { type: Types.Ref, default: false },
  }
}

class RenderingSystem extends System {
  addRenderable(entity: Entity) {
    const element = document.createElement('div')
    element.style.position = 'absolute'
    element.style.background = '#FFEBEA'
    element.style.width = '40px'
    element.style.height = '40px'
    element.style.borderRadius = '20px'
    document.body.appendChild(element)

    entity.addComponent(RenderingSystemStateComponent, { element })
  }

  updatePosition(entity: Entity) {
    const stateComponent = entity.getComponent(RenderingSystemStateComponent)
    const position = entity.getComponent(PositionComponent)

    stateComponent.element.style.left = `${position.x}px`
    stateComponent.element.style.top = `${position.y}px`
  }

  removeRenderable(entity: Entity) {
    const stateComponent = entity.getComponent(RenderingSystemStateComponent)
    document.body.removeChild(stateComponent.element)

    entity.removeComponent(RenderingSystemStateComponent)
  }

  execute() {
    this.queries.uninitializedRenderables.added.forEach((e) => this.addRenderable(e))
    this.queries.positions.changed.forEach((e) => this.updatePosition(e))
    this.queries.initializedRenderables.removed.forEach((e) => this.removeRenderable(e))
  }

  static queries = {
    uninitializedRenderables: {
      components: [RenderableTagComponent, Not(RenderingSystemStateComponent)],
      listen: { added: true },
    },

    initializedRenderables: {
      components: [RenderableTagComponent, RenderingSystemStateComponent],
      listen: { removed: true },
    },

    positions: {
      components: [PositionComponent, RenderingSystemStateComponent],
      listen: { changed: true },
    },
  }
}

const GRAVITY = 0.1

class PhysicsSystem extends System {
  runGravity(delta: number, entity: Entity) {
    const position = entity.getMutableComponent(PositionComponent)
    position.y += position.y <= window.innerHeight - 40 ? GRAVITY * delta : 0
  }

  execute(delta: number) {
    this.queries.rigidBodies.results.forEach((e) => this.runGravity(delta, e))
  }

  static queries = {
    rigidBodies: { components: [RigidBodyTagComponent, PositionComponent] },
  }
}

const SPEED = 0.2

class PlayerMovementSystem extends System {
  runGravity(delta: number, entity: Entity) {
    const position = entity.getMutableComponent(PositionComponent)
    const gamepad = entity.getComponent(GamepadComponent)

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

const world = new World()

world.registerComponent(PositionComponent)
world.registerComponent(RigidBodyTagComponent)
world.registerComponent(RenderableTagComponent)
world.registerComponent(GamepadComponent)
world.registerComponent(PlayerComponent)

world.registerComponent(RenderingSystemStateComponent)

world.registerSystem(GamepadSystem)
world.registerSystem(PlayerMovementSystem)
world.registerSystem(PhysicsSystem)
world.registerSystem(RenderingSystem)

const playerOne = world.createEntity()
playerOne.addComponent(PlayerComponent)
playerOne.addComponent(RenderableTagComponent)
playerOne.addComponent(RigidBodyTagComponent)
playerOne.addComponent(GamepadComponent, { index: 0 })
playerOne.addComponent(PositionComponent)

const playerTwo = world.createEntity()
playerTwo.addComponent(PlayerComponent)
playerTwo.addComponent(RenderableTagComponent)
playerTwo.addComponent(RigidBodyTagComponent)
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
