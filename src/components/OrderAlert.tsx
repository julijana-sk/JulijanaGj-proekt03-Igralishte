import React from 'react'
import PrimaryBtn from './PrimaryBtn'
import Link from 'next/link'

const OrderAlert = () => {

  return (
    <div className='confirmation-message-bg flex-column justify-content-start'>
      <div className='confirmation-message'>
        <img src="../pictures/icons/sparks-removebg.png" alt="sparks" className='mt-3'/>
        <h2 className='mt-3' style={{fontSize: '20px'}}>Вашата нарачка е успешна!</h2>
        <div className="flex-column justify-content-center align-items-center mb-3">
            <p>Очекувајте потврда за вашата нарачка на вашата емаил адреса.</p>
            <p>Keep on shining *</p>
        </div>
        <div className="flex-column justify-content-start align-items-center">
        <div className='col-12 p-0'>
            <div className="flex-column justify-content-start align-items-center">
            <Link href={"/order"}><PrimaryBtn title="Продолжи" btnClass={"PrimaryBtn w-100 mb-3 btn-gold btn-gold-text px-5"} backgroundColor={"btn-gold"} color='black' border='none' height="51px"/></Link>
            <Link href={"/"} className='border-0 bg-transparent w-50'><u>Кон почетна</u></Link>
            </div>  
        </div>  
        </div>
      </div>
    </div>
  )
}

export default OrderAlert