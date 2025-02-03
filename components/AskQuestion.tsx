import { addQuestion } from "@/lib/actions";

export function AskQuestion({ topic }: { topic: string }) {
  return (
    <form className="relative my-8"action={addQuestion}>
      <input
        type="hidden"
        name="topic_id"
        value={topic}
        placeholder="Ask a question"
        className="hidden"
      />
      <button className="absolute right-2 top-2 flex h-10 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white focus:bg-secondary">
        Ask
      </button>
    </form>
  );
}