const User = require("./../models/userModel");

exports.follow = async (req, res) => {
  const follower = await User.findById(req.user._id);
  const followee = await User.findById(req.params.id);
  if (follower.following.includes(req.params.id)) {
    const index = follower.following.indexOf(req.params.id);
    follower.following.splice(index, 1);
    const index2 = followee.followers.indexOf(req.user._id);
    followee.followers.splice(index2, 1);
    await follower.save();
    await followee.save();
    return res.status(200).json({
      status: "successfull",
      message: "Unfollowed",
    });
  } else {
    follower.following.push(req.params.id);
    await follower.save();
    followee.followers.push(req.user._id);
    await followee.save();
    return res.status(200).json({
      status: "successfull",
      message: "Followed",
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Successfull",
      user,
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
    console.log("request come by getUser")
    const owner = await User.findById(req.user._id);
    res.status(200).json({
      status: "Successfull",
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
    const owner = await User.findById(req.params.id);
    console.log(owner);
    Object.assign(owner, { ...req.body });
    owner.save();
    res.status(200).json({
      status: "Successfully updated",
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
    const owner = await User.findById(req.params.id).select("+password");
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
    const owner = await User.findByIdAndDelete(req.params.id);
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
