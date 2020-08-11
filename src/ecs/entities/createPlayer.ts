import { World } from 'ecsy'
import PlayerComponent from '../components/PlayerComponent'
import RenderableComponent from '../components/RenderableComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'
import GamepadComponent from '../components/GamepadComponent'
import PositionComponent from '../components/PositionComponent'

const playerColors = ['#BFBEFF', '#BEFFD8', '#F6FFBE', '#FFBECA']

export default function createPlayer(world: World, index: number = 0) {
  const player = world.createEntity()
  player.addComponent(PlayerComponent)
  player.addComponent(RenderableComponent, { color: playerColors[index] })
  player.addComponent(RigidBodyComponent)
  player.addComponent(GamepadComponent, { index })
  player.addComponent(PositionComponent, { x: index * 40 })
}
