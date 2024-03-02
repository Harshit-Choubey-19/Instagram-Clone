const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");

//Routes

router.get("/allposts", requireLogin, (req, res) => {
  POST.find()
    .populate("postedBy", "_id name userName Photo")
    .populate("comments.postedBy", "_id name userName")
    .sort("-createdAt")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createPost", requireLogin, (req, res) => {
  const { body, pic } = req.body;
  console.log(pic);
  if (!body || !pic) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  console.log(req.user);
  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

router.get("/myposts", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name userName Photo")
    .populate("comments.postedBy", "_id name userName")
    .sort("-createdAt")
    .then((myposts) => {
      res.json(myposts);
    });
});

router.put("/like", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name userName")
    .populate("postedBy", "_id name userName Photo")
    .then((result, err) => {
      if (result) {
        res.json(result);
      } else {
        return res.status(422).json({ error: err });
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name userName")
    .populate("postedBy", "_id name userName Photo")
    .then((result, err) => {
      if (result) {
        res.json(result);
      } else {
        return res.status(422).json({ error: err });
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name userName")
    .populate("postedBy", "_id name userName Photo")
    .then((result, err) => {
      if (result) {
        res.json(result);
      } else {
        return res.status(422).json({ error: err });
      }
    });
});

// API to delete post
router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  POST.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id name userName Photo")
    .then((post, err) => {
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .deleteOne()
          .then((result) => {
            return res.json({ message: "Succefully deleted" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (err || !post) {
        res.status(422).json({ error: err });
      }
    });
});

//to show following post
router.get("/myfollowingpost", requireLogin, (req, res) => {
  POST.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name userName Photo")
    .populate("comments.postedBy", "_id name userName")
    .sort("-createdAt")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
