import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  login: { type: String, unique: true, lowercase: true, index: true},
  password: String
})

UserSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

UserSchema.methods.comparePasswords = function (password) {
  // return !!(password == this.password)

  return bcrypt.compare(password, this.password)
}

export default mongoose.model('User', UserSchema)
