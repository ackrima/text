const express = require("express");
const Comment = require("../schemas/comment.js");
const router = express.Router();

// 댓글 생성
router.post("/:_postId/comments", async (req, res) => {
  try {
    const postId = req.params;
    const { user, password, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
    }

    const comment = await Comment.create({
      postId: postId["_postId"],
      user,
      password,
      content,
    });

    return res.json({ message: "댓글을 생성하였습니다." });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// 댓글 조회
router.get("/:_postId/comments", async (req, res) => {
  try {
    const postId = req.params;
    console.log(postId);
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const comments = await Comment.find({ postId: postId["_postId"] });
    const showComments = comments.map((comment) => {
      return {
        commentId: comment["_id"],
        user: comment["user"],
        content: comment["content"],
        createdAt: comment["createdAt"],
      };
    });
    res.json({ data: showComments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 댓글 수정
router.put("/:_postId/comments/:_commentId", async (req, res) => {
  try {
    const commentId = req.params;
    console.log(commentId);
    const existingComment = await Comment.findById(commentId._commentId);
    if (!existingComment) {
      return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
    }

    const { password, content } = req.body;
    console.log(password, content);
    if (!content) {
      return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
    }

    const comment = await Comment.updateOne(
      { _id: commentId._commentId },
      {
        password,
        content,
      }
    );

    res.json({ message: "댓글을 수정하였습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "댓글의 형식이 올바르지 않습니다." });
  }
});

//댓글 삭제
router.delete("/:_postId/comments/:_commentId", async (req, res) => {
  try {
    const { _commentId } = req.params;
    const { password } = req.body;
    if (!password || Object.keys(req.params).length < 2) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다" });
    }
    const comments = await Comment.find({ _id: _commentId });

    if (!comments.length)
      // _commentId(자원) 에 해당하는 값을 찾지 못했으므로 404코드.
      return res
      .status(404)
      .json({ message: "댓글 조회에 실패했습니다" });

    await Comment.deleteOne({ _id: _commentId });
    return res
    .status(200)
    .json({ message: "댓글을 삭제하였습니다" });

  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
