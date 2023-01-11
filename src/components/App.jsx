import React from 'react';

import Navbar from './Navbar';
import ItemListContainer from './ItemListContainer';

function App() {
	return (
		<div className="bg-gray-100 w-full min-h-screen">
			<header>
				<Navbar />
			</header>
			<main className="container m-auto pt-[60px] pb-5">
				<ItemListContainer/>
			</main>
		</div>
	);
}

export default App;
