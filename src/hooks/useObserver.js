import { useEffect, useRef } from "react"

export const useObserver = (childRef, canLoad, parentRef, callback) => {
	const observer = useRef()

	const options = {
		root: parentRef.current,
		rootMargin: '0px',
		threshold: 0
	}

	useEffect(() => {
		if (observer.current) observer.current.disconnect()

		var cb = function (entries, observer) {
			// Content excepted, show below
			if (entries[0].isIntersecting && canLoad) {
				callback();
			}
			console.log('intersected');
		};

		observer.current = new IntersectionObserver(cb, options);
		observer.current.observe(childRef.current)
	}, [callback])
}

// Ref юзаю чтобы от рендера к рендеру сохранялся внутри поля current обсервер)
// Можно и в состояние его положить, но т.к от него не зависит рендер то в реф поправильнее будет

//  Недочет про коллбэк - это то, что его нужно было у родителя завернуть в useCallback?

// в 2022 году у меня не захотел запрос работать с query="".
// Получилось только по title, да и то только если ввести полное название, а не кусок. jsonplaceholder обновился


/*

import { useEffect, useState, useRef } from 'react'

export default function useScroll(parentRef, childRef, callback) {
	const observer = useRef()

	const options = {
		root: parentRef.current,
		rootMargin: '0px',
		threshold: 0
	}

	useEffect(() => {

		observer.current = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				console.log('intersected');
				callback()
			}
		}, options);

		observer.current.observe(childRef.current)

		return () => {
			observer.current.unobserve(childRef.current)
		}

	}, [callback])
}

*/


/*

import { useEffect, useRef } from "react"

export const useObserver = (childRef, canLoad, isLoading, callback) => {
	const observer = useRef()

	useEffect(() => {
		if (isLoading) return
		if (observer.current) observer.current.disconnect()

		var cb = function (entries, observer) {
			// Content excepted, show below
			if (entries[0].isIntersecting && canLoad) {
				callback();
			}
			// console.log(observer);
		};

		observer.current = new IntersectionObserver(cb);
		observer.current.observe(childRef.current)
	}, [isLoading])
}

*/

// =========================================
// =========================================
// =========================================
// =========================================
// =========================================
// =========================================
// =========================================
/* 

// useScroll:

import {useEffect, useRef, useState} from "react";

export default function useScroll(parentRef, lastChildRef, callback) {

	 //слушатель скрола
	 const observer = useRef()
	 const [load, setLoad] = useState(false)
	 useEffect(() => {
		  const options = {
				root: parentRef.current,
				rootMargin: '0px',
				threshold: 1
		  }

		  observer.current = new IntersectionObserver(([target]) => {
				if(load) return;
				if(target.isIntersecting ) {
					 setLoad(true)
					 callback().then(() => {
						  setLoad(false)
					 })
				}
		  }, options)

		  observer.current.observe(lastChildRef.current)

		  return function () {
				observer.current.unobserve(lastChildRef.current)
		  }

	 }, [load])

	 return load
}

// TodoList:

import React, {useEffect, useRef, useState} from 'react';
import userEvent from "@testing-library/user-event/dist";
import useScroll from "../hooks/useScroll";

const TodoList = () => {

	 const [list, setList] = useState([])
	 const [page, setPage] = useState(1)
	 const [limit, setLimit] = useState(10)
	 const lastElement = useRef()
	 const parent = useRef()
	 const load = useScroll(parent, lastElement, () => fetchTodo(page, limit))
	 function fetchTodo(page, limit) {
				const res = fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
					 .then(response => {
						  return response.json()
					 })
					 .then(json => {
						  setList(prev => [...prev, ...json])
						  setPage(prev => prev + 1)
					 })
		  return res
	 }



	 return (
		  <div childRef={parent} style={{height: '190vh', overflow: 'auto'}}>

				{list.map(i => (
					 <p key={i.id}>{i.id}: {i.title}</p>
				))}
				{load ? "load..." : ""}
				<div childRef={lastElement} style={{height: 20, background: "red"}}></div>
		  </div>

	 );
};

export default TodoList;

*/