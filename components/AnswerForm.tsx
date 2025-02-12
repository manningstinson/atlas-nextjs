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
        className="w-full border border-gray-300 rounded-md p-4 text-sm min-h-[50px] pr-28 my-6 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        placeholder="Write your answer..."
        required
        rows={1}
      />
      <button
        type="submit"
        className="absolute right-4 bg-secondary text-white rounded-md px-6 py-2 text-medium hover:opacity-90"
      >
        Answer
      </button>
    </form>
  );
}