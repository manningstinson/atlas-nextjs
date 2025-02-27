import { sql } from "@vercel/postgres";
import { Answer, Question, Topic, User } from "./definitions";

export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchTopics() {
  try {
    const data = await sql<Topic>`SELECT * FROM topics`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string) {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id = ${id}`;
    return data.rows && data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchQuestions(id: string) {
  try {
    const data = 
      await sql<Question>`SELECT * FROM questions WHERE topic_id = ${id} ORDER BY votes DESC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function fetchQuestion(id: string) {
  try {
    const data = 
      await sql<Question>`SELECT * FROM questions WHERE id = ${id}`;
    return data.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch question.");
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id" | "votes">
) {
  try {
    const data = 
      await sql<Question>`INSERT INTO questions (title, topic_id, votes) VALUES (${question.title}, ${question.topic_id}, ${question.votes})`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function insertTopic(topic: Pick<Topic, "title">) {
  try {
    const data = 
      await sql<Topic>`INSERT INTO topics (title) VALUES (${topic.title}) RETURNING id;`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  }
}

export async function incrementVotes(id: string) {
  try {
    const data = 
      await sql<Question>`UPDATE questions SET votes = votes + 1 WHERE id = ${id}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment votes.");
  }
}

export async function fetchAnswers(questionId: string) {
  try {
    const data = await sql<Answer>`
      SELECT * FROM answers
      WHERE question_id = ${questionId}
      ORDER BY is_accepted DESC, created_at DESC
    `;
    return data.rows;
  } catch (error) {
    console.error('Error fetching answers:', error);
    throw new Error(`Failed to fetch answers: ${(error as any).message}`);
  }
}

export async function insertAnswer(answer: Pick<Answer, "answer" | "question_id">) {
  try {
    await sql`
      INSERT INTO answers (answer, question_id)
      VALUES (${answer.answer}, ${answer.question_id})
    `;
  } catch (error) {
    console.error("Error adding answer:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function markAnswerAsAccepted(answerId: string) {
  try {
    await sql`
      UPDATE answers
      SET is_accepted = TRUE
      WHERE id = ${answerId}
    `;
  } catch (error) {
    throw new Error("Failed to mark answer as accepted.");
  }
}