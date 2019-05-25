import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: new Error() };

  componentDidCatch(error) {
    this.setState({ hasError: true, error });
  }

  render() {
    const { error, hasError } = this.state;

    if (hasError) {
      return (
        <React.Fragment>
          <h1>ERROR!</h1>
          <div>
            <div>{error.name}</div>
            <div>{error.message}</div>
            <div>{error.stack}</div>
          </div>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

// @ts-ignore
export default ErrorBoundary;
