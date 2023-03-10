import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';
import CustomProvider from './CustomProvider';
import ItemCartContainer from './ItemCartContainer';
import Checkout from './Checkout';

function App() {
	return (
		<CustomProvider>
			<BrowserRouter className="bg-gray-100 w-screen min-h-screen">
				<header>
					<Navbar />
				</header>
				<main className="container m-auto pt-[60px] pb-5">
					<Routes>
						<Route path="/" element={<ItemListContainer />} />
						<Route path="/productos/:categoria" element={<ItemListContainer />} />
						<Route path="/producto/:id" element={<ItemDetailContainer />} />
						<Route path="/carrito" element={<ItemCartContainer/>} />
						<Route path="/checkout" element={<Checkout/>} />
						
						<Route path="*" element={
							<div className="flex flex-col justify-center items-center w-full h-[80vh]">
								<h1 className="text-2xl font-bold text-center">Página no encontrada</h1>
								<p className="text-lg text-center">Error 404</p>
							</div>
						} />
					</Routes>
				</main>
			</BrowserRouter>
		</CustomProvider>
	);
}

export default App;
