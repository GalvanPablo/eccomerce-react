import React from 'react';

import Navbar from './Navbar';
import ItemListContainer from './ItemListContainer';

function App() {
	return (
		<div className="bg-gray-100 w-full h-screen">
			<Navbar />
			<div className="container m-auto pt-[60px]">
				<ItemListContainer greeting="Productos"/>
			</div>
		</div>
	);
}

export default App;
