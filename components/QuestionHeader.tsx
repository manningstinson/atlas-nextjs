import { HashtagIcon } from "@heroicons/react/24/outline";

type QuestionHeaderProps = {
  title: string;
};

export function QuestionHeader({ title }: QuestionHeaderProps) {
  return (
    <h1 className="text-3xl font-black flex items-center">
      <HashtagIcon className="h-6 w-6 mr-2" /> {title}
    </h1>
  );
}