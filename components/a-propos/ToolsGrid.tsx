import { Card } from "@/components/ui";

interface Tool {
  name: string;
  description: string;
}

interface ToolsGridProps {
  tools: Tool[];
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Card key={tool.name} hover>
          <div className="flex items-start gap-4">
            {/* Icône placeholder */}
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-background"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tool.name}
              </h3>
              <p className="text-muted text-sm">
                {tool.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}