import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';

function App() {
	return (
		<BrowserRouter className="bg-gray-100 w-screen min-h-screen">
			<header>
				<Navbar />
			</header>
			<main className="container m-auto pt-[60px] pb-5">
				<Routes>
					<Route path="/" element={<ItemListContainer />} />
					<Route path="/productos/:categoria" element={<ItemListContainer />} />
					<Route path="/producto/:id" element={<ItemDetailContainer />} />
					<Route path="/carrito" element={<h1 className="text-2xl font-bold text-center">Carrito</h1>} />
					
					
					<Route path="*" element={<h1 className="text-2xl font-bold text-center">404</h1>} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
