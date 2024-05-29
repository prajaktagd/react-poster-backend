const app = require("express")();
const bodyParser = require("body-parser");
const { getPosts, storePosts } = require("./fileUtils");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/posts", async (req, res) => {
  return res.json({ posts: await getPosts() });
});

app.get("/posts/:id", async (req, res) => {
  const posts = await getPosts();
  const post = posts.find((post) => post.id === req.params.id);
  return res.join({ post });
});

app.post("/posts", async (req, res) => {
  const existingPosts = await getPosts();
  const newPost = { ...req.body, id: Math.random().toString() };
  await storePosts([newPost, ...existingPosts]);
  return res.status(201).json({ message: "Stored new post.", post: newPost });
});

app.listen(8080, () => console.log("Server started listening of port 8080"));
