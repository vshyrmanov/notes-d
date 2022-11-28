export type NoteFormProps = {
	onSubmit: (data: NoteData) => void,
} & Partial<NoteData>

export type PreviewImageModalProps = {
	show: boolean,
	handleClose: () => void,
	imageUrl: string,
}

export interface Event<T = EventTarget> {
	target: T
}