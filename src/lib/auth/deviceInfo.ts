import { headers } from "next/headers";

const IP_HEADER_PRIORITY = [
  "cf-connecting-ip",
  "x-client-ip",
  "x-forwarded-for",
  "x-real-ip",
  "x-cluster-client-ip",
  "forwarded-for",
  "forwarded",
  "do-connecting-ip",
];
export async function getIpAddress() {
  const headersList = await headers();
  for (const header of IP_HEADER_PRIORITY) {
    const value = headersList.get(header);
    if (typeof value === "string") {
      const ip = value.split(",")[0].trim();
      if (/^(10\.|192\.168\.|127\.|172\.(1[6-9]|2[0-9]|3[0-1]))/.test(ip)) continue;
      if (ip) return ip;
    }
  }
  return headersList.get("x-real-ip") ?? "0.0.0.0";
};
