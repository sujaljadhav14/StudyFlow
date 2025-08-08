import { BookOpenCheck } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <BookOpenCheck className="h-7 w-7 text-primary" />
      <h1 className="text-2xl font-bold text-primary">StudyFlow</h1>
    </div>
  );
}
