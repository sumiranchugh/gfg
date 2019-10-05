import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { showErr } from "./config";
import productsRouter from "./routes/products";
import { initDB } from "./utils/elasticUtil";

const app = express();

app.use(morgan());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(join(__dirname, '../../client/build')));
app.use(cors());

app.get("/ll", (req, res) => {
  initDB("mapping.json", "products.json");
  res.send("hello");
});
app.use("/api/products", productsRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = showErr ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

export default app;
