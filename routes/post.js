const express = require("express");
const Post = require("../schemas/posts.js");
const router = express.Router();


// 전체 게시글 목록 조회 API : GET
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({});
        const showPost = posts.map((post) => {
            return {
                postId: post["_id"],
                user: post["user"],
                title: post["title"],
                createdAt: post["createdAt"],
            };
        });
        res.json({ "data": showPost });
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 특정 게시글 상제 조회 API : GET
router.get("/:_postId", async (req, res) => {
    try {
      const postId = req.params;
      const post = await Post.findById({ _id: postId["_postId"] });
      console.log(post);
      const newPost = {
        postId: post["_id"],
        user: post["user"],
        title: post["title"],
        createdAt: post["createdAt"],
      };
      res.json({ data: newPost });

    } catch (err) {
      res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
  });



// 게시글 생성 API : POST
router.post("/", async (req, res) => {
    try {
        const { user, password, title, content } = req.body;
        const posts = await Post.create({
            user,
            password,
            title,
            content,
        });
        res.json({ message: "게시글을 생성하였습니다." });

    } catch (err) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});


// 특정 게시글 수정 API : PUT
router.put("/:_postId", async (req, res) => {
    try {
        const postId = req.params;
        const { password, title, content } = req.body;

        const existPost = await Post.findOne({ _id: postId["_postId"] });
        if (!existPost) {
            return res.json({ message: "게시글 조회에 실패했습니다." });
        }

        const post = await Post.updateOne(
            { _id: postId["_postId"] },
            {
                password,
                title,
                content,
            }
        );
        res.json({ message: "게시글을 수정하였습니다." });

    } catch (err) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다!!" });
    }
});


// 특정 게시글 삭제 API : DELETE
router.delete("/:_postId", async (req, res) => {
    try {
        const postId = req.params;

        const existPost = await Post.findOne({ _id: postId["_postId"] });
        if (!existPost) {
            return res.json({ message: "게시글 조회에 실패했습니다." });
        }

        const post = await Post.deleteOne({ _id: postId["_postId"] });

        res.json({ message: "게시글을 삭제하였습니다." });

    } catch (err) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
});


module.exports = router;


