import { fetchAnswers } from '@/lib/data';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const paramId = await params;
    const answers = await fetchAnswers(paramId.id);
    
    const formattedAnswers = answers.map(answer => ({
      id: answer.id,
      answer: answer.answer,
      question_id: answer.question_id
    }));

    return Response.json({ data: formattedAnswers });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch answers' }, 
      { status: 500 }
    );
  }
}