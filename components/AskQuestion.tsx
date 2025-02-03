import { addQuestion } from "@/lib/actions";

export function AskQuestion({ topic }: { topic: string }) {
  const handleSubmit = async (formData: FormData) => {
    console.log({
      title: formData.get("title"),
      topic_id: formData.get("topic_id")
    });
  };

  return (
    <form 
      className="relative my-8" 
      action={async (formData) => {
        await handleSubmit(formData);
        await addQuestion(formData);
      }}
    >
      <input type="hidden" name="topic_id" value={topic} />
      <input
        type="text"
        name="title"
        placeholder="Enter your question"
        className="mb-4 w-full rounded-md border px-4 py-2"
        required
      />
      <button className="absolute right-2 top-2 flex h-10 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white focus:bg-secondary">
        Ask
      </button>
    </form>
  );
}