
const mongoose = require("mongoose");

module.exports = {

    checklistSchema: mongoose.Schema({
        name: { type: String, required: true},
        tasks: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Task'}
        ]
    }), 
    
    taskSchema: mongoose.Schema({
        name: {type: String, required: true},
        done: {type: Boolean, default: false},
        checklist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Checklist',
            required: true
        }
    })

}