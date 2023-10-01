import Mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";

const kittySchema = new Mongoose.Schema({
  name: String,
});

const KittenModel = Mongoose.model("Kitten", kittySchema);

const KittyTC = composeWithMongoose(KittenModel, {});

const returnNameInUpperCase = schemaComposer.createResolver({
  name: "findByIdUppercase",
  type: "String",
  args: {
    id: "MongoID",
  },

  resolve: async ({ args }) => {
    const kitty = await KittenModel.findById(args.id);

    if (kitty) {
      return kitty.name?.toUpperCase();
    }
  },
});

schemaComposer.Query.addFields({
  kittyById: KittyTC.getResolver("findById"),
  kittyUppercase: returnNameInUpperCase,
});

schemaComposer.Mutation.addFields({
  kittyCreateOne: KittyTC.getResolver("createOne"),
});

const _graphqlSchema = schemaComposer.buildSchema();

export default _graphqlSchema;
