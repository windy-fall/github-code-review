import Image from 'next/image'
import LSButton from "@/components/common/LSButton"

interface Stage1Props {
  onStart: () => void
}
export default function Stage1({ onStart } : Stage1Props) {
  return <div className="birthday__stage stage1">
    <Image width={300} height={370}
      src="/cake.png" alt="Birth Cake" />
    {/* <LSButton className="start" onClick={onStart}>Let’s make a cake!</LSButton> */}
    <LSButton className="start" onClick={onStart}>生日快乐！</LSButton>
  </div>
}