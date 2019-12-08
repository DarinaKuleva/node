import express from 'express'

import * as AuthController from '../controllers/auth'

const router = express.Router()

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.get('/users', AuthController.getUsers)

export default router
