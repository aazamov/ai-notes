import Note from "@/components/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

const NotesPage = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("userId undefined");

  const allNotes = await prisma.note.findMany({ where: { userId } });

  return (
    <div className="grid  gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      {allNotes.length === 0 && (
        <div className=" col-span-full text-center">You has no any notes</div>
      )}
    </div>
  );
};

export default NotesPage;
