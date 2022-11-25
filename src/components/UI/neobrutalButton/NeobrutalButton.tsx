import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './NeubrutalButton.module.css';

const NeobrutalButton = (props:any) => {
	return (
			<Button {...props} className={classes.neobrutalButton}>
				{props.children}
			</Button>
	);
};

export default NeobrutalButton;