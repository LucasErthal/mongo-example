import express from "express";
import database from "./config/database";
import { kittyRoute } from "./modules/kittens/kitty.route";

const app = express();
app.use(express.json());
const port = 3000;

kittyRoute(app);

database.connect().then(() => {
  app.listen(port, () => console.log(`API rodando na porta ${port}`));
});
