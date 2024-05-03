import { useCallback, useEffect, useRef, useState } from "react"
import { enterThaiWin, exitThaiWin } from "../../api/weWinApi"

const useThaiWin = () => {
	const isLoginRef = useRef(false)

	const enter = useCallback(() => {
		if (!isLoginRef.current) {
			enterThaiWin()
			isLoginRef.current = true
		}
	}, [])

	const exit = useCallback(() => {
		if (isLoginRef.current) {
			exitThaiWin()
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

	return [isLoginRef.current, enter, exit] as const
}

export default useThaiWin
