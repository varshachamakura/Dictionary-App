import React, { useState } from 'react';

function Dictionary() {
    const [word, setWord] = useState('');
    const [error, setError] = useState(''); 
    const [definitions, setDefinitions] = useState([]); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const url = `https://urban-dictionary7.p.rapidapi.com/v0/define?term=${word}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '81dfe9d5d2mshe0b3bddc040ee26p1dab41jsnb6631f9ea900',
                'x-rapidapi-host': 'urban-dictionary7.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const result = await response.json();
                if (result.list && result.list.length > 0) {
                    setDefinitions(result.list);
                    setError('');
                } else {
                    setError('No definitions found.');
                    setDefinitions([]);
                }
            } else {
                setError('Failed to fetch data.');
                setDefinitions([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error fetching data.');
            setDefinitions([]);
        }
    };

    return (
        <section className='container my-5 p-4 bg-light rounded shadow-sm'>
            <h1 className='text-center mb-4 text-primary'>Dictionary App</h1>
            <form onSubmit={handleSubmit} className='mb-4'>
                <div className='mb-3'>
                    <label htmlFor='wordInput' className='form-label fw-bold'>Enter Word</label>
                    <input
                        type='text'
                        id='wordInput'
                        className='form-control'
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder='Type a word...'
                        required
                    />
                </div>
                <button type='submit' className='btn btn-primary w-100'>Search</button>
            </form>

            {/* Display error message if present */}
            {error && <div className='alert alert-danger'>{error}</div>}

            {/* Display definitions if available */}
            {definitions.length > 0 && (
                <div>
                    <h3 className='mb-3 text-info'>Definitions:</h3>
                    <div className='row'>
                        {definitions.map((definition, index) => (
                            <div key={index} className='col-md-6 col-lg-4 mb-4'>
                                <div className='p-3 border rounded bg-white shadow-sm'>
                                    <p><strong>Definition:</strong> {definition.definition}</p>
                                    {definition.example && (
                                        <p><strong>Example:</strong> {definition.example}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default Dictionary;
