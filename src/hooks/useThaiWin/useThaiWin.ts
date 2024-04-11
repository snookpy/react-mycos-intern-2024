import { useCallback, useEffect, useRef, useState } from "react"
import { enterThaiWin, exitThaiWin } from "../../api/weWinApi"

const useThaiWin = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)

	return [isLogin, () => {}, () => {}] as const
}

export default useThaiWin
