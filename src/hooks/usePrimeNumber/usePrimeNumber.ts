import { useState } from "react"

const usePrimeNumber = () => {
    const [isPrime, setIsPrime] = useState(true)
    const [latestNumber, setLatestNumber] = useState(0);

    const calPrime = (num: number): void => {
        setLatestNumber(num);

        if (num <= 3 && num != 0) {
            setIsPrime(true);
        } else if (num % 2 === 0 || num % 3 === 0 || num <= 1) {
            setIsPrime(false);
        } else {
            let i = 5;
            while (i * i <= num) {
                if (num % i === 0 || num % (i + 2) === 0) {
                    setIsPrime(false);
                }
                i += 6;
            }
        }
    };

    return [isPrime, calPrime, latestNumber] as const
}

export default usePrimeNumber


