import { Suspense } from "react";
import GenerateContent from "./GenerateContent";

export default function GeneratePageWrapper() {
  return (
    <Suspense
      fallback={<div className="py-10 text-center text-white">Loading...</div>}
    >
      <GenerateContent />
    </Suspense>
  );
}
