import {Badge, Stack } from "react-bootstrap";
import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import { Tag } from "../../store/NoteProvider";
import MainCard from "../UI/cards/MainCard";

type SimplifiedNote = {
	tags: Tag[],
	title: string,
	id: string,
}

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
	return (
			<MainCard to={`/${id}`}>
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
			</MainCard>
	)
}

export default NoteCard;