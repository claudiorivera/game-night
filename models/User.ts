import { model, models, Schema } from "mongoose";
import { IUser } from "types";

const UserSchema = new Schema<IUser>({
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

export const UserModel = models.User || model<IUser>("User", UserSchema);
