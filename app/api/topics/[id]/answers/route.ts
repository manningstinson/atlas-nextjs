import { NextRequest, NextResponse } from 'next/server';
import { fetchAnswers } from '@/lib/data';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const questionId = context.params.id;
    const answers = await fetchAnswers(questionId);
    
    // Map to ensure only specified fields are returned
    const formattedAnswers = answers.map(answer => ({
      id: answer.id,
      answer: answer.answer,
      question_id: answer.question_id
    }));

    return NextResponse.json(formattedAnswers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch answers' }, 
      { status: 500 }
    );
  }
}