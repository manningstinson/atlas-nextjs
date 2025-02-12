import { addQuestion } from "@/lib/actions";

export function AskQuestion({ topic }: { topic: string }) {
  return (
    <form className="relative my-8" action={addQuestion}>
      <input type="hidden" name="topic_id" value={topic} />
      <input type="text"name="title" className="w-full border border-gray-300 rounded-md p-2 text-sm min-h-[22px] pr-20 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ask a question..."
        required/>
      <button className="absolute right-2 top-0 flex h-11 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white focus:bg-secondary">
        Ask
      </button>
    </form>
  );
}
