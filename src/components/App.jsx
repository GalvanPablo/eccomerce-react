import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import ItemListContainer from './ItemListContainer';

function App() {
	return (
		<BrowserRouter className="bg-gray-100 w-full min-h-screen">
			<header>
				<Navbar />
			</header>
			<main className="container m-auto pt-[60px] pb-5">
				<Routes>
					<Route path="/" element={<ItemListContainer />} />
					<Route path="/productos/:categoria" element={<ItemListContainer />} />
					<Route path="/producto/:id" element={<p>Detalle producto</p>} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
