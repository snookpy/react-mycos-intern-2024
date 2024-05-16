import { useState } from "react"

const usePrimeNumber = () => {
    const [inputNumber, setInputNumber] = useState<number>(0)
    if (inputNumber === 0 || inputNumber === 1)
        return [false, setInputNumber, inputNumber] as const
    if (inputNumber === 2)
        return [true, setInputNumber, inputNumber] as const
    for (let i = 2; i < Math.round(Math.sqrt(inputNumber)) ; i++){
        if (inputNumber % i === 0)
            return [false, setInputNumber, inputNumber] as const
    }
    return [true, setInputNumber, inputNumber] as const
}

export default usePrimeNumber