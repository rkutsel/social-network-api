const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			unique: true,
			required: [true, "Cannot Be Empty"],
			min: 1,
			max: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: { type: Date },
		username: { type: String, required: true },
		reactions: [reactionSchema],
		__v: { type: Number, select: false },
	},
	{
		// Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
		// Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
		toJSON: {
			virtuals: true,
		},
		id: false,
	},
	{ versionKey: false }
);

thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

thoughtSchema.virtual("postedOn").get(function () {
	return this.createdAt.toDateString();
});

thoughtSchema.pre("findOneAndUpdate", function () {
	this.set({ updatedAt: new Date() });
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
