import React from 'react';
import {AppRouter} from '../router';
import styles from './app.module.scss';

const App = () => (
	<div className={styles.app}>
		<AppRouter />
	</div>
);

export {App};
