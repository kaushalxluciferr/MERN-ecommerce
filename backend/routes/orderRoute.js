import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { allAdminOrder,verifyStripe, allUserOrder, placeOrderCOD, placeOrderRazor, placeOrderStripe, updateStatus } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const orderRouter=express.Router()


// for admin purspose

orderRouter.post('/list',adminAuth,allAdminOrder)
orderRouter.post('/status',adminAuth,updateStatus)

// payment feature for  user

orderRouter.post('/place',authUser,placeOrderCOD)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazor)
// verify 
orderRouter.post('/verifyStripe',authUser,verifyStripe)


// user feature

orderRouter.post('/userorders',authUser,allUserOrder)


export default orderRouter