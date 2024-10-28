const express = require("express");

const app = express();
const PORT = 5001;

app.use(express.json());
const posts = [];

app.post("/events", async (req, res) => {
  const { event } = req.body;

  console.log("Received event:", event);

  if (event?.eventType === "createPost") {
    const { id, content, createdAt } = event;
    posts.push({ id, content, createdAt, comments: [] });
    console.log("Post added:", event);
  } else if (event?.eventType === "createComment") {
    const post = posts.find((p) => p.id === event.postId);

    if (post) {
      post.comments = post.comments || [];

      post.comments.push({
        id: event.id,
        content: event.content,
        createdAt: event.createdAt,
      });
      console.log("Comment added to post:", post.id, event.content);
    } else {
      console.log(`Post with id ${event.postId} not found`);
    }
  }

  res.status(200).json({ message: "Event processed" });
});

app.get("/", async (req, res) => {
  res.json({ posts });
});
app.listen(PORT, () => {
  console.log(`Post service running on http://localhost:${PORT}`);
});
