import React, {useContext} from 'react';
import NoteForm from "../noteForm/NoteForm";
import {useNote} from "../layout/NoteLayout";
import NoteContext from "../../store/note-context";

const EditNote = () => {
	// @ts-ignore
	const { onUpdateNote } = useContext(NoteContext);
	const note = useNote();
	return (
			<>
				<h1 className="mb-4">Edit note</h1>
				<NoteForm
						title={note.title}
						markdown={note.markdown}
						tags={note.tags}
						imgs={note.imgs}
						onSubmit={(data: any) => onUpdateNote(note.id, data)}
				/>
			</>
	);
};

export default EditNote;