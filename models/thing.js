const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { v4 } = require('uuid');
const dataTables = require('mongoose-datatables');

const thingSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    uuid: { type: String, default: v4 },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

thingSchema.index({ createdAt: 1, uuid: 1 });
thingSchema.plugin(dataTables);

thingSchema.methods.public = function() {
  return {
    uuid: this.uuid,
    name: this.name
  };
};

module.exports = mongoose.model('Thing', thingSchema);
