import { useCallback, useRef } from "react";

export default function useDebounce(callback, delay) {
	const timer = useRef()

	const debouncedCallback = useCallback((...args) => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = setTimeout(() => {
			callback(...args)
			console.log('callbacknulo');
		}, delay)

	}, [callback, delay])

	return debouncedCallback
}

// `useCallback(fn, deps)` это просто `useMemo(() => fn, deps)`	