import React, {useContext, useMemo, useState} from 'react';
import {Badge, Button, Card, Col, Form, Modal, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactSelect from "react-select";
import {Note, Tag} from "../../store/NoteProvider";
import styles from './NoteList.module.css';
import NoteContext from "../../store/note-context";
import NeobrutalButton from '../UI/neobrutalButton/NeobrutalButton';
import NoteCard from '../noteCard/NoteCard';
import MainModal from '../UI/modal/MainModal';
import EditTags from '../modals/editTags/EditTags';

const NoteList = () => {
	// @ts-ignore
	const { tags: availableTags, notesWithTags: notes, updateTag, deleteTag } = useContext(NoteContext);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState<string>("");
	const [editTagsModalOpen, setEditTagsModalOpen] = useState(false);

	const handleCloseTagsModal = () => {
		setEditTagsModalOpen(false)
	}

	const handleOpenTagsModal = () => {
		setEditTagsModalOpen(true)
	}

	const filteredNotes = useMemo(() => {
		return notes.filter((note: Note) => {
			return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
					&& (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
		})
	}, [title, selectedTags, notes])

	return (
			<>
				<Row className="align-items-center mb-4">
					<Col><h1>Notes</h1></Col>
					<Col xs="auto">
						<Stack direction="horizontal" gap={2}>
							<Link to="/new">
								<NeobrutalButton>Create</NeobrutalButton>
							</Link>
							{availableTags.length > 0 &&
							<NeobrutalButton
									variant="outline-secondary"
									onClick={handleOpenTagsModal}
							>
									Edit tags
							</NeobrutalButton>}
						</Stack>
					</Col>
				</Row>
				<Form>
					<Row className="mb-4">
						<Col>
							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="tags">
								<Form.Label>Tags</Form.Label>
								<ReactSelect
										options={availableTags.map((tag: Tag) => {
											return { label: tag.label, value: tag.id }
										})}
										value={selectedTags.map(tag => {
											return { label: tag.label, value: tag.id }
										})}
										isMulti
										onChange={tags => {
											setSelectedTags(tags.map(tag => {
												return { label: tag.label, id: tag.value }
											}))
										}}
								/>
							</Form.Group>
						</Col>
					</Row>
				</Form>
				<Row sx={1} sm={2} lg={3} xl={4} className="g-3">
					{filteredNotes.map((note: Note) => (
							<Col key={note.id}>
								<NoteCard id={note.id} title={note.title} tags={note.tags} />
							</Col>
					))}
				</Row>
				<EditTags
						show={editTagsModalOpen}
						handleClose={handleCloseTagsModal}
						availableTags={availableTags}
						onDelete={deleteTag}
						onUpdate={updateTag}
				/>
			</>
	);
};

export default NoteList;