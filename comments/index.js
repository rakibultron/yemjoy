const express = require("express");
const short = require("short-uuid");
const axios = require("axios");
const app = express();

const PORT = 4000;


app.use(express.json());

// In-memory data store
let comments = [];


app.post("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  const { content, author } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content and author are required" });
  }

  const newComment = {
    id: short.generate(),
    postId: postId,
    content,
    // author,
    createdAt: new Date(),
  };

  comments.push(newComment);
  const event = {
    eventType: "createComment",
    id: newComment.id,
    postId: newComment.postId,
    content: newComment.content,
    createdAt: newComment.createdAt,
  };
  axios.post("http://localhost:6000/events", { event });
  res.status(201).json(newComment);
});


app.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  const postComments = comments.filter((comment) => comment.postId === postId);
  res.json(postComments);
});

app.post("/events", async (req, res) => {
  const { event } = req.body;
  console.log({ event });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Comments service running on http://localhost:${PORT}`);
});
