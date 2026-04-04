import { useEffect, useState } from "react";
import { Plus, AudioLines } from "lucide-react";
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
  const [completed, setCompleted] = useState(false);

  const [message, setMessage] = useState("");

  // 🔴 NEW — store day from API
  const [dayNumber, setDayNumber] = useState<number>(1);

  const currentQuestion = questions[currentIndex];

  // ==========================
  // Fetch Today's Questions
  // ==========================

  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        const res = await fetch(
          "https://klps-lema-production.up.railway.app/api/questions/today"
        );

        const data = await res.json();

        console.log("API RESPONSE:", data);
        console.log("API RESPONSE FULL:", data);
        console.log("QUESTIONS:", data.questions);
        console.log("DAY:", data.day);

        setQuestions(data.questions || []);
        setDayNumber(data.day || 1);

        setLoading(false);

        // ✅ store questions
        setQuestions(data.questions);

        // 🔴 store day number
        setDayNumber(data.day);

        setLoading(false);

      } catch (error) {

        console.error("Failed to load questions", error);

        setLoading(false);

      }

    };

    fetchQuestions();

  }, []);

  // ==========================
  // Move To Next Question
  // ==========================

  const moveToNextQuestion = () => {

    if (currentIndex < questions.length - 1) {

      setCurrentIndex((prev) => prev + 1);

    } else {

      setCompleted(true);

    }

  };

  // ==========================
  // Handle Selection Click
  // ==========================

  const handleOptionSelect = async (value: string) => {

    try {

      await fetch(
        "https://klps-lema-production.up.railway.app/api/signal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: "11111111-1111-1111-1111-111111111111",

            // 🔴 FIXED
            day_number: dayNumber,

            question_key: currentQuestion.question_key,
            response_value: value,
            domain: currentQuestion.domain
          })
        }
      );

      moveToNextQuestion();

    } catch (error) {

      console.error("Signal error:", error);

    }

  };

  // ==========================
  // Handle Text Submit
  // ==========================

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!message.trim()) return;

    try {

      await fetch(
        "https://klps-lema-production.up.railway.app/api/signal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: "11111111-1111-1111-1111-111111111111",

            // 🔴 FIXED
            day_number: dayNumber,

            question_key: currentQuestion.question_key,
            response_value: message,
            domain: currentQuestion.domain
          })
        }
      );

      setMessage("");

      moveToNextQuestion();

    } catch (error) {

      console.error("Text submit error:", error);

    }

  };

  // ==========================
  // UI
  // ==========================

  return (

    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">

      <div className="w-full max-w-4xl mx-auto space-y-8">

        {/* Completion Screen */}

        {completed ? (

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-12">
            Session complete ✅
          </h1>

        ) : (

          <>
            {/* Question */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-12">

              {loading
                ? "Loading your session..."
                : currentQuestion?.question_text}

            </h1>

            {/* Progress */}

            {!loading && (

              <p className="text-sm text-muted-foreground text-center">

                Question {currentIndex + 1} of {questions.length}

              </p>

            )}

          </>

        )}

        {/* Selection Buttons */}

        {!loading &&
          !completed &&
          currentQuestion?.response_type === "selection" && (

            <div className="flex flex-wrap gap-3 justify-center mt-6">

              {currentQuestion.options.map((option) => (

                <Button
                  key={option.value}
                  variant="outline"
                  onClick={() =>
                    handleOptionSelect(option.value)
                  }
                >

                  {option.label}

                </Button>

              ))}

            </div>

          )}

        {/* Text Input — Only for text_long */}

        {!loading &&
          !completed &&
          currentQuestion?.response_type === "text_long" && (

            <form
              onSubmit={handleSubmit}
              className="relative"
            >

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
                  placeholder="Type your response..."
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/60"
                />

                <Button
                  type="submit"
                  variant="default"
                  className="rounded-full shrink-0"
                >

                  Send

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

          )}

      </div>

    </div>

  );

};

export default ChatLema;
