"use client";
import dynamic from "next/dynamic";

export const Editor = dynamic(
  () => import("./AppEditor").then((m) => ({ default: m.AppEditor })),
  { ssr: false }
);
