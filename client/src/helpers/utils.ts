import UAParser from "ua-parser-js";
export const isMacOs = (): boolean => {
  const ua = UAParser();
  return ua.os.name === "Mac OS";
}