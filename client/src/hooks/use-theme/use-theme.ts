import {useLayoutEffect, useState} from 'react';

const useTheme = () => {
	const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').media;
	const defaultTheme = isDarkTheme ? 'dark' : 'light';

	const [theme, setTheme] = useState<string>(
		localStorage.getItem('app-theme') || defaultTheme
	);

	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('app-theme', theme);
	}, [theme]);

	return [theme, setTheme] as const;
};

export {useTheme};
