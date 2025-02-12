import { HashtagIcon } from "@heroicons/react/24/outline";
import { fetchAnswers, fetchQuestions } from "@/lib/data";
import { Answer } from "@/components/Answer";
import { addAnswer } from "@/lib/actions";

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
    <div>
      <h1 className="text-3xl font-black flex items-center">
        <HashtagIcon className="h-6 w-6 mr-2" /> {question.title}
      </h1>
      <form action={addAnswer} className="mt-6 space-y-4">
        <input type="hidden" name="question_id" value={(await params).id} />
        <textarea
          name="text"
          className="w-full rounded-md border p-2 min-h-32"
          placeholder="Write your answer..."
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90"
        >
          Submit Answer
        </button>
      </form>
      <div className="mt-6 space-y-4">
        {answers.map((answer) => (
          <Answer
            key={answer.id}
            id={answer.id}
            text={answer.text}
            isAccepted={answer.is_accepted}
          />
        ))}
      </div>
    </div>
  );
}