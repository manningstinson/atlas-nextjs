import { acceptAnswer } from "@/lib/actions";
import { Check } from "lucide-react";

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
            className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-gray-400"
          >
            <Check className="h-4 w-4 text-gray-400" strokeWidth={2.5} />
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#1ED2AF]">
          <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}