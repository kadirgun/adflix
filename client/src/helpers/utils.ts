import UAParser from "ua-parser-js";
export const isMacOs = (): boolean => {
  const ua = UAParser();
  return ua.os.name === "Mac OS";
}
export const getPreferredColorScheme = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';