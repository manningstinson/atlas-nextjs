"use server";

import { revalidatePath } from "next/cache";
import { incrementVotes, insertAnswer, insertQuestion, insertTopic, markAnswerAsAccepted } from "./data";
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
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
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

export async function addAnswer(formData: FormData) {
  try {
    await insertAnswer({
      text: formData.get("text") as string,
      question_id: formData.get("question_id") as string,
    });
    revalidatePath("/ui/questions/[id]", "page");
  } catch (error) {
    throw new Error("Failed to add answer.");
  }
}

export async function acceptAnswer(formData: FormData) {
  try {
    await markAnswerAsAccepted(formData.get("answer_id") as string);
    revalidatePath("/ui/questions/[id]", "page");
  } catch (error) {
    throw new Error("Failed to accept answer.");
  }
}