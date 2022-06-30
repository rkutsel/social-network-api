const User = require("../models/User");
const Thought = require("../models/Thought");
const { serverError } = require("../utils/errors");

module.exports = {
	getUsers(req, res) {
		User.find()
			.select("-__v")
			.populate({ path: "friends", select: "-__v -thoughts" })
			.populate({ path: "thoughts", select: "-__v" })
			.then((users) => res.json(users))
			.catch(() => res.status(500).json(serverError()));
	},
	getSingleUser(req, res) {
		const userId = req.params.userId;
		User.findOne({ _id: userId })
			.select("-__v")
			.populate({ path: "friends", select: "-__v -thoughts" })
			.populate({ path: "thoughts", select: "-__v" })
			.then((user) =>
				!user
					? res.status(404).json({
							"Error Message": `User With Requested ID: ${userId} Not Found`,
					  })
					: res.json(user)
			)
			.catch(() => res.status(500).json(serverError()));
	},
	createUser(req, res) {
		User.create(req.body)
			.then((userData) => {
				res.json(userData);
				console.log(userData);
			})
			.catch(() => res.status(500).json(serverError()));
	},
	updateUser(req, res) {
		User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
			returnOriginal: false,
		})
			.select("-__v")
			.populate("friends")
			.populate("thoughts")
			.then((userData) => {
				res.json(userData);
				console.log(userData);
			})
			.catch(() => res.status(500).json(serverError()));
	},
	deleteUser(req, res) {
		User.findByIdAndDelete({ _id: req.params.userId })
			.select("-_id -__v")
			.populate({ path: "friends", select: "-__v -thoughts" })
			.then((userData) => {
				Thought.deleteMany({ username: userData.username }).then(
					(thoughtData) => thoughtData
				);
				console.log(userData.username);
				res.json(userData);
				console.log(userData);
			})
			.catch(() => res.status(500).json(serverError()));
	},
	addFriend(req, res) {
		User.updateOne(
			{ _id: req.params.userId },
			{ $push: { friends: req.params.friendId } }
		)
			.then((userData) => {
				res.json(userData);
				console.log(userData);
			})
			.catch(() => res.status(500).json(serverError()));
	},
	deleteFriend(req, res) {
		User.updateOne(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } }
		)
			.then((userData) => {
				res.json(userData);
				console.log(userData);
			})
			.catch(() => res.status(500).json(serverError()));
	},
};
