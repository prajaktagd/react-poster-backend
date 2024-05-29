const fs = require("fs/promises");

const getPosts = async () => {
  const rawFileContent = await fs.readFile("./data/posts.json", { encoding: "utf-8" });
  return (JSON.parse(rawFileContent)).posts || [];
};

const storePosts = (posts) => {
  return fs.writeFile("./data/posts.json", JSON.stringify({ posts: posts || [] }));
}

module.exports = { getPosts, storePosts };
