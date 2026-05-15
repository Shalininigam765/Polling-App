import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


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
        return <p> Loading polls...</p>
    }

    return (
        <div className='dashboard-container'>
            <h1>Mythos Poll Dashboard</h1>
            <p> View all your polls here </p>

            {polls.length === 0? (
                <p> No polls created yet.</p>
            ): (
                polls.map((poll) => (
                    <div key={poll._id} className='poll-card'>
                        <h3> {poll.question}</h3>
                        <p> Total options : {poll.options.length}</p>
                        <p> Requires Login : {poll.requiresAuth? 'Yes' : 'No'}</p>

                        <button onClick={() => navigator.clipboard.writeText(`http://localhost:5173/vote/${poll.shareId}`)}>
                            Copy poll link
                        </button>
                    </div>
                ))
            )}

            <button onClick={navigateTo('createPoll')}></button>
        </div>
    )
}

export default Dashboard;