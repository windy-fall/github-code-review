import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Image from 'next/image'
import LSButton from '@/components/common/LSButton'
import { SeasonOption, baseOptions, fillingOptions } from '@/data/index'
const MAX_BASE_COUNT = 4, MAX_FILLINGS_COUNT = 5

export default function Stage4() {
  const [bases, setBases] = useState<SeasonOption<'base'>[]>([])
  const [fillings, setFillings] = useState<SeasonOption<'filling'>[]>([])

  const [finished, setFinished] = useState(false)

  const onBaseAdd = (base: SeasonOption<'base'>) => {
    setBases([...bases, base])
  }
  const onFillingAdd = (filling: SeasonOption<'filling'>) => {
    setFillings([...fillings, filling])
  }

  const onAddCandle = () => {
    setFinished(true)
  }

  return  <div className="birthday__stage stage4">
    <CSSTransition in={ !finished } timeout={1000} classNames="fade" >
      <div>
        {/* <h1>Let’s make the cake</h1> */}
        <h1>装饰点缀</h1>
        {/* <p>Build your cake in any order you want. Click an ingredient to add it to your cake. You can add more than one item e.g 2 vanilla sponges but only 5 bases and 6 fillings. Hit the button at the bottom to finish your cake and add your candles. Make sure you leave some icing for the top of your cake!</p> */}
        <p>按你喜欢的任何顺序涂上点缀，点击任意一种原料，就会层层叠加到蛋糕上。确保把你想吃的都加上了后，点一下底部的按钮，蜡烛就会出现，你的蛋糕就做好啦！</p>
        <SeasonPaste bases={bases} fillings={fillings} maxBaseCount={MAX_BASE_COUNT} maxFillingCount={MAX_FILLINGS_COUNT}
          onBaseAdd={onBaseAdd} onFillingAdd={onFillingAdd} />
      </div>

    </CSSTransition>

    <Cake bases={bases} fillings={fillings} finished={finished}/>

    {/* {!finished && <LSButton onClick={onAddCandle}>Add the candle!</LSButton>} */}
    {!finished && <LSButton onClick={onAddCandle}>点上蜡烛!</LSButton>}

    <div className={finished ? 'hoping finished' : 'hoping'}>
      生日快乐<br />
      <p>一个人在一座陌生的城市有时候是会感觉心累...<br/> 接下来的日子坏运气都走开，去相信去遇见更多美好的人和事！</p>
    </div>

    {
      finished && <div className='firework'>
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </div>
    }
  </div>
}

interface SeasonPasteProps {
  bases: SeasonOption<'base'>[],
  fillings: SeasonOption<'filling'>[],
  maxBaseCount: number,
  maxFillingCount: number,

  onBaseAdd: (base: SeasonOption<'base'>) => void,
  onFillingAdd: (filling: SeasonOption<'filling'>) => void
}
function SeasonPaste({ bases, fillings, maxBaseCount, maxFillingCount, onBaseAdd, onFillingAdd }: SeasonPasteProps) {
  const [active, setActive] = useState<'base'|'filling'>('filling')

  return <div className='season-paste'>
    <div className={active === 'base' && bases.length < maxBaseCount ? 'paste' : 'paste inactive'}>
      <div className="intros">
        {/* <h3>Bases</h3> */}
        <h3>装饰</h3>
        <h5>{bases.length} / {maxBaseCount}</h5>
      </div>
      <div className="options">
        {
          baseOptions.map(option => (
            <div className='option' key={option.name} onClick={() => {
              onBaseAdd(option)
              setActive('filling')
            }}>
              <div className="option__color" style={{backgroundColor: option.color}}></div>
              <div className="option__name">{option.name}</div>
            </div>
          ))
        }
      </div>
    </div>

    <div className={active === 'filling' && fillings.length < maxFillingCount ? 'paste' : 'paste inactive'}>
      <div className="intros">
        {/* <h3>Fillings / icings</h3> */}
        <h3>涂层/奶油</h3>
        <h5>{fillings.length} / {maxFillingCount}</h5>
      </div>
      <div className="options">
        {
          fillingOptions.map(option => (
            <div className='option' key={option.name} onClick={() => {
              onFillingAdd(option)
              setActive('base')
            }}>
              <div className="option__color" style={{backgroundColor: option.color}}></div>
              <div className="option__name">{option.name}</div>
            </div>
          ))
        }
      </div>
    </div>
  </div>
}

interface CakeProps {
  bases: SeasonOption<'base'>[]
  fillings: SeasonOption<'filling'>[],
  finished: boolean,
}
function Cake({bases, fillings, finished}: CakeProps) {
  const [layers, setLayers] = useState<SeasonOption[]>([])
  useEffect(() => {
    const arr: SeasonOption[] = []
    const maxLength = Math.max(bases.length, fillings.length)

    for(let i = 0; i < maxLength; i++) {
      if(i < fillings.length) arr.unshift(fillings[i])
      if(i < bases.length) arr.unshift(bases[i])
    }

    setLayers(arr)
  }, [bases, fillings])

  return <div className={finished ? 'cake finished' : 'cake'}>
    <div className={finished ? 'candle finished' : 'candle'}>
      <Image width={10} height={44}
          src="/candle.png" alt="Candle" />
      <div className="frame"></div>
    </div>


    {
      layers.map((layer, index) => (
        <div key={layer.name + index} className={layer.type}
          style={{
            backgroundColor: layer.color,
            width: 200 * (MAX_BASE_COUNT + MAX_FILLINGS_COUNT + 8 - layers.length + index) / (MAX_BASE_COUNT + 8 + MAX_FILLINGS_COUNT) + 'px'
          }}>
            {
              layer.type === 'filling' ? ['', '', '', '', '', '', '', ''].map((_,index) => (
                <div key={index} style={{
                  backgroundColor: layer.color,
                }}>
                </div>
              )) : ['', '', '', '', ''].map((_,index) => (
                <div key={index} style={{
                  backgroundColor: layer.color,
                }}>
                </div>
              ))
            }
        </div>
      ))
    }
    <div className="base" style={{backgroundColor: '#ffd296', width: '200px'}}></div>
  </div>
}