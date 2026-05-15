import Poll from '../models/polls.models'
import {v4 as uuidv4} from 'uuid'

const createPoll = async (req, res) => {
    try {
        const {question, options, requiresAuth} = req.body

        const formattedOptions = options.map((optionText) => {
            return { 
                text: optionText, 
                votes: 0 
            }
        });

        const newPoll = new Poll({
            question: question,
            options: formattedOptions,
            requiresAuth: requiresAuth,
            creator: req.user.userId, 
            shareId: uuidv4() // Generate a unique random string for the URL
        });

        const savedPoll = await newPoll.save();

        req.app.get('socketio').emit('newPoll', savedPoll);

        res.status(201).json({ 
            message: "Poll created successfully", 
            shareLink: `http://localhost:5173/vote/${savedPoll.shareId}` 
        });
    }
    catch(error) {
        res.status(500).json({ error: "Failed to create poll." });
    }
}

const getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find().sort({ createdAt: -1 });
        res.status(200).json(polls);
    } 
    catch (error) {
        res.status(500).json({ error: "Failed to fetch polls." });
    }
    
}

const getPollBySharedId = async (req, res) => {
    try {
        const shareId = req.params.shareId;
        const poll = await Poll.findOne({ shareId: shareId });

        if (!poll) {
        return res.status(404).json({ error: "Poll not found." });
        }

        res.status(200).json(poll);
    } 
    catch (error) {
        res.status(500).json({ error: "Failed to fetch poll details." });
    }
}

const voteOnPoll = async (req, res) => {
    try {
        const shareId = req.params.shareId;
        const optionId = req.body.optionId;

        // Step 1: Find the poll in the database
        const poll = await Poll.findOne({ shareId: shareId });

        if (!poll) {
        return res.status(404).json({ error: "Poll not found." });
        }

        if (poll.requiresAuth) {
            // If the user object isn't attached by your middleware, they aren't logged in
            if (!req.user) {
                return res.status(401).json({ error: "The creator requires you to log in to vote on this poll." });
            }

            // Step 3: Prevent double voting by checking the 'voters' array
            const hasAlreadyVoted = poll.voters.includes(req.user.userId);
            if (hasAlreadyVoted) {
                return res.status(403).json({ error: "You have already voted on this poll." });
            }

            // Step 4: Add this user to the voters array so they can't vote again
            poll.voters.push(req.user.userId);
        }

        const selectedOption = poll.options.id(optionId);

        if (!selectedOption) {
            return res.status(400).json({ error: "Invalid option selected." });
        }

        selectedOption.votes += 1;

        // Step 7: Save the updated document back to the database
        const updatedPoll = await poll.save();

        // Step 8: Emit the real-time update to anyone currently looking at the results
        req.app.get('socketio').emit('voteUpdate', updatedPoll);

        res.status(200).json({ message: "Vote recorded successfully." });

    } 
    catch (error) {
        res.status(500).json({ error: "Failed to process vote." });
    }
}

export {createPoll, getAllPolls, getPollBySharedId, voteOnPoll}