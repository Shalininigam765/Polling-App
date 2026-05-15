import React, {useState} from 'react';
import './createPoll.css';

function CreatePoll ({navigateTo}) {
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])
    const [requiresAuth, setRequiresAuth] = useState(false)
    const [generatedLink, setGeneratedLink] = useState('')
    const [error, setError] = useState('')

    const handleOptionChange = (index, value) => {
        const newOptions = [...options]
        newOptions[index] = value
        setOptions(newOptions)
    }

    const handleAddOption = () => {
        setOptions([...options, ''])
    }

    const handleCreatePoll = async (e) => {
        e.preventDefault();
        setError('');
        setGeneratedLink('');


        try{
            const response = await fetch("/api/v1/polls/create", {
                method: 'POST',
                headers: {'Content-Type': 'Application/json'},
                body: JSON.stringify({
                    question,
                    options,
                    requiresAuth
                })
            })

            const data = await response.json();

            if (response.ok){
                setGeneratedLink(data.shareLink)
                setQuestion('');
                setOptions(['', '']);
                setRequiresAuth(false);
            }
            else{
                setError(data.message || 'Failed to create poll. Please try again.')
            }
        }
        catch (err) {
            setError("Something went wrong while connecting to the server.");
        }
    }

    return (
        <div className="create-poll-page">
            <div className="create-poll-page__orb create-poll-page__orb--1" />
            <div className="create-poll-page__orb create-poll-page__orb--2" />
            <div className="create-poll-page__orb create-poll-page__orb--3" />
            {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="create-poll-page__particle" style={{ '--i': i }} />
            ))}

            <div className="create-poll-container">
                <h2>Create a New Poll</h2>
                {error && <p className="error-message">{error}</p>}

                <form className="create-poll-form" onSubmit={handleCreatePoll}>
                    <div>
                        <label> Your Question </label>
                        <input 
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label> Options </label>
                        {options.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                            />
                        ))}
                        <button type="button" onClick={handleAddOption}>Add another Option</button>
                    </div>

                    <div className="auth-option">
                        <label>
                            <input 
                            type="checkbox" 
                            checked={requiresAuth} 
                            onChange={(e) => setRequiresAuth(e.target.checked)} 
                            />
                            Require voters to be logged in
                        </label>
                    </div>

                    <button type='submit'> Create Poll </button>
                </form>

                {generatedLink && (
                    <div className='generateLink' >
                        <p>Poll created successfully!! Share this link:</p>
                        <a href={generatedLink} target='_blank'> {generatedLink} </a>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CreatePoll;