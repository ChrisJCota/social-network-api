const { User, Thought } = require("../models");

module.exports = {
    //getting all thoughts
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // getting a single thought
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // creating a thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(thoughtInfo => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: thoughtInfo._id } },
                    { new: true }
                )
                    .then((thought) => {
                        !thought
                            ? res.status(404).json({ message: 'No User with this ID' })
                            : res.json(thought)
                    })

            })
    },
    // createThought({ body }, res) {
    //     Thought.create(body)
    //         .then(thoughtData => {
    //             User.findOneAndUpdate(
    //                 { _id: body.userId },
    //                 { $push: { thoughts: thoughtData._id } },
    //                 { new: true }
    //             )
    //                 .then(userData => {
    //                     if (!userData) {
    //                         res.status(404).json({ message: 'Thought created but no user found with this id' });
    //                         return;
    //                     }
    //                     res.json(userData);
    //                 })
    //                 .catch(err => res.json(err));
    //         })
    //         .catch(err => res.status(400).json(err));
    // },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thoughts) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No such student exists' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'Thought deleted, but no User found',
                });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create a reaction
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction exists' });
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //delete a reaction
    async removeReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res
                    .status(404)
                    .json({ message: 'No reaction found with that ID :(' });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}