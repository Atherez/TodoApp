const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Item List

const ItemList = new Schema({
    item_name:{
        type: String,
        required: true,
    },
    deadline:{
        type: Date,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ['Incomplete', 'Pending', 'Completed'],
    },
    description:{
        type: String,
        required: false,
    },
    flags:{
        type: String
    },
});

module.exports = ItemList = mongoose.model('myItemList', ItemList);
