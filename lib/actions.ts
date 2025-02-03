"use server";

import { revalidatePath } from "next/cache";
import { incrementVotes, insertQuestion, insertTopic } from "./data";
import { redirect } from "next/navigation";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
  try {
    const title = question.get("title") as string;
    const topic_id = question.get("topic_id") as string;

    if (!title || !topic_id) {
      throw new Error("Missing title or topic_id");
    }

    await insertQuestion({
      title,
      topic_id,
      votes: 0,
    });

    revalidatePath(`/ui/topics/${topic_id}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}


export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}