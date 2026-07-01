"use client";

import { useEffect } from "react";

export default function BrowserInspectionGuard() {
  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const preventInspectionShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const commandKey = event.ctrlKey || event.metaKey;
      const blocked =
        event.key === "F12" ||
        (commandKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (commandKey && key === "u");

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventInspectionShortcuts, true);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventInspectionShortcuts, true);
    };
  }, []);

  return null;
}
