"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    trackerConfig: any;
  }
}

export default function TrackingLoader() {
  useEffect(() => {
    window.trackerConfig = {
      companyId: "1",
      apiUrl: "http://localhost:8000/api/v1",
      websiteId: "1",
    };
    import("../tracking/main.js");
  }, []);
  return null;
}