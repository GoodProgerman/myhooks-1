import React, { FC } from 'react'
import cl from './Loader.module.css'


const Loader: FC = () => {
	return (
		<div>
			<div className={cl.loader}>
			</div>
		</div>
	)
}

export default Loader