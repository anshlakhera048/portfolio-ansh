import { Component } from "react";

/**
 * Wraps heavy/WebGL sections so a runtime crash in one 3D effect
 * cannot white-screen the entire page.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log to console in development; wire to Sentry / LogRocket in prod if desired
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary] 3D scene crashed:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback prop if provided, otherwise render nothing so
      // the rest of the page stays fully functional.
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
