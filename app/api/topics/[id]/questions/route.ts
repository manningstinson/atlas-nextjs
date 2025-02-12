import { fetchQuestions } from '@/lib/data';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const paramId = await params;
    const questions = await fetchQuestions(paramId.id);
    
    const formattedQuestions = questions.map(question => ({
      id: question.id,
      title: question.title,
      topic_id: question.topic_id,
      votes: question.votes
    }));

    return Response.json({ data: formattedQuestions });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch questions' }, 
      { status: 500 }
    );
  }
}