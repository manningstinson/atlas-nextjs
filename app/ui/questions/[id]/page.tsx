import { fetchQuestion, fetchAnswers } from "@/lib/data";
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

    // Fetch the specific question
    const question = await fetchQuestion(paramId.id);
    console.log("Fetched question:", question);

    // If no question found, return not found
    if (!question) {
      console.log("No question found for ID:", paramId.id);
      return <div>Question not found</div>;
    }

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