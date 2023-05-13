const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        //TO DO: need to add formating and getter for time created
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    

});

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return `${this.reactions.length} `;
  });

  const Thoughts = model('user', thoughtSchema);

  module.exports = Thoughts;