import { Sequelize } from "sequelize";

const sequelize = new Sequelize("angularlogin", "root", "usbw", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
