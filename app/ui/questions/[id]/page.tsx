import { fetchAnswers, fetchQuestions } from "@/lib/data";
import { QuestionHeader } from "@/components/QuestionHeader";
import { AnswerForm } from "@/components/AnswerForm";
import { AnswersList } from "@/components/AnswersList";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramId = await params;
  
  // Fetch questions using the topic_id
  const questions = await fetchQuestions(paramId.id);
  
  // If no questions found, return not found
  if (questions.length === 0) {
    return <div>Question not found</div>;
  }

  // Select the first question (assuming you want the first question for this topic)
  const question = questions[0];
  
  // Fetch answers for this specific question
  const answers = await fetchAnswers(question.id);

  return (
    <div className="space-y-6">
      <QuestionHeader title={question.title} />
      <AnswerForm questionId={question.id} />
      <AnswersList answers={answers} />
    </div>
  );
}