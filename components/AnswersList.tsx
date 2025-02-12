import { Answer } from './Answer';

export function AnswersList({
 answers,
 questionId
}: {
 answers: Array<{
   id: string;
   answer: string;  // Changed from 'text' to 'answer'
   is_accepted: boolean;
 }>,
 questionId: string
}) {
  // Sort answers with accepted answer first
  const sortedAnswers = [...answers].sort((a, b) =>
    b.is_accepted ? 1 : a.is_accepted ? -1 : 0
  );

  return (
    <div className="space-y-4">
      {sortedAnswers.map((answer) => (
        <Answer
          key={answer.id}
          id={answer.id}
          text={answer.answer}  // Pass 'answer' as 'text'
          isAccepted={answer.is_accepted}
          questionId={questionId}
        />
      ))}
    </div>
  );
}