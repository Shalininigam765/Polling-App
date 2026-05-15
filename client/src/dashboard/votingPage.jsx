import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './votingPage.css';

const socket = io('http://localhost:8080');

function VotingPage() {
    const {shareId} = useParams();

    const [poll, setPoll] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSinglePoll = async () => {
        try {
            const response = await fetch(`/api/polls/vote/${shareId}`);
            const data = await response.json();

            if (response.ok) {
            setPoll(data);
            } 
            else {
            setErrorMessage(data.error || "Poll not found");
            }
        } 
        catch (error) {
            setErrorMessage("Error connecting to server");
        }
        };

        fetchSinglePoll();
    }, [shareId]);

    useEffect(() => {

        const handleVoteUpdate = (updatedPollData) => {
            if (poll && updatedPollData.shareId === poll.shareId) {
                setPoll(updatedPollData);
            }
        };

        socket.on('voteUpdate', handleVoteUpdate);

        return () => {
        socket.off('voteUpdate', handleVoteUpdate);
        };
    }, [poll]); 

    const handleVoteSubmit = async () => {
        if (selectedOptionId === '') {
            setErrorMessage("Please select an option first.");
            return;
        }
        setErrorMessage(''); 

        try {
        const payload = {
            optionId: selectedOptionId
        };

        const response = await fetch(`/api/v1/polls/vote/${shareId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            setHasVoted(true);
        } else {
            setErrorMessage(data.error || data.message);
        }
        } catch (error) {
        setErrorMessage("Something went wrong while submitting your vote.");
        }
    };

    if (errorMessage && !poll) {
        return (
            <div className="voting-page">
                <div className="voting-page__orb voting-page__orb--1" />
                <div className="voting-page__orb voting-page__orb--2" />
                <div className="voting-page__orb voting-page__orb--3" />
                <div className="voting-page-container voting-page-error">
                    <h2>{errorMessage}</h2>
                </div>
            </div>
        );
    }

    if (!poll) {
        return (
            <div className="voting-page">
                <div className="voting-page__orb voting-page__orb--1" />
                <div className="voting-page__orb voting-page__orb--2" />
                <div className="voting-page__orb voting-page__orb--3" />
                <div className="voting-page-container voting-page-loading">
                    <p>Loading poll data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="voting-page">
            <div className="voting-page__orb voting-page__orb--1" />
            <div className="voting-page__orb voting-page__orb--2" />
            <div className="voting-page__orb voting-page__orb--3" />

            <div className='voting-page-container'>
                <h2>{poll.question}</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                
                <div className="poll-meta">
                    {poll.requiresAuth && <p>🔒 Requires Login</p>}
                </div>

                <div className="poll-options">
                    {poll.options.map((option) => (
                        <div key={option._id} className={`poll-option ${selectedOptionId === option._id ? 'selected' : ''}`}>
                            {!hasVoted && (
                                <input 
                                    type="radio" 
                                    id={option._id}
                                    name="pollOption" 
                                    value={option._id}
                                    onChange={(e) => setSelectedOptionId(e.target.value)}
                                />
                            )}

                            <label htmlFor={option._id}>
                                {option.text}
                            </label>

                            <span className="poll-option-votes">
                                {option.votes}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="poll-actions">
                    {!hasVoted ? (
                        <button className="vote-submit-btn" onClick={handleVoteSubmit}>Submit Vote</button>
                    ) : (
                        <div className="poll-success">
                            <div className="poll-success-icon">✓</div>
                            <p>Thank you! Your vote has been recorded.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VotingPage;