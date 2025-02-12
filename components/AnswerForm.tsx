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
        className="w-full border border-gray-300 rounded-md p-2 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Write your answer..."
        required
      />
      <button
        type="submit"
        className="w-full bg-secondary text-white rounded-md py-2 text-sm hover:opacity-90"
      >
        Submit Answer
      </button>
    </form>
  );
}