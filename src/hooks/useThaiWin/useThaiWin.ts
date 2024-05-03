import { useCallback, useEffect, useRef, useState } from "react"
import { enterThaiWin, exitThaiWin } from "../../api/weWinApi"

const useThaiWin = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	let isEnter = useRef<boolean>(false)

	useEffect(() => {
		return () => {
			if (isEnter.current)
				setIsLogin(!exitThaiWin())
			isEnter.current = false
		}
	}, [])
	
	const setEnter = () => {
		if (!isEnter.current)
			setIsLogin(enterThaiWin())
		isEnter.current = true
	}

	const setExit = () => {
		if (isEnter.current)
			setIsLogin(!exitThaiWin())
		isEnter.current = false
	}
	return [isLogin, setEnter, setExit] as const
}

export default useThaiWin