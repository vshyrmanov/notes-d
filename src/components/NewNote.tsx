import React, {useContext} from 'react';
import NoteForm from "./NoteForm";
import NoteContext from "../store/note-context";

const NewNote = () => {
	// @ts-ignore
	const { onCreateNote } = useContext(NoteContext);

	return (
			<>
				<h1 className="mb-4">New note</h1>
					<NoteForm onSubmit={onCreateNote} />
			</>
	);
};

export default NewNote;