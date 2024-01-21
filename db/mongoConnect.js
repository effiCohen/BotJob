const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery',false);
    await mongoose.connect(`Enter your MongoDB connection string`);
    console.log("mongo connect ");
}

