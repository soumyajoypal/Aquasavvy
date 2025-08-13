const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name!"],
    },
    username: {
      type: String,
      required: [true, "Please Enter Username!"],
      validate: {
        validator: async function (username) {
          if (this.isModified("username")) {
            const user = await mongoose.models.User.findOne({ username });
            return !user || !user.isVerified || user._id.equals(this._id);
          }
          return true;
        },
        message: "Username is already in use!",
      },
    },
    email: {
      type: String,
      required: [true, "Please Enter Email!"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email!",
      ],
      validate: {
        validator: async function (email) {
          if (this.isModified("email")) {
            const user = await mongoose.models.User.findOne({
              email,
            });
            return !user || !user.isVerified || user._id.equals(this._id);
          }
          return true;
        },
        message: "Email is already in use!",
      },
    },
    leaderBoardPosition: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: "/images/no-profile.png",
    },
    password: {
      type: String,
      required: [true, "Please Enter Password!"],
    },
    coins: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    playerLevel: {
      type: Number,
      default: 1,
    },
    groundWaterLevel: {
      type: Number,
      default: 100,
    },
    badgesEarned: {
      type: Number,
      default: 0,
    },
    completedTasks: [
      {
        task: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task",
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", userSchema);
