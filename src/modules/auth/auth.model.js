import mongoose from "mongoose";

const UserTokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "usertokens",
  }
);

UserTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const UserTokenModel = mongoose.model("UserToken", UserTokenSchema);
