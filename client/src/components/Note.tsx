import { Note as noteModel } from "../model/note";
import { formateDate } from "../utils/formatDate";

interface NoteProps {
  note: noteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, detail, createdAt, updatedAt } = note;

  let createdOrUpdated: string;

  if (updatedAt > createdAt) {
    createdOrUpdated = "Updated: " + formateDate(updatedAt);
  } else {
    createdOrUpdated = "Created: " + formateDate(createdAt);
  }

  console.log(detail);

  return (
    <div>
      <h1>{title}</h1>
      <h1>{detail}</h1>

      {createdOrUpdated}
    </div>
  );
};

export default Note;
