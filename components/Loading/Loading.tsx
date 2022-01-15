import React, { FC } from 'react'
import Lottie from 'lottie-react'
import loadingAnim from './Loading.anim.json'

interface Props {}

const Connecting: FC<Props> = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="">
      <Lottie loop={true} autoplay={true} animationData={loadingAnim}/>
    </div>
  </div>
)

export default Connecting
