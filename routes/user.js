const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const POST = mongoose.model("POST");
const requireLogin = require("../middleware/requireLogin");

// to get user profile
router.get("/user/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      POST.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name userName Photo")
        .populate("comments.postedBy", "_id name userName")
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, post });
        });
    })
    .catch((err) => {
      res.status(404).json({ error: "User not found" });
    });
});

// to follow user
router.put("/follow", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    }
  ).then((result, err) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    USER.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      {
        new: true,
      }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  });
});

// to unfollow user
router.put("/unfollow", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.body.followId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    }
  ).then((result, err) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    USER.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.followId },
      },
      {
        new: true,
      }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  });
});

//to upload profile pic
router.put("/uploadProfilepic", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: { Photo: req.body.pic },
    },
    {
      new: true,
    }
  ).then((result, err) => {
    if (err) {
      res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
