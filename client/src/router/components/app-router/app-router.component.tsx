import type {FC} from 'react';
import React, {Suspense} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {
	CategoryPage,
	LoginPage,
	MainPage,
	RegistrationPage,
} from '../../../pages';
import {privateRoutes, publicRoutes} from '../../routes';

const AppRouter: FC = () => {
	const isLoggedIn = true;

	return (
		<Suspense fallback={<></>}>
			<BrowserRouter>
				<Routes>
					{isLoggedIn && (
						<>
							<Route path={privateRoutes.main} element={<MainPage />} />
							<Route path={privateRoutes.category} element={<CategoryPage />} />
						</>
					)}
					<Route path={publicRoutes.login} element={<LoginPage />} />
					<Route
						path={publicRoutes.registration}
						element={<RegistrationPage />}
					/>
					<Route
						path="*"
						element={
							<Navigate
								to={isLoggedIn ? privateRoutes.main : publicRoutes.login}
								replace
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
};

export {AppRouter};
