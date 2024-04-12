import connectDB from "./utils/Database.js";
import app from "./app.js";

const port = process.env.PORT || 4000;

app.get("/", (req, res, next) => {
  res.send("<h1>working</h1>");
});

connectDB();
app.listen(port, () => {
  console.log(`Backend Server  http://localhost:${port}`);
});
