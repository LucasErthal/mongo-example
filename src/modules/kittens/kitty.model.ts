import Mongoose from "mongoose";

const kittySchema = new Mongoose.Schema({
  name: String,
});

const KittenModel = Mongoose.model("Kitten", kittySchema);

export default KittenModel;
