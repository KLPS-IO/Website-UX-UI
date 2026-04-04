import { useEffect, useState } from "react";
import { Plus, Mic, AudioLines } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Option = {
  value: string;
  label: string;
};

type Question = {
  question_key: string;
  question_text: string;
  domain: string;
  response_type: string;
  options: Option[];
};

const ChatLema = () => {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    console.log("Message:", message);
    setMessage("");
  };

  useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const res = await fetch(
        "https://klps-lema-production.up.railway.app/api/questions/today"
      );

      const data = await res.json();

      console.log("API RESPONSE:", data);

      setQuestions(data.questions);
      setLoading(false);

    } catch (error) {
      console.error("Failed to load questions", error);
      setLoading(false);
    }
  };

  fetchQuestions();
}, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-12">
          {/* Where should we begin? */}
          {loading
            ? "Loading your session..."
            : questions.length === 0
              ? "No questions found for today."
              : questions[currentIndex]?.question_text}
        </h1>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-3 bg-muted/50 backdrop-blur-sm rounded-full px-6 py-4 shadow-elegant border border-border/50">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full shrink-0"
            >
              <Plus className="h-5 w-5" />
            </Button>

            <Input
              type="text"
              placeholder="Chat to Lema"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/60"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full shrink-0"
            >
              <Mic className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full shrink-0"
            >
              <AudioLines className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatLema;
