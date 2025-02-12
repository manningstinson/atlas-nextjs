import { NextRequest, NextResponse } from 'next/server';
import { fetchTopics } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const topics = await fetchTopics();
    
    // Map to ensure only id and title are returned
    const formattedTopics = topics.map(topic => ({
      id: topic.id,
      title: topic.title
    }));

    return NextResponse.json(formattedTopics, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch topics' }, 
      { status: 500 }
    );
  }
}