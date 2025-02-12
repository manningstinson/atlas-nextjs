import { acceptAnswer } from "@/lib/actions";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type AnswerProps = {
  id: string;
  text: string;
  isAccepted: boolean;
  questionId: string;
};

export function Answer({ id, text, isAccepted, questionId }: AnswerProps) {
  return (
    <div
      className={`
        p-4 rounded-lg shadow-sm relative border border-gray-200
        ${isAccepted
          ? 'bg-green-50 border-2 border-green-500'
          : 'bg-white'}
      `}
    >
      {isAccepted && (
        <CheckCircleIcon
          className="absolute top-4 right-4 text-green-500 w-5 h-5"
        />
      )}
      <p className="text-sm text-gray-800">{text}</p>
      {!isAccepted && (
        <form action={acceptAnswer} className="mt-2">
          <input
            type="hidden"
            name="answer_id"
            value={id}
          />
          <input
            type="hidden"
            name="question_id"
            value={questionId}
          />
          <button
            type="submit"
            className="
              bg-blue-500 text-white px-3 py-1 rounded-md text-xs
              hover:bg-blue-600 transition-colors
              flex items-center gap-2
            "
          >
            <CheckCircleIcon className="w-4 h-4" />
            Mark as Correct
          </button>
        </form>
      )}
    </div>
  );
}