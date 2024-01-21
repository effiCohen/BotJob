const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    `mongodb+srv://EffiCohen:effi1234@cluster0.rbgu9mo.mongodb.net/BotJob`
  );
  console.log("mongo connect ");
}
