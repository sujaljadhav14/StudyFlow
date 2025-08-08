export type Resource = {
  title: string;
  type: 'video' | 'article' | 'documentation' | 'book' | 'unknown';
  url: string;
};

export type Milestone = {
  id: number;
  title: string;
  resources: Resource[];
  completed: boolean;
};
