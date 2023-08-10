import KittenModel from "./kitty.model";
import { Express } from "express";

function kittyRoute(app: Express) {
  app.route("/kitty").get(async (req, res) => {
    try {
      const kitties = await KittenModel.find();

      res.status(200).send(kitties);
    } catch (e) {
      res.send(e);
    }
  });

  app.route("/kitty").post(async (req, res) => {
    try {
      const newKitty = new KittenModel(req.body);

      await newKitty.save();

      res.status(201).send("OK");
    } catch (e) {
      res.send(e);
    }
  });
}

export { kittyRoute };
