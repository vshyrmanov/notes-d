import React from 'react';
import { Stack } from 'react-bootstrap';
import MainModal from '../../UI/modal/MainModal';
import { PreviewImageModalProps } from '../types';

const PreviewImg = ({ show, handleClose, imageUrl }: PreviewImageModalProps) => {
	return (
			<MainModal
					show={show}
					handleClose={handleClose}
					size="lg"
			>
				<Stack gap={2}>
					<img src={imageUrl} alt="image_preview" />
				</Stack>
			</MainModal>
	);
};

export default PreviewImg;