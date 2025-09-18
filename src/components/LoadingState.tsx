import { Layout, StatusIcon } from "./ui/custom";

interface LoadingStateProps {
  handle: string;
}

export function LoadingState({ handle }: LoadingStateProps) {
  return (
    <Layout>
      <div className="text-center">
        <StatusIcon type="loading" className="mx-auto mb-4" />
      </div>
    </Layout>
  );
}
