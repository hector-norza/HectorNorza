// Global type declarations for third-party libraries

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics gtag function
declare function gtag(...args: any[]): void;

export {};