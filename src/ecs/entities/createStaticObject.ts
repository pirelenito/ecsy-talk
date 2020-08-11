import { World } from 'ecsy'
import RenderableComponent from '../components/RenderableComponent'
import PositionComponent from '../components/PositionComponent'

export default function createStaticObject(world: World) {
  const staticObject = world.createEntity()
  staticObject.addComponent(RenderableComponent, { color: '#CFFF47' })
  staticObject.addComponent(PositionComponent, {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight - 40,
  })
}
