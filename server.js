const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const userRouter = require("./routes/users");
const showRouter = require("./routes/shows");

app.use("/users", userRouter);
app.use("/shows", showRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
