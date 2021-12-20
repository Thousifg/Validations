const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name:{ type: 'string', required: true},
    last_name:{ type: 'string', required: true},
    email:{ type: 'string', required: true},
    password:{ type: 'string', required: true},
    age:{ type: 'number', required: false},
    gender:{ type: 'string', required: false}
},
{
    versionKey: false,
    timestamps: true,
}
);

module.exports = model("user", userSchema);