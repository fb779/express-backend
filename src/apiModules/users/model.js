const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const mongooseUniqueValidator = require('mongoose-unique-validator');

const UserSchecma = new Schema(
  {
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, default: null},
  },
  {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}}
);

UserSchecma.plugin(mongooseUniqueValidator, {message: '{PATH} is not unique'});

module.exports = model('User', UserSchecma);

// const UserInfoSchecma = new Schema(
//   {
//     user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//     first_name: {type: String, required: true},
//     last_name: {type: String, required: true},
//     birthday: {type: Date, required: true},
//     phone: {type: String, default: null},
//     address: {type: String, default: null},
//   },
//   {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}}
// );

// UserInfoSchecma.plugin(mongooseUniqueValidator, {message: '{PATH} is not unique'});
// module.exports = model('Info', UserInfoSchecma);
