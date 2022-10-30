import { FC, useRef } from "react"
import useHover from "../hooks/useHover";

const RedBlock: FC = () => {
	const ref = useRef<HTMLDivElement>(null)
	const isHovering = useHover(ref)

	return (
		<div ref={ref} style={{ width: 200, height: 200, background: isHovering ? 'green' : 'red' }}>
			{/* <button onClick={() => console.log(ref.current)}>click me</button> */}
		</div>
	)
}

export default RedBlock