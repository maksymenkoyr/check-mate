const friendsSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: Number,
    enums: [
      0,    //'not a friends',
      1,    //'requested',
      2,    //'friends'
    ]
  }
}, { timestamps: true })