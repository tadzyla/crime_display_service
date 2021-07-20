import { useState, useEffect } from 'react'


const useFetch = (url) => {
    const [data, setData] = useState();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    

       fetch(url)
        .then(res => {
            if(!res.ok) {
                throw Error('Cannot connect to Mars')
            }
            return res.json();
        })
        .then(data => {
            setData(data)
            setIsPending(false)
            setError(null)
        })
        .catch(err => {
            if(err.name === 'AbortError') {
                console.log('Fetch aborted')
            } else {
                setIsPending(false)
                setError(null)
            }
        });


    }, [url]);

    return { data, isPending, error }
}

export default useFetch;