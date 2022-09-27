import express, { Application } from "express";
import cors from "cors";
import routesProducts from "../routes/product";
import routesUser from "../routes/user";
// import sequelize from "../db/connection";
import { Product } from "./product";
import { User } from "./user";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express(); //-> Crea una App de Expres
    this.port = process.env.PORT || "3001";
    this.midlewares();
    this.listen();
    this.routes();
    this.dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App running on port: " + this.port);
    });
  }

  routes() {
    this.app.use("/api/products", routesProducts);
    this.app.use("/api/user", routesUser);
  }

  midlewares() {
    // Parseo Body
    this.app.use(express.json());

    // Cors
    this.app.use(cors());
  }

  async dbConnection() {
    try {
      await Product.sync();
      await User.sync();
      console.log("Connection has been established succesfully");
    } catch (error) {
      console.log("Unable to connect to the database --> " + error);
    }
  }
}

export default Server;
