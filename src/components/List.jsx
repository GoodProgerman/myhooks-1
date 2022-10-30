import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useObserver } from '../hooks/useObserver'
// import useScroll from '../hooks/useScroll'


const List = () => {
	const [todos, setTodos] = useState([])
	const [page, setPages] = useState(1)
	const limit = 20;
	const parentRef = useRef()
	const childRef = useRef()
	const intersected = useObserver(childRef, page < 6, parentRef, () => fetchTodos(page, limit))
	// const intersected = useScroll(parentRef, childRef, () => fetchTodos(page, limit))


	async function fetchTodos(page, limit) {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
			params: {
				_page: page,
				_limit: limit
			}
		})
		// return response.data
		setTodos([...todos, ...response.data])
		setPages(page + 1)
	}


	return (
		<div ref={parentRef} style={{ overflow: 'auto', height: '80vh' }}>
			{todos.map(todo =>
				<div key={todo.id} style={{ padding: 30, border: '2px solid teal' }}>{todo.id}. {todo.title}</div>
			)}
			<div ref={childRef} style={{ background: 'green', height: 20 }}></div>
		</div>
	)
}

export default List