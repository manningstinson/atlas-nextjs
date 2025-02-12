import { addAnswer } from "@/lib/actions";

type AnswerFormProps = {
  questionId: string;
};

export function AnswerForm({ questionId }: AnswerFormProps) {
  return (
    <form action={addAnswer} className="space-y-2">
      <input type="hidden" name="question_id" value={questionId} />
      <textarea
        name="text"
        className="w-full rounded-md border border-gray-300 p-2 min-h-[100px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Write your answer..."
        required
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-secondary text-white rounded-md text-sm hover:bg-opacity-90"
      >
        Submit Answer
      </button>
    </form>
  );
}