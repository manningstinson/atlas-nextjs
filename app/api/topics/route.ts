import { fetchTopics } from '@/lib/data';

export async function GET() {
  try {
    const topics = await fetchTopics();
    
    const formattedTopics = topics.map(topic => ({
      id: topic.id,
      title: topic.title
    }));

    return Response.json({ data: formattedTopics });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch topics' }, 
      { status: 500 }
    );
  }
}