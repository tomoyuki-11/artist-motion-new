"use client";

import { useEffect } from "react";
import { incrementVisits } from "@/lib/adminApi";

const VISIT_COUNTED_KEY = "artist_motion_visit_counted";

export function VisitCounter() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(VISIT_COUNTED_KEY)) return;
      sessionStorage.setItem(VISIT_COUNTED_KEY, "1");
      incrementVisits().catch(() => {});
    } catch {
      // シークレットモード等で sessionStorage が使えない場合は加算しない
    }
  }, []);

  return null;
}
