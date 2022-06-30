const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "Username Is Required"],
			lowercase: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Email Address Required"],
			lowercase: true,
			trim: true,
			match: /^\w{3,10}\@\w{2,10}\.[a-z]{2,3}$/,
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
		friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
	},
	{ versionKey: false },
	{
		// Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
		// Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual("friendCount").get(function () {
	return `${this.friends.length}`;
});

const User = model("user", userSchema);

module.exports = User;
