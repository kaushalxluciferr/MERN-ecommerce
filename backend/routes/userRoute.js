import express from 'express'

import {longinUser,registerUser,adminLogin} from '../controllers/userController.js'

const router=express.Router()

router.post('/register',registerUser)
router.post('/login',longinUser)
router.post('/admin',adminLogin)

export default router