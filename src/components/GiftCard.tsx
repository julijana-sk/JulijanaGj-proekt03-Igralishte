import React from 'react'
import { GiftType } from '@/types/types'

interface Props {
  gift: GiftType;
  index: number
}

const GiftCard: React.FC<Props> = ({gift, index}) => {
  
  return (
    <div className="relative mb-4">
        <img src={`${gift.img}`} alt="gift banner img" className='w-100'/>
        <div className={`gift-tape absolute d-flex flex-row px-3 justify-content-between align-items-center align-self-center ${index === 0 ? 'top-padding' : 'bottom-padding'} ${index % 2 === 0 ? 'right-side' : 'left-side'}`}>
            <img src="../pictures/icons/Star.png" alt="star" className='gift-star pb-3 pr-1'/>  
            <h3 className='gift-text mb-3'>{gift.title}</h3>
        </div>
    </div>
  )
}

export default GiftCard;