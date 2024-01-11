import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { createNoteSchema, CreateNoteSchema } from "@/lib/validation/note";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./ui/loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import { useState } from "react";

interface AddNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
}

const AddNoteDialog = ({ open, setOpen, noteToEdit }: AddNoteDialogProps) => {
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const router = useRouter();

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  const onSubmit = async (input: CreateNoteSchema) => {
    try {
      if (noteToEdit) {
        const hasDataChanged =
          input.title !== noteToEdit.title ||
          input.content !== noteToEdit.content;

        const response = await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...input,
          }),
        });

        if (!response.ok)
          throw new Error(
            "Something wrong with database, Please check your database",
          );
      } else {
        const response = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(input),
        });

        if (!response.ok)
          throw new Error(
            "Something wrong with database, Please check your database",
          );
        form.reset();
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      alert("Something went wrong. Please try again " + error);
    }
  };

  const onDelete = async () => {
    if (!noteToEdit) return;
    setDeleteInProgress(true);
    try {
      const response = await fetch("/api/notes", {
        method: "DELETE",
        body: JSON.stringify({
          id: noteToEdit.id,
        }),
      });

      if (!response.ok)
        throw new Error(
          "Something wrong with database, Please check your database",
        );

      router.refresh();
      setOpen(false);
    } catch (error) {
      alert("Something went wrong. Please try again" + error);
    } finally {
      setDeleteInProgress(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{noteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your note title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note Content</FormLabel>
                    <FormControl>
                      <Textarea
                        className=" h-80"
                        placeholder="Enter your note title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className=" gap-1">
                {noteToEdit && (
                  <LoadingButton
                    type="button"
                    onClick={onDelete}
                    loading={deleteInProgress}
                    variant="destructive"
                    disabled={form.formState.isSubmitting}
                  >
                    Delete Note
                  </LoadingButton>
                )}
                <LoadingButton
                  type="submit"
                  loading={form.formState.isSubmitting}
                >
                  Submit
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNoteDialog;
