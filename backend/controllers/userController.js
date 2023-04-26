const User = require("./../models/userModel");

exports.follow = async (req, res) => {
  const follower = await User.findById(req.user._id);
  const followee = await User.findById(req.body.id);
  const data = follower.following.find(el => el.id === req.body.id)
  if (data) {
    const index = follower.following.findIndex(element => element.id === req.body.id);
    follower.following.splice(index, 1);
    const index2 = followee.followers.findIndex(element => element.id === req.user._id);
    followee.followers.splice(index2, 1);
    await follower.save();
    await followee.save();
    return res.status(200).json({
      id: req.body.id,
      message: "unfollowed",
    });
  } else {
    follower.following.push(req.body);
    await follower.save()
    followee.followers.push({ id: req.user.id, username: req.user.username });
    await followee.save();
    return res.status(200).json({
      id: req.body.id,
      message: "followed",
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const regex = new RegExp(`${req.body.name}`, "i")
    const user = await User.find({ username: regex }, "username _id avatar");
    res.status(200).json({
      status: "Successfull",
      user
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const owner = await User.findById(req.user._id);
    res.status(200).json({
      message: "Successfull",
      owner,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const owner = await User.findById(req.user._id);
    Object.assign(owner, { ...req.body });
    owner.save();
    res.status(200).json({
      message: "Successfully updated",
      owner,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const owner = await User.findById(req.user._id).select("+password");
    if (await owner.correctPassword(req.body.oldPassword, owner.password)) {
      const password = req.body.newPassword;
      Object.assign(owner, { password });
      owner.save();
      res.status(200).json({
        message: "Password Updated successfully",
      });
    } else {
      res.status(400).json({
        message: "Incorrect Old password",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const owner = await User.findByIdAndDelete(req.user._id);
    res.status(200).json({
      message: "Account deleted successfully",
      owner,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
