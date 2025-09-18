import { Layout, StatusIcon } from "./ui/custom";

interface LoadingStateProps {
  handle: string;
}

export function LoadingState({ handle }: LoadingStateProps) {
  return (
    <Layout>
      <div className="text-center animate-in fade-in blur-in-sm duration-500 rounded-xl overflow-clip p-0">
        <StatusIcon type="loading" className="mx-auto mb-4" />
      </div>
    </Layout>
  );
}
