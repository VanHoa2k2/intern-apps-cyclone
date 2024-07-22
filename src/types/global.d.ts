// src/types/global.d.ts
export {};

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (options: { xfbml: boolean; version: string }) => void;
    };
  }
}
