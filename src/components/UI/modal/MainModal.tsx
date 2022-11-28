import React from 'react';
import { Modal } from 'react-bootstrap';

const MainModal = ({show, handleClose, title = "", children, ...props}: any) => {
	return (
			<Modal show={show} onHide={handleClose} {...props}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{children}
				</Modal.Body>
			</Modal>
	);
};

export default MainModal;