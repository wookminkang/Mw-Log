"use client";
import dynamic from "next/dynamic";
import { AppEditor } from "./AppEditor";
export const Editor = dynamic(() => Promise.resolve(AppEditor), { ssr: false });