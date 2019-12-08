import jwt from 'jsonwebtoken'

import User from '../models/user'
import config from '../config'

export const singup = async (req, res, next) => {
  const credentials = req.body
  let user

  try {
    user = await User.create(credentials)
  } catch({message}) {
    return next({
      status: 400,
      message
    })
  }
  res.json(user)
}

export const singin = async (req, res, next) => {
  const {login, password} = req.body

  const user = await User.findOne({login})

  if (!user) {
    return next({
      status: 400,
      message: 'User not found!'
    })
  }

  if (!(user.comparePasswords(password))) {
    return next({
      status: 400,
      message: 'Bad Credentials'
    })
  }
  //
  // try {
  //   const result = await user.comparePasswords(password)
  // } catch(e) {
  //   return next({
  //     status: 400,
  //     message: 'Bad Credentials'
  //   })
  // }

  const token = jwt.sign({_id: user._id}, config.secret)

  // req.session.userId = user._id;
  res.json(token)
}
