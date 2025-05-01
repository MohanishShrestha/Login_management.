import express, { json } from "express";
import connectToMongoDb from "./src/connectToDb/connectTiMongoDb.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

import PageNotFound from "./src/middleware/pageNotFound.js";
import randomRouter from "./src/Router/randomRouter.js";
import { port } from "./src/constant.js";
import webRouter from "./src/Router/webRouter.js";

let app = express();
app.listen(port, () => {
  console.log(`application is listening at port ${port}`);
  connectToMongoDb();
});

app.use(json()); //always top to take data

app.use("/random", randomRouter);
app.use("/web", webRouter);

app.use(errorMiddleware);

app.use("/*", PageNotFound);
