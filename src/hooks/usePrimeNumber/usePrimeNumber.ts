import { useState } from 'react';

const usePrimeNumber = () => {
    const [checkPrime, setCheckPrime] = useState(true);
    const [latestNumber, setLatestNumber] = useState(0);

    const calculatePrime = (num: number) => {
        setLatestNumber(num)
        if (num === 0 || num === 1) {
            setCheckPrime(false)
            return false;
        }
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                setCheckPrime(false);
                return false;
            }
        }
        setCheckPrime(true)
        return true;
    };
    
    return [checkPrime, calculatePrime, latestNumber] as const
}

export default usePrimeNumber;
