import type {FC, ReactNode} from 'react';
import React from 'react';
import {NavSidebar} from '../components';
import styles from './private.module.scss';

interface IPrivateLayoutProps {
	children: ReactNode;
}

const PrivateLayout: FC<IPrivateLayoutProps> = ({children}) => (
	<>
		<NavSidebar />
		Private Layout
		<div className={styles.content}>{children}</div>
	</>
);

export {PrivateLayout};
