const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      age: {
        type: Number,
        required: false,
      },
      dob: {
        type: Date,
        required: false,
      },
      active: {
        type: Boolean,
        required: true,
        default: true,
      },
      followers:[
        {
          userId:{
            type: Schema.Types.ObjectId,
            ref:'users'
          },
          dateTime:{
            type:Date,
            require:true
          },
          name:{
            type:String
          }
        }
      ]
})

module.exports = User = mongoose.model('user',UserSchema);