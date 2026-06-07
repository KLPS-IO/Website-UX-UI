import { useEffect, useRef, useState } from "react";
import { Mic, Pause, Play, Square, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onChange: (
    blob: Blob | null,
    durationSeconds: number
  ) => void;
}

const MAX_SECONDS = 180;

export function VoiceRecorder({ onChange }: Props) {
  const [state, setState] = useState<"idle" | "recording" | "paused" | "done">("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s + 1 >= MAX_SECONDS) {
          stop();
          return MAX_SECONDS;
        }
        return s + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onChange(blob, seconds);
        setState("done");
        stopTimer();
        streamRef.current?.getTracks().forEach((t) => t.stop());
      };
      recorderRef.current = rec;
      rec.start();
      setState("recording");
      setSeconds(0);
      startTimer();
    } catch {
      setError("We couldn't access your microphone. Please allow access and try again.");
    }
  };

  const pause = () => {
    recorderRef.current?.pause();
    stopTimer();
    setState("paused");
  };

  const resume = () => {
    recorderRef.current?.resume();
    startTimer();
    setState("recording");
  };

  const stop = () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
  };

  const reset = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setSeconds(0);
    setState("idle");
    onChange(null, 0);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur p-6 shadow-soft border border-border">
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-smooth",
            state === "recording" && "animate-pulse-soft",
          )}
        >
          <Mic className="h-10 w-10" />
        </div>

        <div className="font-display text-3xl tabular-nums text-plum">
          {mm}:{ss}
          <span className="ml-1 text-xs font-sans text-muted-foreground">
            / 03:00
          </span>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex flex-wrap items-center justify-center gap-3">
          {state === "idle" && (
            <button
              onClick={start}
              className="rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-medium shadow-soft transition-smooth hover:scale-105"
            >
              Start recording
            </button>
          )}
          {state === "recording" && (
            <>
              <button
                onClick={pause}
                className="rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 transition-smooth hover:bg-secondary/80 inline-flex items-center gap-2"
              >
                <Pause className="h-4 w-4" /> Pause
              </button>
              <button
                onClick={stop}
                className="rounded-full bg-gradient-primary text-primary-foreground px-5 py-2.5 transition-smooth hover:scale-105 inline-flex items-center gap-2"
              >
                <Square className="h-4 w-4" /> Stop
              </button>
            </>
          )}
          {state === "paused" && (
            <>
              <button
                onClick={resume}
                className="rounded-full bg-gradient-primary text-primary-foreground px-5 py-2.5 transition-smooth inline-flex items-center gap-2"
              >
                <Play className="h-4 w-4" /> Resume
              </button>
              <button
                onClick={stop}
                className="rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 transition-smooth inline-flex items-center gap-2"
              >
                <Square className="h-4 w-4" /> Stop
              </button>
            </>
          )}
          {state === "done" && audioUrl && (
            <div className="flex flex-col items-center gap-3">
              <audio src={audioUrl} controls className="w-full max-w-xs" />
              <button
                onClick={reset}
                className="text-sm text-orchid inline-flex items-center gap-1.5 hover:text-plum transition-smooth"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Re-record
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
