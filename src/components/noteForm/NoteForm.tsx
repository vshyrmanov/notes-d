import React, {FormEvent, useContext, useRef, useState, useEffect} from 'react';
import {Button, Card, Col, Form, Modal, Row, Stack} from "react-bootstrap";
import CreatableReactSelect from 'react-select/creatable';
import {Link, useNavigate} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import NoteContext from "../../store/note-context";
import {NoteData, Tag, Image} from "../../store/NoteProvider";
import classes from './NoteForm.module.css';

type NoteFormProps = {
	onSubmit: (data: NoteData) => void,
} & Partial<NoteData>

type PreviewImageModalProps = {
	show: boolean,
	handleClose: () => void,
	imageUrl: string,
}

interface Event<T = EventTarget> {
	target: T
}

const NoteForm = ({ title = "", markdown = "", tags = [], imgs = [], onSubmit  }: NoteFormProps) => {
	// @ts-ignore
	const { addTag, notesWithTags: availableTags, tags: allTags, addImage, deleteImage  } = useContext(NoteContext);
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();
	const [file, setFile] = useState(null);
	const [showImage, setShowImage] = useState<Image[]>(imgs);
	const [showModal, setShowModal] = useState(false);
	const [previewImage, setPreviewImage] = useState("");

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
			imgs: showImage,
		})
		navigate("..");
	}

const addFile = (file: Blob) => {
	let reader = new FileReader();
	if ( file !== null) {
		reader.readAsDataURL(file && file)
		reader.onloadend = () => {
			const newImage = {id: uuidV4(), imageUrl: reader.result};
			// @ts-ignore
			setShowImage(prev => [...prev, newImage]);
		}
	}
}

const removeImageFromReview = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
			event.stopPropagation();
			setShowImage(prev => prev.filter(prevImage => prevImage.id !== id));
}

const handleOpenModal = (url: string) => {
		return () => {
			setShowModal(true)
			setPreviewImage(url)
		}
	}
const handleCloseModal = () => setShowModal(false);

	return (
			<Form onSubmit={handleSubmit}>
				<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control ref={titleRef} required defaultValue={title} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
									onCreateOption={label => {
										const newTag = { id: uuidV4(), label }
										addTag(newTag)
										setSelectedTags(prev => [...prev, newTag]);
									}}
									options={allTags.map((tag: Tag) => {
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
					<Form.Group controlId="markdown">
						<Form.Label>Body</Form.Label>
						<Form.Control defaultValue={markdown} ref={markdownRef} required as="textarea" rows={15}/>
					</Form.Group>
					{showImage.length > 0 && <Stack direction="horizontal" gap={4} className="justify-content-start flex-wrap ">
						{showImage.map((imageItem: Image) =>
								<Card
										key={imageItem.id}
										className={classes.imageCard}
										onClick={handleOpenModal(imageItem.imageUrl)}>
									<Button
											className={classes.btnAttach}
											variant="danger"
											onClick={(e) => removeImageFromReview(e, imageItem.id)}
									>
										&times;
									</Button>
									<img
											className={classes.editImage}
											src={imageItem.imageUrl}
									/>
								</Card>
						)}
					</Stack>}
					<PreviewImageModal show={showModal} handleClose={handleCloseModal} imageUrl={previewImage} />

					<Stack direction="horizontal" gap={2} className="justify-content-end">
						<Button type="button" as="label" htmlFor="img_file" variant="primary">Add attachment</Button>
						<input
								type="file"
								id="img_file"
								style={{visibility: 'hidden', position: 'absolute'}}
								onChange={(e: Event<HTMLInputElement>) => addFile(e.target.files[0])}
						/>
					</Stack>
					<Stack direction="horizontal" gap={2} className="justify-content-end">

						<Button type="submit" variant="primary">Save</Button>
						<Link to="..">
							<Button type="button" variant="outline-secondary">Cancel</Button>
						</Link>
					</Stack>
				</Stack>
			</Form>
	);
};

export default NoteForm;

function PreviewImageModal ({ show, handleClose, imageUrl }: PreviewImageModalProps) {
	return (
			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Header closeButton />
				<Modal.Body>
						<Stack gap={2}>
							<img src={imageUrl} alt="image_preview" />
						</Stack>
				</Modal.Body>
			</Modal>
	)
}