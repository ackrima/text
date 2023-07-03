const express = require('express'); 
const app = express();                          

 // 라우터 등록
const postsRouter = require('./routes/post.js');
const commentsRouter = require('./routes/comments.js');

const connect = require("./schemas/index.js");
const port = 3000;
connect(); 

app.use(express.json()); // 전역미들웨어 모든 것들은 json 형식으로 표현 됨

app.use("/posts", [postsRouter,commentsRouter]); // 라우터 연결

/*
app.use("/", routers);
routes 에 index.js 를 만들고 거기에 라우터 연결 코드를 작성함.

/ routes / index.js 의 코드
const express = require("express");
const commentRouter = require("./comments");
const postRouter = require("./posts");
const router = express.Router();

router.use("/posts", postRouter, commentRouter); // 게시글 댓글

module.exports = router;
*/

app.listen(port, () => {
    console.log(port, '번 포트로 서버가 열렸어요!')
});

