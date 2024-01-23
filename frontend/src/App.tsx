import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './containers/IndexPage.tsx';
import { Header } from './containers/layout/Header.tsx';
import { Footer } from './containers/layout/Footer.tsx';
import { LoginPage } from './containers/user/LoginPage.tsx';

export default function App() {
	return (
		<>
			<Header />
			<div className="w-full max-w-[1400px] mx-auto my-8">
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<IndexPage />} />
						<Route path='/login' element={<LoginPage />} />
					</Routes>
				</BrowserRouter>
			</div>
			<Footer />
		</>
	);
}
