import { Play } from "lucide-react";
export default function CaptureTeachersLocation({ setIsStartModalOpen }) {
  return (
    <>
      <button
        type="button"
        onClick={() => setIsStartModalOpen(true)}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        <Play className="size-4" />
        Start Session
      </button>
    </>
  );
}
