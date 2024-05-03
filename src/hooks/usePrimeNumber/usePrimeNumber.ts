import { useEffect, useState } from "react"

const usePrimeNumber = () => {
    const [isPrime, setIsPrime] = useState<boolean>(false)
    const [number, setNumber] = useState<number>(0)
    useEffect(() => {
        if (number < 2) {
            setIsPrime(false)
            return
        }
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                setIsPrime(false)
                return
            }
        }
        setIsPrime(true)
    }, [number])
    return [isPrime, setNumber, number] as const
}

export default usePrimeNumber
