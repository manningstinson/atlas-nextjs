import VoteButton from "./VoteButton";
import Link from "next/link";

type QuestionProps = {
  id: string;
  text: string;
  votes: number;
};

export function Question({ id, text, votes }: QuestionProps) {
  return (
    <Link href={`/ui/questions/${id}`}>
      <div className="flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b hover:bg-gray-50">
        <div className="mr-2 rounded-xl bg-secondary px-2 text-sm text-white">
          {votes}
        </div>
        <p className="text w-full text-left font-semibold">{text}</p>
        <VoteButton id={id} />
      </div>
    </Link>
  );
}