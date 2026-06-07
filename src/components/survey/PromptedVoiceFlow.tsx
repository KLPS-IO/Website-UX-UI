import { useState } from "react";
import { VoiceRecorder } from "@/components/survey/VoiceRecord";
import {
  ArrowRight,
  Check,
  SkipForward,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type VoicePrompt = {
  key: string;
  text: string;
};

export type VoiceRecordingEntry = {
  questionKey: string;
  questionText: string;
  blob: Blob;
  durationSeconds: number;
};

interface Props {
  prompts: VoicePrompt[];
  onComplete: (
    recordings: VoiceRecordingEntry[]
  ) => void;
}

export function PromptedVoiceFlow({
  prompts,
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);

  const [blob, setBlob] =
    useState<Blob | null>(null);

  const [durationSeconds, setDurationSeconds] =
    useState(0);

  const [recordings, setRecordings] =
    useState<VoiceRecordingEntry[]>([]);

  const [error, setError] =
    useState<string | null>(null);

  const [recorderKey, setRecorderKey] =
    useState(0);

  const currentPrompt = prompts[index];

  const isLast =
    index >= prompts.length - 1;

  const advance = (
    next: VoiceRecordingEntry[]
  ) => {
    setBlob(null);
    setDurationSeconds(0);
    setRecorderKey((k) => k + 1);

    if (isLast) {
      onComplete(next);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const saveAndNext = () => {
    if (!blob) {
      setError(
        "Please record an answer first."
      );
      return;
    }

    const nextRecording: VoiceRecordingEntry =
      {
        questionKey:
          currentPrompt.key,

        questionText:
          currentPrompt.text,

        blob,

        durationSeconds,
      };

    const next = [
      ...recordings,
      nextRecording,
    ];

    setRecordings(next);
    setError(null);

    advance(next);
  };

  const skip = () => {
    advance(recordings);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2">
        {prompts.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 rounded-full transition-smooth",
              i < index
                ? "w-2 bg-orchid"
                : i === index
                ? "w-8 bg-gradient-primary"
                : "w-2 bg-border"
            )}
          />
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Question {index + 1} of{" "}
        {prompts.length}
      </div>

      {/* Prompt */}
      <div className="rounded-3xl bg-blush/40 border border-petal/40 p-6 text-center">
        <Sparkles className="h-5 w-5 text-orchid mx-auto mb-3" />

        <p className="font-display text-xl sm:text-2xl text-plum leading-snug">
          {currentPrompt.text}
        </p>
      </div>

      <VoiceRecorder
        key={recorderKey}
        onChange={(
          blob,
          duration
        ) => {
          setBlob(blob);
          setDurationSeconds(
            duration
          );
        }}
      />

      {error && (
        <p className="text-sm text-destructive text-center">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={skip}
          className="text-sm text-muted-foreground hover:text-plum transition-smooth inline-flex items-center gap-1.5"
        >
          <SkipForward className="h-3.5 w-3.5" />
          Skip this question
        </button>

        <button
          onClick={saveAndNext}
          disabled={!blob}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-7 py-3 font-medium shadow-soft transition-smooth hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLast ? (
            <>
              <Check className="h-4 w-4" />
              Save & finish
            </>
          ) : (
            <>
              Save & next
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {recordings.length > 0 && (
  <p className="text-center text-xs text-muted-foreground">
    ✓ Progress: {recordings.length} / {prompts.length} questions completed
  </p>
)}
    </div>
  );
}