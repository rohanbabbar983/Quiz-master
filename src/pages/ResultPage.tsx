import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Question } from "../types/question";

const ResultPage = () => {
  const [questions, setQuestions] = useLocalStorage<Question[]>("questions", []);
  const [answers, setAnswers] = useLocalStorage<string[][]>("answers", []);
  const [_index, setIndex] = useLocalStorage("index", 0);
  const navigate = useNavigate();

  const score = answers.reduce((acc, curr, i) => {
    const correct = JSON.stringify(curr) === JSON.stringify(questions[i]?.correct);
    return acc + (correct ? 1 : 0);
  }, 0);

  useEffect(() => {
    if (questions.length === 0 || answers.length === 0) {
      navigate('/');
    }
  }, [questions, answers, navigate]);

  const handleRestart = () => {
    setQuestions([]);
    setAnswers([]);
    setIndex(0);
    navigate("/");
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full h-full bg-white rounded-xl shadow-lg p-4 md:p-6 flex flex-col gap-6 overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-black">Feedback</h2>
          <p className="text-lg font-medium text-gray-700">
            Your Score: <span className="text-2xl font-bold">{score} / {questions.length}</span>
          </p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {questions.map((q, i) => {
            const correct = JSON.stringify(answers[i]) === JSON.stringify(q.correct);
            return (
              <div
                key={q.id}
                className={`rounded-lg border-l-4 p-4 shadow-sm ${
                  correct ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                }`}
              >
                <p className="text-gray-800 font-semibold mb-1">
                  Q{i + 1}: {q.sentence}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Your Answer:</span>{" "}
                  <span className="text-gray-700">{answers[i]?.join(" ")}</span>
                </p>
                {!correct && (
                  <p className="text-sm">
                    <span className="font-medium">Correct Answer:</span>{" "}
                    <span className="text-gray-700">{q.correct.join(" ")}</span>
                  </p>
                )}
                <p className={`mt-1 font-bold ${correct ? "text-green-600" : "text-red-600"}`}>
                  {correct ? "✅ Correct" : "❌ Incorrect"}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleRestart}
            className="bg-white cursor-pointer rounded-full text-black font-semibold px-6 py-2  shadow-md transition-all"
          >
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
