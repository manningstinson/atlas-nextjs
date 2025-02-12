import { addAnswer } from "@/lib/actions";

type AnswerFormProps = {
  questionId: string;
};

export function AnswerForm({ questionId }: AnswerFormProps) {
  return (
    <form action={addAnswer} className="space-y-4">
      <input type="hidden" name="question_id" value={questionId} />
      <textarea
        name="text"
        className="w-full rounded-md border p-2 min-h-15"
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
  );
}