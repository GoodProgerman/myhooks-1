import axios from "axios";
import { useState } from "react";
import List from "./components/List";
import RedBlock from "./components/RedBlock";
import useDebounce from "./hooks/useDebounce";
import { useFetching } from "./hooks/useFetching";



function App() {
	const [value, setValue] = useState('')

	const [todosFetching, isFetchingLoading, errorFetching] = useFetching(async (query) => {
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos?query=' + query)
		return response.data
	})
	const debouncedCallback = useDebounce(todosFetching, 500)

	const onChange = (e) => {
		setValue(e.target.value)
		debouncedCallback(e.target.value)
	}

	return (
		<div className="App">
			<input type="text" value={value} onChange={onChange} />
			<RedBlock />
			<List />
		</div>
	);
}

export default App;



/* 

function App() {
	const username = useInput('')
	const password = useInput('')

	return (
		<div className="App">
			<input {...username} type="text" />
			<input {...password} type="password" />
			<button onClick={() => console.log(username.value, password.value)}>Click</button>
		</div>
	);
}

*/

/* 

	async function search(query) {
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos?query=' + query)
		// return response.data
		console.log(response.data);
	}
	const onChange = (e) => {
		setValue(e.target.value)
		debouncedCallback(e.target.value)
	}

*/