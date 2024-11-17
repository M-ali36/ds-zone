// KeywordSuggestions.js
import React, { useState, useEffect } from 'react';
import { generateKeywordIdeas } from './keyword-planner-service';

const KeywordSuggestions = ({ seedKeywords }) => {
    const [keywordSuggestions, setKeywordSuggestions] = useState([]);

    useEffect(() => {
        const fetchKeywordSuggestions = async () => {
            const suggestions = await generateKeywordIdeas(seedKeywords);
            setKeywordSuggestions(suggestions);
        };

        fetchKeywordSuggestions();
    }, [seedKeywords]);

    return (
        <div>
            <h2>Keyword Suggestions</h2>
            <ul>
                {keywordSuggestions.map((suggestion) => (
                    <li key={suggestion.text}>{suggestion.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default KeywordSuggestions;