import { model, models, Schema, Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  name: string;
  image: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default models.User || model<User>("User", UserSchema);
