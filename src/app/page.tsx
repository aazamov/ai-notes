import Image from "next/image";
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import apiKey from "../lib/db/pinecone";
const Page = () => {
  const { userId } = auth();

  console.log(apiKey);

  if (userId) redirect("/notes");
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} width={100} height={100} alt="AIChats" />
        <div className="text-4xl font-extrabold tracking-tighter lg:text-5xl">
          Ai BRain
        </div>
      </div>
      <p className="max-w-prose text-center ">
        The layout key can be used to change the layout of the and components,
        as well as important links to your support, terms, and privacy pages.
      </p>
      <Button size="lg" asChild>
        <Link href="/notes">Open</Link>
      </Button>
    </main>
  );
};

export default Page;
