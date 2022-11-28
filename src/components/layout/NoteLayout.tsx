import React, {useContext} from 'react';
import {Navigate, Outlet, useOutletContext, useParams} from "react-router-dom";
import NoteContext from "../../store/note-context";
import { Note } from '../../store/NoteProvider';

const NoteLayout = () => {
	// @ts-ignore
	const { notesWithTags } = useContext(NoteContext);
	const { id } = useParams();
	const note = notesWithTags.find((note: Note) => note.id === id);
	if (note == null) return <Navigate to="/" replace />
	return <Outlet context={note} />
};

export default NoteLayout;

export function useNote() {
	return useOutletContext<Note>();
}