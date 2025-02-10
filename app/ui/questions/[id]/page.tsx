import { fetchAnswers } from "@/lib/data";
import { Answer } from "@/components/Answer";
import { addAnswer } from "@/lib/actions";

export default async function QuestionPage({
  params,
}: {
  params: { id: string };
}) {
  const answers = await fetchAnswers(params.id);

  return (
    <div className="space-y-6">
      <form action={addAnswer} className="space-y-4">
        <input type="hidden" name="question_id" value={params.id} />
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

      <div className="space-y-4">
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