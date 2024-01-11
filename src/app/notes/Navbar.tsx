"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddNoteDialog from "@/components/AddNoteDialog";
import AIChatButton from "@/components/AIChatButton";

const Navbar = () => {
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between">
          <Link href="/notes" className=" flex items-center gap-1">
            <Image src={logo} alt="AI-chatbot" width={40} height={40} />
            <span className=" font-bold"> AIBrain </span>
          </Link>

          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
            <Button onClick={() => setShowAddNoteDialog(true)}>
              <Plus size={20} className="mr-2" />
              Add Notes
            </Button>
            <AIChatButton />
          </div>
        </div>
      </div>

      <AddNoteDialog open={showAddNoteDialog} setOpen={setShowAddNoteDialog} />
    </>
  );
};

export default Navbar;
