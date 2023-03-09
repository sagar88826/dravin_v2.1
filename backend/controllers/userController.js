const User = require("./../models/userModel")

exports.follow = async (req, res) => {
    const follower = await User.findById(req.user._id)
    const followee = await User.findById(req.params.id)
    if (follower.following.includes(req.params.id)) {
        const index = follower.following.indexOf(req.params.id)
        follower.following.splice(index, 1)
        const index2 = followee.followers.indexOf(req.user._id)
        followee.followers.splice(index2, 1)
        await follower.save()
        await followee.save()
        return res.status(200).json({
            status: "successfull",
            message: "Unfollowed"
        })
    } else {
        follower.following.push(req.params.id)
        await follower.save()
        followee.followers.push(req.user._id)
        await followee.save()
        return res.status(200).json({
            status: "successfull",
            message: "Followed"
        })
    }
}