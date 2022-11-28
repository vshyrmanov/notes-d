import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './Card.module.css';

const MainCard = ({ children, ...props }: any) => {
	return (
			<Card as={Link} {...props} className={`h-100 text-reset text-decoration-none ${classes.card}`}>
				<Card.Body>
					{children}
				</Card.Body>
			</Card>
	);
};

export default MainCard;