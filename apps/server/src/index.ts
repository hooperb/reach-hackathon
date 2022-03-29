import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const port = process.env.PORT || 3000;

const app = express();

// add middlewares
app.use(helmet());
app.use(compression());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// listen to provided port
app.listen(port, () => {
  console.log(`The application is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
