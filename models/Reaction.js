const { Schema } = require("mongoose");

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: { type: String, required: true, max: 280 },
		username: { type: String, required: true },
		createdAt: {
			type: Date,
			default: Date.now,
		},
		__v: { type: Number, select: false },
	},
	{ versionKey: false }
);

reactionSchema.virtual("postedOn").get(function () {
	return this.createdAt.toDateString();
});

module.exports = reactionSchema;
