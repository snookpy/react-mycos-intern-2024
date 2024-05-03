import { useState } from "react";

const usePrimeNumber = () => {
  const [isPrime, setIsPrime] = useState(true);
  const [latestNum, setLatestNum] = useState(0);

  const calPrime = (number: number): void => {
    setLatestNum(number);
    if (number <= 1) {
      setIsPrime(false);
      return;
    }
    let isPrimeNumber = true;
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        isPrimeNumber = false;
        break;
      }
    }
    setIsPrime(isPrimeNumber);
  };

  return [isPrime, calPrime, latestNum] as const;
};

export default usePrimeNumber;
