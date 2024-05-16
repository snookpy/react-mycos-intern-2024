import { useCallback, useEffect, useRef, useState } from "react"
import { enterThaiWin, exitThaiWin } from "../../api/weWinApi"

const useThaiWin = () => {
	const [checkIsLogin, setCheckIsLogin] = useState(false)
	const isEnteredRef = useRef(false)

	const enter = useCallback(() => {
		if (!isEnteredRef.current) {
			enterThaiWin()
			setCheckIsLogin(true)
			isEnteredRef.current = true
		}
	}, [])

	const exit = useCallback(() => {
		if (isEnteredRef.current) {
			exitThaiWin()
			setCheckIsLogin(false)
			isEnteredRef.current = false
		}
	}, [])

	useEffect(() => {
		return () => {
			if (isEnteredRef.current) {
				exit()
			}
		}
	}, [])

	return [checkIsLogin, enter, exit] as const
}

export default useThaiWin