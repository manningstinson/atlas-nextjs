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
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <p className="text-gray-800 text-sm">{text}</p>
      {!isAccepted && (
        <form action={acceptAnswer} className="mt-2">
          <input type="hidden" name="answer_id" value={id} />
          <input type="hidden" name="question_id" value={questionId} />
          <button
            type="submit"
            className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <CheckCircleIcon className="w-4 h-4" />
            Mark as Correct
          </button>
        </form>
      )}
      {isAccepted && (
        <div className="text-green-500 text-xs mt-2 flex items-center gap-1">
          <CheckCircleIcon className="w-4 h-4" />
          Correct Answer
        </div>
      )}
    </div>
  );
}