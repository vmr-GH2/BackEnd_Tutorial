const mongoose = require("mongoose");

//create the user schema
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    age: {
      type: Number,
      //default: 18,
      //immutable: true, //can not change later
      validate: {
        validator: (v) => v > 18, //if false then print below as error
        message: (props) => `your are not eligible.your are under 18`,
      },
    },
    email: {
      type: String,
      unique: true,
      //required: true,
    },
    bestFriend: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user1", //collection name // References the 'User1' collection
    },
    hobbies: [String],
    address: addressSchema,
  },
  {
    timestamps: true,
  }
);

//instance method
userSchema.methods.sayHi = function () {
  console.log(`Hi, I am ${this.name}`);
};

//static method
userSchema.statics.findByName = function (name) {
  return this.findOne({ name: name });// "this" refers to the model
  //return this.where({name:new RegExp(name,"i")});
};

userSchema.query.byName = function (name) {
  //return this.find({ name: name });
  return this.where({name:new RegExp(name,"i")});
};

userSchema.virtual("userEmail").get(function(){
  return `${this.name} <${this.email}>`
})

//middleware are used for save,validate, remove
//pre and post hooks
userSchema.pre("save",function(next){
  console.log("before save");
  this.age = 20;
  next();
})
userSchema.post("save",function(doc,next){
 console.log("after save");
 this.age = 22;
 next();
})

USER = mongoose.model("user1", userSchema);
module.exports = USER;
