import "dotenv/config";
import express from "express";
import path from "path";

const __dirname = path.dirname(import.meta.filename);

// notice that the result of `remix vite:build` is "just a module"
// import * as build from "./build/server/index.js";

const app = express();

const router = express.Router();
const publicPath = process.env.REMIX_APP_BASE_PATH;
router.use(express.static("build/client"));
// and your app is "just a request handler"
router.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./build/client/index.html"))
);
app.use(publicPath, router);

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
