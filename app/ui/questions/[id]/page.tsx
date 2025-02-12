import { fetchAnswers, fetchQuestions } from "@/lib/data";
import { QuestionHeader } from "@/components/QuestionHeader";
import { AnswerForm } from "@/components/AnswerForm";
import { AnswersList } from "@/components/AnswersList";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const questions = await fetchQuestions((await params).id);
  const question = questions[0];
  const answers = await fetchAnswers((await params).id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div className="space-y-6">
      <QuestionHeader title={question.title} />
      <AnswerForm questionId={(await params).id} />
      <AnswersList answers={answers} />
    </div>
  );
}