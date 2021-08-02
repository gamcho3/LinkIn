const express = require("express"); //express
const connectDB = require("./config/db"); //db 연결
const app = express();

//connect server
connectDB();

//init middleware
app.use(express.json({ extended: false })); //데이터를 req.body 객체로 만들어주는 미들웨어

app.get("/", (req, res) => {
  res.send("API Running");
});

//define Route
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start ${PORT}`)); //어떤 포트로 실행하는지 확인
