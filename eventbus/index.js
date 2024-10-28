const { default: axios } = require("axios");
const express = require("express");

const app = express();
const PORT = 6000;

app.use(express.json());

app.post("/events", async (req, res) => {
  try {
    const { event } = req.body;

    console.log("Received event:", event);

    axios.post("http://localhost:3000/events", { event });
    axios.post("http://localhost:4000/events", { event });
    axios.post("http://localhost:5001/events", { event });

    res.json({ ok: "ok" });
  } catch (error) {
    console.log({ error });
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Post service running on http://localhost:${PORT}`);
});
