import { System, Entity, Not } from 'ecsy'
import RenderingSystemStateComponent from '../state-components/RenderingSystemStateComponent'
import PositionComponent from '../components/PositionComponent'
import RenderableComponent from '../components/RenderableComponent'

export default class RenderingSystem extends System {
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
    if (!position || !stateComponent || !stateComponent.element) return

    stateComponent.element.style.left = `${position.x}px`
    stateComponent.element.style.top = `${position.y}px`
  }

  removeRenderable(entity: Entity) {
    const stateComponent = entity.getComponent(RenderingSystemStateComponent)
    if (!stateComponent) return

    if (stateComponent.element) {
      document.body.removeChild(stateComponent.element)
    }

    entity.removeComponent(RenderingSystemStateComponent)
  }

  execute() {
    this.queries.uninitializedRenderables.added?.forEach((e) => this.addRenderable(e))
    this.queries.positions.changed?.forEach((e) => this.updatePosition(e))
    this.queries.initializedRenderables.removed?.forEach((e) => this.removeRenderable(e))
  }

  static queries = {
    uninitializedRenderables: {
      components: [RenderableComponent, Not(RenderingSystemStateComponent)],
      listen: { added: true },
    },

    initializedRenderables: {
      components: [RenderableComponent, RenderingSystemStateComponent],
      listen: { removed: true },
    },

    positions: {
      components: [PositionComponent, RenderingSystemStateComponent],
      listen: { changed: true },
    },
  }
}
