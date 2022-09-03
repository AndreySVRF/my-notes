import type {FC, ReactNode} from 'react';
import React from 'react';

interface IPrivateLayoutProps {
	children: ReactNode;
}

const PrivateLayout: FC<IPrivateLayoutProps> = ({children}) => (
	<div>
		Private Layout
		<>{children}</>
	</div>
);

export {PrivateLayout};
