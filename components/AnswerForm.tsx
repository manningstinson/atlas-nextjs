import { addAnswer } from "@/lib/actions";

type AnswerFormProps = {
  questionId: string;
};

export function AnswerForm({ questionId }: AnswerFormProps) {
  return (
    <form action={addAnswer} className="relative">
      <input type="hidden" name="question_id" value={questionId} />
      <textarea
        name="text"
        className="w-full border border-gray-300 rounded-md p-2 text-sm min-h-[40px] pr-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Write your answer..."
        required
      />
      <button
        type="submit"
        className="absolute center-3 right-3 bg-secondary text-white rounded-md px-6 py-1 text-xs hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
}