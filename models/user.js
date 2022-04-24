const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    Username: {
        type: String,
        Unique:true ,
        required:true,
         trim:true
    },

    Email: {
        type:String,
        required:true,
        unique:true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: {
            validator: function() {
              return new Promise((res, rej) =>{
                User.findOne({email: this.email, _id: {$ne: this._id}})
                    .then(data => {
                        if(data) {
                            res(false)
                        } else {
                            res(true)
                        }
                    })
                    .catch(err => {
                        res(false)
                    })
              })
            }, message: 'Email Already Taken'
          }
        },

     thoughts: [
        {
            type: Schema.Types.ObjectId,
              ref: 'Thought'
         },
        
         friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },

    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

const User = model('User', UserSchema);
module.exports = User;
