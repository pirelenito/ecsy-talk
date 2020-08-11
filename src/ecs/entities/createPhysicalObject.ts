import { World } from 'ecsy'
import RenderableComponent from '../components/RenderableComponent'
import PositionComponent from '../components/PositionComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'

export default function (world: World) {
  const physicalObject = world.createEntity()
  physicalObject.addComponent(RenderableComponent, { color: '#FF4768' })
  physicalObject.addComponent(RigidBodyComponent)
  physicalObject.addComponent(PositionComponent, {
    x: Math.random() * window.innerWidth + 20,
    y: Math.random() * window.innerHeight - 20,
  })
}
