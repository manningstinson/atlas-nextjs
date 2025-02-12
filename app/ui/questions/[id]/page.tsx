import { fetchAnswers, fetchQuestions } from "@/lib/data";
import { QuestionHeader } from "@/components/QuestionHeader";
import { AnswerForm } from "@/components/AnswerForm";
import { AnswersList } from "@/components/AnswersList";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const paramId = await params;
    console.log("Received parameter ID:", paramId.id);

    // Fetch questions using the topic_id
    const questions = await fetchQuestions(paramId.id);
    console.log("Fetched questions:", questions);
    console.log("Number of questions:", questions.length);

    // If no questions found, return not found
    if (questions.length === 0) {
      console.log("No questions found for topic ID:", paramId.id);
      return <div>Question not found</div>;
    }

    // Select the first question (assuming you want the first question for this topic)
    const question = questions[0];
    console.log("Selected question:", question);

    // Fetch answers for this specific question
    const answers = await fetchAnswers(question.id);
    console.log("Fetched answers:", answers);
    console.log("Number of answers:", answers.length);

    return (
      <div className="space-y-6">
        <QuestionHeader title={question.title} />
        <AnswerForm questionId={question.id} />
        <AnswersList answers={answers} />
      </div>
    );
  } catch (error) {
    console.error("Error in QuestionPage:", error);
    return <div>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }
}