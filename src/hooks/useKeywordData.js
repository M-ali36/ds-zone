import { useEffect, useState } from 'react';
import axios from 'axios';

const fetchKeywordData = async () => {
    try {
        const response = await axios.get('/api/keywordData');
        return response.data;
    } catch (error) {
        console.error('Error fetching keyword data:', error);
        return null;
    }
};

export const useKeywordData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchKeywordData().then(setData);
    }, []);

    return data;
};
