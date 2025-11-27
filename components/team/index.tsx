
// Export the App component for usage within Next.js pages/components.
// Previously this file attempted to mount itself to a DOM node which is
// incompatible with Next's server-rendered components and caused build
// failures.
export { default } from "./App";