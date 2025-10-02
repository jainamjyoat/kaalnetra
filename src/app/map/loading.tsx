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
        background: "#000",
        zIndex: 9999,
      }}
    >
      <div style={{ display: "grid", placeItems: "center", gap: 12, textAlign: "center", padding: 16 }}>
        <Loader />
        <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Loading Köppen overlay…</div>
        <div style={{ color: "#94a3b8", fontSize: 12 }}>Decoding GeoTIFF and preparing map overlay</div>
      </div>
    </div>
  );
}
