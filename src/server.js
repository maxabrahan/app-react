const express = require("express");

const bodyParser = require("body-parser");
const v1WinnerRouter = require("./v1/routes/winnerRoutes");
const v1AuthRouter = require("./v1/routes/authRoutes");
const v1superSecureResourceRouter = require("./v1/routes/superSecureResourceRoutes");


const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/winners", v1WinnerRouter);
app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1", v1superSecureResourceRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);

  V1SwaggerDocs(app, PORT);
});