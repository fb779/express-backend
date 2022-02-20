const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const mongooseUniqueValidator = require('mongoose-unique-validator');

const RoleSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        status: {type: Boolean, default: false},
    },
    {collection: 'role', timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}}
);

RoleSchema.plugin(mongooseUniqueValidator, {message: `The {PATH} - '{VALUE}': is not unique`});

/**
 * static methods
 */
RoleSchema.static('findByName', function (value) {
    return this.findOne({name: value});
});

RoleSchema.static('findMultiplyByName', function (value) {
    return this.find({name: {$in: value}});
});

/**
 * method of remove password to response
 */
RoleSchema.methods.toJSON = function () {
    const roleObject = this.toObject();

    const {_id, __v, ...role} = roleObject;

    return role;
};

module.exports = model('Role', RoleSchema);
