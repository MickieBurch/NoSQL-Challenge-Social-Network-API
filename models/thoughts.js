const { Schema,Types, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength:280
      },
      username: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
          virtuals:true,
        getters: true
      },
      Id: false
    }
  );

const ThoughtSchema = new Schema(
    {
     username: {
        type: String,
        required: true
      },
      ThoughtText:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use ReplySchema to validate data for a reply
      reactions: [ReactionSchema]
    },

    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });


  
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;



