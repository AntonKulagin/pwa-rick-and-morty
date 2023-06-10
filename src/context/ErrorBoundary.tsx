import { Component, PropsWithChildren } from 'react'

type ErrorBoundaryProps = {}

type ErrorBoundaryState = {
  hasError: boolean
}
type ErrorInfo = {
  componentStack: string
}

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('errorFromError', error.message)
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('error', error.message)
    console.log('errorInfo', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h4>Что-то пошло не так</h4>
    }
    return this.props.children
  }
}
