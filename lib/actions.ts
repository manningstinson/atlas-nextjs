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
    const text = formData.get("text") as string;
    const questionId = formData.get("question_id") as string;

    if (!text || !questionId) {
      throw new Error("Missing required fields");
    }

    await insertAnswer({ 
      text, 
      question_id: questionId 
    });

    revalidatePath(`/ui/questions/${questionId}`);
  } catch (error) {
    console.error("Error adding answer:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function acceptAnswer(formData: FormData) {
  try {
    const answerId = formData.get("answer_id") as string;
    const questionId = formData.get("question_id") as string;

    if (!answerId || !questionId) {
      throw new Error("Missing required fields");
    }

    await markAnswerAsAccepted(answerId);

    revalidatePath(`/ui/questions/${questionId}`);
  } catch (error) {
    console.error("Error accepting answer:", error);
    throw new Error("Failed to mark answer as accepted.");
  }
}