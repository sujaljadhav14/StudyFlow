'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Milestone as MilestoneType, Resource } from '@/lib/types';
import { suggestNextSteps } from '@/ai/flows/suggest-next-steps';
import { Loader2, Lightbulb, Video, BookOpen, FileText, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type RoadmapClientProps = {
  initialMilestones: MilestoneType[];
  topic: string;
  rawRoadmap: string;
};

const ResourceIcon = ({ type }: { type: Resource['type'] }) => {
  switch (type) {
    case 'video':
      return <Video className="h-5 w-5 text-primary" />;
    case 'article':
      return <FileText className="h-5 w-5 text-primary" />;
    case 'documentation':
      return <BookOpen className="h-5 w-5 text-primary" />;
    default:
      return <ExternalLink className="h-5 w-5 text-primary" />;
  }
};

export function RoadmapClient({ initialMilestones, topic, rawRoadmap }: RoadmapClientProps) {
  const [milestones, setMilestones] = useState<MilestoneType[]>(initialMilestones);
  const [aiSuggestions, setAiSuggestions] = useState<{ nextSteps: string[]; reasoning: string } | null>(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const completedMilestonesCount = useMemo(() => milestones.filter(m => m.completed).length, [milestones]);
  const progress = useMemo(() => (milestones.length > 0 ? (completedMilestonesCount / milestones.length) * 100 : 0), [completedMilestonesCount, milestones.length]);

  const toggleMilestone = (id: number) => {
    setMilestones(currentMilestones =>
      currentMilestones.map(m => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleGetSuggestions = async () => {
    setIsLoadingSuggestions(true);
    setAiSuggestions(null);
    const completed = milestones.filter(m => m.completed).map(m => m.title);
    try {
      const suggestions = await suggestNextSteps({
        completedMilestones: completed,
        roadmap: rawRoadmap,
      });
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Card className="mb-8 overflow-hidden shadow-lg">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-3xl font-bold text-primary">{topic}</CardTitle>
          <CardDescription className="text-lg">Your personalized path to mastery.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Progress value={progress} className="h-3" />
            <span className="font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{completedMilestonesCount} of {milestones.length} milestones completed.</p>
        </CardContent>
      </Card>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Milestones</h2>
          {milestones.map(milestone => (
            <Card key={milestone.id} className={`transition-all ${milestone.completed ? 'bg-green-50 border-green-200' : ''}`}>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <Checkbox
                  id={`milestone-${milestone.id}`}
                  checked={milestone.completed}
                  onCheckedChange={() => toggleMilestone(milestone.id)}
                  className="h-6 w-6 mt-1"
                />
                <div className="grid gap-1.5">
                  <label htmlFor={`milestone-${milestone.id}`} className="text-xl font-semibold cursor-pointer">{milestone.title}</label>
                </div>
              </CardHeader>
              {milestone.resources.length > 0 && (
                <CardContent>
                  <h3 className="mb-3 font-semibold text-md text-muted-foreground">Resources:</h3>
                  <ul className="space-y-3">
                    {milestone.resources.map((resource, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <ResourceIcon type={resource.type} />
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary hover:underline underline-offset-4 transition-colors">
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-primary"/> AI Assistant
              </CardTitle>
              <CardDescription>Feeling stuck? Get personalized suggestions on what to do next.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSuggestions ? (
                 <div className="flex justify-center items-center h-24">
                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
              ) : aiSuggestions ? (
                <Alert>
                  <AlertTitle className="font-semibold">Next Steps</AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">{aiSuggestions.reasoning}</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {aiSuggestions.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : (
                 <p className="text-sm text-muted-foreground">Complete some milestones and ask for suggestions!</p>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleGetSuggestions} className="w-full" disabled={isLoadingSuggestions}>
                Get Suggestions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
