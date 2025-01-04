import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
    const {delivery_fee,getcartamount}=useContext(ShopContext)

  return (
    <div className='w-full'>
        <div className="text-2xl">
<Title txt1={'Cart'} txt2={"Totals"}/>
        </div>
        <div className='flex flex-col gap-3 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal: </p>
                <p>$ {getcartamount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
<p> Shipping Fee:</p>
<p>$ {delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
             <b>Total: </b>
             <b> $ {getcartamount()===0 ? 0.00: getcartamount()+delivery_fee}.00</b>
            </div>

        </div>
    </div>
  )
}

export default CartTotal
