import { Card } from "@/components/ui";

interface Job {
  name: string;
  title: string;
  description: string;
  link: string;
}

interface JobsGridProps {
  jobs: Job[];
}

export default function JobsGrid({ jobs }: JobsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <Card key={job.name} hover>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">{job.name}</p>
            <h3 className="text-xl font-semibold text-foreground">
              {job.title}
            </h3>
          </div>
          {job.description && (
            <p className="text-gray-600 mb-4">
              {job.description}
            </p>
          )}
          {job.link && (
            <p className="text-sm text-foreground font-medium">
              {job.link}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}