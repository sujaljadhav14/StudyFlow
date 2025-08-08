import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Milestone, Resource } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseRoadmapString(roadmapString: string): Milestone[] {
  const milestones: Milestone[] = [];
  if (!roadmapString) return milestones;

  // Split by milestones, which start with ###
  const milestoneBlocks = roadmapString.split(/^(?=###\s)/m).filter(block => block.trim() !== '');

  milestoneBlocks.forEach((block, index) => {
    const lines = block.trim().split('\n');
    const titleLine = lines.shift() || '';
    
    // Extracts title from "### Milestone 1: Title" or "### Title"
    const titleMatch = titleLine.match(/^###\s(?:Milestone\s*\d*[:\s]*)?(.*)/i);
    let title = titleMatch ? titleMatch[1].trim() : 'Untitled Milestone';

    const resources: Resource[] = [];
    lines.forEach(line => {
      // Handles formats like:
      // - [Video] [React Hooks Explained](...)
      // - [Article] [Understanding the Virtual DOM](...)
      // - **Video**: [Title](url) - (older format)
      const resourceMatch = line.match(/-\s*(?:\[(.*?)\]\s*)?\[(.*?)\]\((.*?)\)/);
      if (resourceMatch) {
        const typeStr = (resourceMatch[1] || 'unknown').trim().toLowerCase();
        let type: Resource['type'] = 'unknown';

        if (typeStr.includes('video')) type = 'video';
        else if (typeStr.includes('article')) type = 'article';
        else if (typeStr.includes('documentation') || typeStr.includes('docs')) type = 'documentation';
        else if (typeStr.includes('book')) type = 'book';
        
        resources.push({
          type,
          title: resourceMatch[2].trim(),
          url: resourceMatch[3].trim(),
        });
      }
    });

    if (title || resources.length > 0) {
      milestones.push({
        id: index + 1,
        title: title || 'Untitled Milestone',
        resources,
        completed: false,
      });
    }
  });

  return milestones;
}
