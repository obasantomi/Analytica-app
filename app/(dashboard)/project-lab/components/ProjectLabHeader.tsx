import type { ProjectLabViewModel } from "@/lib/project-lab/types";

interface ProjectLabHeaderProps {
  title: ProjectLabViewModel["projectTitle"];
  leadParagraph: ProjectLabViewModel["leadParagraph"];
}

export function ProjectLabHeader({ title, leadParagraph }: ProjectLabHeaderProps) {
  return (
    <header className="space-y-3">
      <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">CURRENT PROJECT</p>
      <h1 className="text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">{title}</h1>
      <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{leadParagraph}</p>
    </header>
  );
}
