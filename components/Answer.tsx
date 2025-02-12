import { acceptAnswer } from "@/lib/actions";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircle2, XCircle } from "lucide-react";

type AnswerProps = {
  id: string;
  text: string;
  isAccepted: boolean;
  questionId: string;
};

export function Answer({ id, text, isAccepted, questionId }: AnswerProps) {
  return (
    <div className="flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b hover:bg-gray-50">
      <p className="w-full text-left text-base text-[#1a1a1a]">{text}</p>
      {!isAccepted ? (
        <form action={acceptAnswer}>
          <input type="hidden" name="answer_id" value={id} />
          <input type="hidden" name="question_id" value={questionId} />
          <button
            type="submit"
            className="flex items-center justify-center"
          >
            <XCircle className="h-6 w-6 text-gray-400" />
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
        </div>
      )}
    </div>
  );
}