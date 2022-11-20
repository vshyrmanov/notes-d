import React, {FormEvent, useContext, useRef, useState} from 'react';
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import CreatableReactSelect from 'react-select/creatable';
import {Link, useNavigate} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import NoteContext from "../store/note-context";
import {NoteData, Tag} from "../store/NoteProvider";

type NoteFormProps = {
	onSubmit: (data: NoteData) => void,
// 	onAddTag: (tag: Tag) => void,
// 	availableTags: Tag[],
} & Partial<NoteData>

const NoteForm = ({ title = "", markdown = "", tags = [], onSubmit  }: NoteFormProps) => {
	// @ts-ignore
	const { addTag, notesWithTags: availableTags } = useContext(NoteContext);
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		})
		navigate("..");
	}

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
					<Form.Group controlId="markdown">
						<Form.Label>Body</Form.Label>
						<Form.Control defaultValue={markdown} ref={markdownRef} required as="textarea" rows={15}/>
					</Form.Group>
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