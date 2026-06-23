import { Component } from "react";
import { ErrorDisplay } from "@/components/common";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          fullScreen
          title="Something went wrong"
          message={this.state.error?.message || "An unexpected error occurred"}
          onRetry={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}
