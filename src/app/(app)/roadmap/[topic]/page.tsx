import { generateRoadmapFromTopic } from '@/ai/flows/generate-roadmap-from-topic';
import { parseRoadmapString } from '@/lib/utils';
import { RoadmapClient } from '@/components/roadmap/RoadmapClient';

type RoadmapPageProps = {
  params: {
    topic: string;
  };
};

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const topic = decodeURIComponent(params.topic);

  const { roadmap } = await generateRoadmapFromTopic({ topic });
  const milestones = parseRoadmapString(roadmap);

  return (
    <RoadmapClient initialMilestones={milestones} topic={topic} rawRoadmap={roadmap} />
  );
}
