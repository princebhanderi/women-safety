const mongoose = require('mongoose');

// Schema for contacts who DO NOT have the app
const offlineContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
    },
  },
  { _id: false } // No need to generate separate MongoDB IDs for offline contacts
);

const emergencyGroupSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    // Contacts who DO have the app (referenced by User Object ID)
    appMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // Pending requests for app users
    pendingRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // Contacts who DO NOT have the app (stored directly as name + phone)
    offlineContacts: [offlineContactSchema],
  },
  {
    timestamps: true,
  }
);

const EmergencyGroup = mongoose.model('EmergencyGroup', emergencyGroupSchema);

module.exports = EmergencyGroup;
