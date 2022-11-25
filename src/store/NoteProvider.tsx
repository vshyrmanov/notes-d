import React, {useMemo} from 'react';
import NoteContext from './note-context';
import {useLocalStorage} from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

export type Note = {
	id: string,
} & NoteData

type RawNote = {
	id: string,
} & RawNoteData

export type RawNoteData = {
	title: string,
	markdown: string,
	tagIds: string[],
}

export type NoteData = {
	title: string,
	markdown: string,
	tags: Tag[],
	imgs: Image[],
}

export type Tag = {
	id: string,
	label: string,
}

export type Image = {
	id: string,
	imageUrl: string,
}

// @ts-ignore
const NoteProvider = ({ children }) => {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
	const [imgs, setImgs] = useLocalStorage<Image[]>("IMGS", []);

	const notesWithTags = useMemo(() => {
		return notes.map((note: RawNoteData) => {
			return { ...note, tags: tags.filter((tag: Tag) => note.tagIds.includes(tag.id))}
		})
	}, [notes, tags])

	const onCreateNote = ({tags, ...data}: NoteData) => {
	  setNotes(prevNotes => {
	    return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
	  })
	}
	const onUpdateNote = (id: string, { tags, ...data} : NoteData) => {
	  setNotes(prevNotes => {
	    return prevNotes.map(note => {
	      if (note.id === id) {
	        return {...note, ...data, tags: tags.map(tag => tag.id)}
	      } else {
	        return note
	      }
	    })
	  })
	}

	const onDeleteNote = (id: string) => {
	  setNotes(prevNotes => {
	    return prevNotes.filter(note => note.id !== id)
	  })
	}

	const addTag = (tag: Tag) => {
	  setTags(prev => [...prev, tag]);
	}

	const addImage = (image: Image) => {
		setImgs(prev => [...prev, image]);
	}

	const updateTag = (id: string, label: string) => {
	  setTags(prevTags => {
	    return prevTags.map(tag => {
	      if (tag.id === id) {
	        return {...tag, label}
	      } else {
	        return tag
	      }
	    })
	  })
	}

	const deleteTag = (id: string) => {
	  setTags(prevTags => {
	    return prevTags.filter(tag => tag.id !== id)
	  })
	}

	const deleteImage = (id: string) => {
		setImgs(prevImages => {
			return prevImages.filter(image => image.id !== id)
		})
	}

	const contextData = {
		notes,
		setNotes,
		tags,
		notesWithTags,
		onCreateNote,
		onUpdateNote,
		onDeleteNote,
		addTag,
		updateTag,
		deleteTag,
		addImage,
		deleteImage,
		imgs,
	}

	return (
			<NoteContext.Provider value={contextData}>
				{children}
			</NoteContext.Provider>
	);
};

export default NoteProvider;