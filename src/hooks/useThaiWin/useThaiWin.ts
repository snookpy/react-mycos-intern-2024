import { useCallback, useEffect, useRef, useState } from "react"
import { enterThaiWin, exitThaiWin } from "../../api/weWinApi"

const useThaiWin = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const isLoginRef = useRef(false)

	const enter = useCallback(() => {
		if (!isLoginRef.current) {
			enterThaiWin()
			setIsLogin(true)
			isLoginRef.current = true
		}
	}, [])

	const exit = useCallback(() => {
		if (isLoginRef.current) {
			exitThaiWin()
			setIsLogin(false)
			isLoginRef.current = false
		}
	}, [])

	useEffect(() => {
		return () => {
			if (isLoginRef.current) {
				exit()
			}
		}
	}, [])

	return [isLogin, enter, exit] as const
}

export default useThaiWin
