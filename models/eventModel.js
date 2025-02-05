const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    // TODO extract magic strings into a json file for language suppport
    required: [true, 'Title is required']
  },
  description: {
    type: String,
  },
  date: {
    Date,
  },
  start: {
    Date,
  },
  end: {
    Date,
  },
  time: {
    type: String,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Event', eventSchema)