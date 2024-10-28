import Image from 'next/image'
import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const DND_FORMAT = 'tin'

interface Stage3Props {
  onBaseBake: () => void
}

export default function Stage3({ onBaseBake }: Stage3Props) {
  const [isHover, setIsHover] = useState(false)
  const [ { isDragging }, drag, preview ] = useDrag(
    () => ({
      type: DND_FORMAT,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    })
  )

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DND_FORMAT,
    drop: () => onBaseBake(),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  }))

  return <div className="birthday__stage stage3">
    {/* <h1>Let’s bake own base</h1> */}
    <h1>烘烤蛋糕胚</h1>
    <p>现在要把之前打好的面糊放到烤箱里. 找到下面那个模具了吗，长按把它拖到上面。速度要快，丢完手立刻伸开，小心别被烫到，烤箱的温度有150°C呢！</p>
    <div className={isOver ? 'oven hover' : 'oven'} >
      <Image width={290} height={282} draggable={false}
        src="/oven.png" alt="Oven"/>
      <div className="over-real" ref={drop}></div>
    </div>
    <div className="tin" ref={drag}>
      <Image width={90} height={70} draggable={false}
        src="/tin.png" alt="Tin" />
    </div>
  </div>
}