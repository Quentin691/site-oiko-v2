import { Card } from "@/components/ui";

interface VideoSectionProps {
  title: string;
  description?: string;
}

export default function VideoSection({ title, description }: VideoSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-muted whitespace-pre-line">
            {description}
          </p>
        )}
      </div>

      <Card>
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-20 h-20 text-muted mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-muted">Vidéo à venir</p>
          </div>
        </div>
      </Card>
    </div>
  );
}