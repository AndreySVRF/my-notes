import type {FC, ReactNode} from 'react';
import React from 'react';

interface IPublicLayoutProps {
	children: ReactNode;
}

const PublicLayout: FC<IPublicLayoutProps> = ({children}) => (
	<div>
		Public Layout
		<>{children}</>
	</div>
);

export {PublicLayout};
