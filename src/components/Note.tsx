"use client";

import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import AddNoteDialog from "./AddNoteDialog";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const wasUpdated = note.updateAt > note.createAt;

  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updateAt : note.createAt
  ).toDateString();

  return (
    <>
      <Card
        className=" cursor-pointer  transition-all hover:shadow-xl"
        onClick={() => setShowEditDialog(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && "(edited)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className=" whitespace-pre-line   text-gray-900">{note.content}</p>
        </CardContent>
      </Card>

      <AddNoteDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={note}
      />
    </>
  );
};

export default Note;
