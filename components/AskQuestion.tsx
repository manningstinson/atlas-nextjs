import { addQuestion } from "@/lib/actions";

export function AskQuestion({ topic }: { topic: string }) {
  return (
    <form className="relative" action={addQuestion}>
      <input type="hidden" name="topic_id" value={topic} />
      <input 
        type="text" 
        name="title" 
        className="w-full border border-gray-300 rounded-md p-4 text-sm min-h-[50px] pr-28 my-6 focus:outline-none focus:ring-1 focus:ring-blue-500" 
        placeholder="Ask a question..."
        required
      />
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary text-white rounded-md px-6 py-2 text-sm hover:opacity-90"
      >
        Ask Question
      </button>
    </form>
  );
}