const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.rbgu9mo.mongodb.net/BotJob`
  );
  console.log("mongo connect");
}
