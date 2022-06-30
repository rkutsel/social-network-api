const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
	getUsers(req, res) {
		User.find()
			.select("-__v")
			.populate("friends")
			.populate("thoughts")
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select("-__v")
			.populate("friends")
			.populate("thoughts")
			.then((user) =>
				!user
					? res.status(404).json({ message: "User Not Found" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	createUser(req, res) {
		User.create(req.body)
			.then((userData) => {
				res.json(userData);
				console.log(userData);
			})
			.catch((err) => res.status(500).json(err));
	},
	updateUser(req, res) {
		User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
			returnOriginal: false,
		})
			.select("-_id -__v -thoughts")
			.populate("friends")
			.then((userData) => {
				res.json(userData);
				console.log(userData);
			})
			.catch((err) => res.status(500).json(err));
	},
	deleteUser(req, res) {
		User.findByIdAndDelete({ _id: req.params.userId })
			.select("-_id -__v")
			.populate("friends")
			.then((userData) => {
				Thought.deleteMany({ username: userData.username }).then((err) => err);
				console.log(userData.username);
				res.json(userData);
				console.log(userData);
			})
			.catch((err) => res.status(500).json(err));
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
			.catch((err) => res.status(500).json(err));
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
			.catch((err) => res.status(500).json(err));
	},
};
