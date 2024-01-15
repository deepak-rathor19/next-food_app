import bcrypt from "bcryptjs";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    password: {
      type: String,
      require: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error("password must be at leat 5 characters");
          return false;
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.post("validate", function (user) {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPassword, salt);
});

export const User = models?.User || model("User", UserSchema);
