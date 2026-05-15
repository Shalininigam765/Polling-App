import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './dashboard.css';


const socket = io('http://localhost:8080');

function Dashboard({navigateTo}) {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await fetch('/api/v1/polls');
                const data = await response.json()

                if (response.ok) {
                    setPolls(data);
                }

            }
            catch (error) {
                console.error("Failed to fetch polls");
            }
            finally{
                setLoading(false);
            }
        }

        fetchPolls()
    }, [])

    useEffect(() => {
        const handleNewPoll = (newPoll) => {
            setPolls((currentPolls) => {
                const updatedPolls = [newPoll, ...currentPolls];
                return updatedPolls;
            })
        }

        //start listening for new polls
        socket.on('newPoll', handleNewPoll);

        //cleanup on unmount
        return () => {
            socket.off('newPoll', handleNewPoll);
        }
    }, [])

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-loading">
                    <p>Loading polls...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='dashboard-page'>
            <div className="dashboard-page__orb dashboard-page__orb--1" />
            <div className="dashboard-page__orb dashboard-page__orb--2" />
            
            <div className='dashboard-container'>
                <h1>Mythos Poll Dashboard</h1>
                <p>View all your polls here</p>

                {polls.length === 0? (
                    <div className="dashboard-empty">
                        <p>No polls created yet.</p>
                    </div>
                ): (
                    <div className="polls-grid">
                        {polls.map((poll) => (
                            <div key={poll._id} className='poll-card'>
                                <h3>{poll.question}</h3>
                                <p><strong>Total Options:</strong> {poll.options.length}</p>
                                {poll.requiresAuth && <div className="poll-card-auth">Requires Login</div>}

                                <div className="poll-card-actions">
                                    <button onClick={() => navigator.clipboard.writeText(`http://localhost:5173/vote/${poll.shareId}`)}>
                                        Copy link
                                    </button>
                                    <button onClick={() => navigateTo(`vote/${poll.shareId}`)}>
                                        View Poll
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button className="create-poll-btn" onClick={() => navigateTo('createPoll')}>+</button>
            </div>
        </div>
    )
}

export default Dashboard;