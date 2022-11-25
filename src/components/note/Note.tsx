import React, {useContext, useState} from 'react';
import {useNote} from "../NoteLayout";
import {Badge, Button, Card, Col, Row, Stack} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import NoteContext from "../../store/note-context";
import {Tag} from "../../store/NoteProvider";
import classes from './Note.module.css';
import { PreviewImageModal } from '../noteForm/NoteForm';
import NeobrutalButton from '../UI/neobrutalButton/NeobrutalButton';

const Note = () => {
	const [showModal, setShowModal] = useState(false);
	const [previewImage, setPreviewImage] = useState("");

	const handleOpenModal = (imageUrl: string) => {
		return () => {
			setShowModal(true);
			setPreviewImage(imageUrl)
		}

	}
	const handleCloseModal = () => {
		setShowModal(false);
	}
	// @ts-ignore
	const { onDeleteNote } = useContext(NoteContext);
	const note = useNote();
	const navigate = useNavigate();
	
	return (
			<>
				<Row className="align-items-center mb-4">
					<Col>
						<h1>{note.title}</h1>
						{note.tags.length > 0 && (
								<Stack gap={2} direction="horizontal" className="flex-wrap ">
									{note.tags.map((tag: Tag) => (
											<Badge className="text-truncate" key={tag.id}>
												{tag.label}
											</Badge>
									))}
								</Stack>
						)}
					</Col>
					<Col xs="auto">
						<Stack direction="horizontal" gap={2}>
							<Link to={`/${note.id}/edit`}>
								<NeobrutalButton variant="primary">Edit</NeobrutalButton>
							</Link>
							<NeobrutalButton variant="outline-danger" onClick={() => {
								onDeleteNote(note.id)
								navigate('/')
							}}>Delete</NeobrutalButton>
							<Link to="/">
							<NeobrutalButton variant="outline-secondary">Back</NeobrutalButton>
							</Link>
						</Stack>
					</Col>
				</Row>
				<ReactMarkdown>
					{note.markdown}
				</ReactMarkdown>
				<Row className="align-items-center mb-4">
					<Stack direction="horizontal" gap={4} className="justify-content-start flex-wrap ">
						{note?.imgs?.map(img =>
								<Card
										key={img.id}
										className={classes.imageCard}
										border="primary"
										onClick={handleOpenModal(img.imageUrl)}
								>
									<img
											className={classes.imageItem}
											src={img.imageUrl}
									/>
								</Card>
						)}
					</Stack>
					<PreviewImageModal show={showModal} handleClose={handleCloseModal} imageUrl={previewImage} />
				</Row>
			</>
	);
};

export default Note;