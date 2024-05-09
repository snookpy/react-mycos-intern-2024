import { useCallback, useEffect, useMemo, useRef } from "react"
import useWindowSize from "../hooks/useWindowSize"

const EXHook = (props: { count: number, isShow: boolean }) => {
    const {
        width,
        height
    } = useWindowSize()

	const divRef = useRef<HTMLDivElement>(null)

	const onClickChangeBG = () => {
		if (divRef.current) {
			divRef.current.style.backgroundColor = "red"
		}
	}

	return (
		<div
			ref={divRef}
			style={{
				width: 250,
				height: 250,
				border: "1px solid black",
			}}
		>
			Example Render
            <p> Width: {width}</p>
            <p> Height: {height}</p>
            
			<button onClick={onClickChangeBG}>change bg</button>
		</div>
	)
}

export default EXHook
