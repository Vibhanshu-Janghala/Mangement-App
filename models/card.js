const mongoose = require("mongoose");


const cardSchema = new mongoose.Schema({
	title: {type: String, required: true,
			index: {unique: true, partialFilterExpression: { title: { $type: 'string' } }}
			},
    givenDescription: {type: String, required: true},
    priority: {type: String, required: true},
    progressList: [{
		content: String,
		isChecked:Boolean
	}],
    managedBy :{type:String},
    dueDate :{type:String}
	});
	
module.exports = cardSchema;