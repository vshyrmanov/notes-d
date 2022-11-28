import React, { useContext } from 'react';
import {Col, Form, Row, Stack } from 'react-bootstrap';
import NoteContext from '../../../store/note-context';
import { Tag } from '../../../store/NoteProvider';
import MainModal from '../../UI/modal/MainModal';
import NeobrutalButton from '../../UI/neobrutalButton/NeobrutalButton';

type EditTagsModalProps = {
	availableTags: Tag[],
	show: boolean,
	handleClose: () => void,
	onDelete: (id: string) => void,
	onUpdate: (id: string, label: string) => void
}

const EditTags = ({ show, handleClose }: EditTagsModalProps) => {
	// @ts-ignore
	const { tags, updateTag, deleteTag } = useContext(NoteContext);

	return (
			<MainModal
					show={show}
					handleClose={handleClose}
					title="Edit tags"
			>
				<Form>
					<Stack gap={2}>
						{tags.map((tag: Tag) => (
								<Row key={tag.id}>
									<Col >
										<Form.Control type="text" value={tag.label} onChange={(event) => updateTag(tag.id, event.target.value)}/>
									</Col>
									<Col xs="auto">
										<NeobrutalButton variant="outline-danger" onClick={() => deleteTag(tag.id)}>&times;</NeobrutalButton>
									</Col>
								</Row>
						))}
					</Stack>
				</Form>
			</MainModal>
	);
};

export default EditTags;