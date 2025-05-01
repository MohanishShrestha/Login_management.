import { config } from "dotenv";

export const dburl = "mongodb://0.0.0.0:27017/dw22";
// export const dburl =
//   "mongodb+srv://shrestha:shrestha@code1.yl13w7s.mongodb.net/dw22";

config();
// export const password = process.env.PASSWORD;
// export const email = process.env.EMAIL;
export const secretkey1 = process.env.SECRET_KEY;
export const port = process.env.PORT;
// console.log(port);
