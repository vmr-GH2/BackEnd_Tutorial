const mongoose = require("mongoose");
const USER = require("./model/user");

mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(console.log("MongoDb connected...."));

/* async function createUser() {
  try {
    const user = await USER.create({
      name: "varun rakshe",
      age: 19,
      email: "example12@gmail.com",
      hobbies: ["chess", "gym", "outing"],
      address: {
        street: "navi galli",
        city: "belgaum",
        state: "karnataka",
      },
    });

    update the user
    user.name = "namrate patil"
    await user.save();

    const user = new USER({ name: "varun rakshe", age: 22})
    await user.save().then(() => console.log("user saved.."));

    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
} */
//createUser();

async function findUser() {
  try {
    //const user = await USER.findById("67b0121d7d949fce9b40866c");
    const users = await USER.find({}).lean()
    //const user = await USER.deleteOne({name:"varun rakshe"})
    //const user = await USER.where("age").gt(18).limit(1).populate("bestFriend");

    // user[0].bestFriend = "67b0122a520d919add4a8f4e";
    // await user[0].save()
    //const user =  await USER.findByName("varun rakshe")
    //const user = await USER.find().byName("varun rakshe")
    // user.sayHi();
    // const user = await USER.findOne({
    //   name: "varun rakshe"
    // });
    // console.log(user);
    // await user.save();
    // console.log(user)
     console.log(users)
    //console.log(user.userEmail);//using virtual 
  } catch (e) {
    console.log(e.message);
  }
}

findUser();
