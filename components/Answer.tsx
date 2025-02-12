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
    <div className="flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b hover:bg-gray-50">
      <p className="w-full text-left text-sm">{text}</p>
      {!isAccepted && (
        <form action={acceptAnswer} className="ml-2">
          <input type="hidden" name="answer_id" value={id} />
          <input type="hidden" name="question_id" value={questionId} />
          <button
            type="submit"
            className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <CheckCircleIcon className="w-4 h-4" />
          </button>
        </form>
      )}
      {isAccepted && (
        <div className="ml-2 text-green-500 text-xs flex items-center gap-1">
          <CheckCircleIcon className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}