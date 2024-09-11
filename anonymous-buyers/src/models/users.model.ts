import mongoose from "mongoose"
import { type IUser } from "types"

const { Schema } = mongoose

export const userSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: String,
  address: {
    line1: String,
    line2: String,
    postcode: String,
    city: String,
    state: String,
    country: String
  },
  createdAt: Date
})

export const User = mongoose.model("User", userSchema)
