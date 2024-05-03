import { useCallback, useEffect, useRef, useState } from "react"
import { enterThaiWin, exitThaiWin } from "../../api/weWinApi"

const useThaiWin = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const enterCalled = useRef<boolean>(false)

	const handleLogin = useCallback(() => {
		if (!enterCalled.current) {
			enterThaiWin()
			setIsLogin(true)
			enterCalled.current = true
		}
	}, [])

	const handleLogout = useCallback(() => {
		if (enterCalled.current) {
			exitThaiWin()
			setIsLogin(false)
		}
	}, [])

	useEffect(() => {
		const checkUnload = () => {
			if (enterCalled.current) {
				exitThaiWin()
			}
		}
		window.addEventListener("checkunload", checkUnload)
		return () => {
			window.removeEventListener("checkunload", checkUnload)
			checkUnload()
		}
	}, [])

	return [isLogin, handleLogin, handleLogout] as const;

}

export default useThaiWin
