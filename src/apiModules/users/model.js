const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const mongooseUniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    image: {type: String, default: null},
  },
  {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}}
);

// UserSchema.path('username').index({unique: true});

// UserSchema.path('email').index({unique: true});

UserSchema.plugin(mongooseUniqueValidator, {message: `The {PATH} - '{VALUE}': is not unique`});

/**
 * method of remove password to response
 */
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  const {_id, password, createdAt, updatedAt, __v, ...user} = userObject;

  return user;
};

module.exports = model('User', UserSchema);

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
