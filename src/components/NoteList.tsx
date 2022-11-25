import React, {useContext, useMemo, useState} from 'react';
import {Badge, Button, Card, Col, Form, Modal, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactSelect from "react-select";
import {Note, Tag} from "../store/NoteProvider";
import styles from './NoteList.module.css';
import NoteContext from "../store/note-context";

type SimplifiedNote = {
	tags: Tag[],
	title: string,
	id: string,
}

type NoteListProps = {
	availableTags: Tag[],
	notes: SimplifiedNote[],
	updateTag: (id: string, label: string) => void,
	deleteTag: (id: string) => void,
}

type EditTagsModalProps = {
	availableTags: Tag[],
	show: boolean,
	handleClose: () => void,
	onDelete: (id: string) => void,
	onUpdate: (id: string, label: string) => void
}

const NoteList = () => {
	// @ts-ignore
	const { tags: availableTags, notesWithTags: notes, updateTag, deleteTag } = useContext<NoteListProps>(NoteContext);
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
								<Button variant="primary">Create</Button>
							</Link>
								<Button variant="outline-secondary" onClick={handleOpenTagsModal}>Edit tags</Button>
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
				<EditTagsModal
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



function NoteCard ({ id, title, tags }: SimplifiedNote) {
	return (
		<Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
			<Card.Body>
				<Stack gap={2} className="align-items-center justify-content-center h-100">
					<span className="fs-5">{title}</span>
					{tags.length > 0 && (
							<Stack gap={2} direction="horizontal" className="justify-content-center flex-wrap ">
								{tags.map(tag => (
										<Badge className="text-truncate" key={tag.id}>
											{tag.label}
										</Badge>
								))}
							</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	)
}

function EditTagsModal ({ availableTags, show, handleClose, onDelete, onUpdate } : EditTagsModalProps) {
	return (
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit tags</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Stack gap={2}>
							{availableTags.map(tag => (
									<Row key={tag.id}>
										<Col >
											<Form.Control type="text" value={tag.label} onChange={(event) => onUpdate(tag.id, event.target.value)}/>

										</Col>
										<Col xs="auto">
											<Button variant="outline-danger" onClick={() => onDelete(tag.id)}>&times;</Button>
										</Col>
									</Row>
							))}
						</Stack>
					</Form>
				</Modal.Body>
			</Modal>
			)
}