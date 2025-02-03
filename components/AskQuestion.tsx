import { addQuestion } from "@/lib/actions";

export function AskQuestion({ topic }: { topic: string }) {
  return (
    <form className="relative my-8" action={addQuestion}>
      <input type="hidden" name="topic_id" value={topic} />
      <input type="text"name="title" className="w-full rounded-md border p-2 pr-28" placeholder="Ask a question..."
        required/>
      <button className="absolute right-2 mt-1 flex h-10 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white focus:bg-secondary">
        Ask
      </button>
    </form>
  );
}
