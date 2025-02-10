import { CheckCircle } from "lucide-react";
import { acceptAnswer } from "@/lib/actions";

type AnswerProps = {
  id: string;
  text: string;
  isAccepted: boolean;
};

export function Answer({ id, text, isAccepted }: AnswerProps) {
  return (
    <div className="flex items-center border rounded-md p-4 bg-white">
      <p className="flex-1">{text}</p>
      <form action={acceptAnswer}>
        <input type="hidden" name="answer_id" value={id} />
        <button
          type="submit"
          className={`ml-4 p-2 rounded-full ${
            isAccepted ? "text-green-500" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <CheckCircle className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
}