import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/testdb", {
    authSource: "admin",
    user: "root",
    pass: "example",
  });

  const kittySchema = new mongoose.Schema({
    name: String,
  });

  const Kitten = mongoose.model("Kitten", kittySchema);

  const silence = new Kitten({ name: "Silence" });
  console.log(silence.name); // 'Silence'

  silence.save();
}

main();
