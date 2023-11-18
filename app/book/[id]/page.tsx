"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Loader, ArrowLeft } from "react-feather";
import Image from "next/image";
import Link from "next/link";

type Book = {
  title: string;
  pages: {
    illustration: string;
    text: string;
  }[];
};

export default function Page({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState(""); // ["RUNNING", "SUCCEEDED", "FAILED"]
  const [book, setBook] = useState<Book>();

  const checkStatus = () => {
    fetch("/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: "cloh97ecd0001l408hf6i0yqp",
        inputs: {
          execution_id: params.id,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        console.log(data.data.status);
        setStatus(data.data.status);
        if (data.data.status === "SUCCEEDED") {
          setBook(data.data.appOutputs.childrens_book);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkStatus();
      if (status === "SUCCEEDED" || status === "FAILED") {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <main className="flex min-h-screen container mx-auto flex-col items-center justify-start gap-8 p-4 md:p-24">
      <Link href="/">
        <Button className="bg-gray-200 hover:bg-gray-300 rounded-full text-black flex gap-2">
          <ArrowLeft size={16} /> <p>Back</p>
        </Button>
      </Link>
      <h1 className="scroll-m-20 text-4xl font-medium tracking-tighter lg:text-5xl">
        {book?.title || (
          <div className="flex gap-2 items-center">
            <Loader className="animate-spin" />
            <span>Writing your book</span>
          </div>
        )}
      </h1>
      {/* <Button onClick={checkStatus}>Check Status</Button> */}
      {/* {status === "RUNNING" && <div>Running</div>} */}
      <div className="flex flex-col gap-16 items-center mt-16">
        {book?.pages?.map((page: { illustration: string; text: string }, i) => {
          return (
            <div className="flex flex-col md:flex-row gap-8" key={i}>
              <div className="md:w-1/2 w-full max-w-80 relative aspect-square">
                <Image
                  src={page.illustration}
                  className="rounded-md"
                  alt="illustration"
                  fill={true}
                />
              </div>
              <div className="flex-1 text-xl md:text-2xl">{page.text}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
