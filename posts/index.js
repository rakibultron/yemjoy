const express = require("express");
const short = require("short-uuid");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [];

app.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newPost = {
      id: short.generate(),
      title,
      content,
      createdAt: new Date(),
    };

    posts.push(newPost);
    const event = {
      eventType: "createPost",
      id: newPost.id,
      content: newPost.content,
      createdAt: newPost.createdAt,
    };
    axios.post("http://event-bus-clusterip-service:6000/events", {
      event,
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.json({ error });
  }
});

app.get("/posts", async (req, res) => {
  try {
    res.json({ posts });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.post("/events", async (req, res) => {
  const { event } = req.body;
  console.log({ event });
});

app.listen(PORT, () => {
  console.log(`Post service running on http://localhost:${PORT}`);
});
