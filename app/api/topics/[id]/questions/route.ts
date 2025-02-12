import { NextRequest, NextResponse } from 'next/server';
import { fetchQuestions } from '@/lib/data';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const topicId = context.params.id;
    const questions = await fetchQuestions(topicId);
    
    // Map to ensure only specified fields are returned
    const formattedQuestions = questions.map(question => ({
      id: question.id,
      title: question.title,
      topic_id: question.topic_id,
      votes: question.votes
    }));

    return NextResponse.json(formattedQuestions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch questions' }, 
      { status: 500 }
    );
  }
}