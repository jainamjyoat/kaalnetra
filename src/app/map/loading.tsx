import React from "react";
import Loader from "@/components/Loding/LoadingScreen";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "var(--background)",
        zIndex: 9999,
      }}
    >
      <Loader />
    </div>
  );
}
