// File: pages/SentenceGame.tsx
import { useEffect, useState } from "react";
import { fetchQuestions } from "../lib/api";
import { Question } from "../types/question";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IoExitOutline } from "react-icons/io5";

const SentenceGame = () => {
  const [questions, setQuestions] = useLocalStorage<Question[]>(
    "questions",
    []
  );
  const [index, setIndex] = useLocalStorage("index", 0);
  const [answers, setAnswers] = useLocalStorage<string[][]>("answers", []);
  const [selected, setSelected] = useState<(string | null)[]>([]);
  const [resetSignal, setResetSignal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (questions.length === 0) {
        const data = await fetchQuestions();
        setQuestions(data);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const current = questions[index];
    if (current) {
      const blanks = (current.sentence.match(/_+/g) || []).length;
      setSelected(Array(blanks).fill(null));
    }
  }, [questions, index]);

  const handleSelect = (word: string) => {
    const i = selected.findIndex((s) => s === null);
    if (i !== -1) {
      const updated = [...selected];
      updated[i] = word;
      setSelected(updated);
    }
  };

  const handleUnselect = (word: string) => {
    const i = selected.findIndex((s) => s === word);
    if (i !== -1) {
      const updated = [...selected];
      updated[i] = null;
      setSelected(updated);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[index] = selected as string[];
    setAnswers(newAnswers);

    if (index + 1 >= questions.length) {
      navigate("/result");
    } else {
      setIndex(index + 1);
      setResetSignal((s) => s + 1);
    }
  };

  const current = questions[index];
  if (!current)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );

  // Replace each '_' with a clickable span based on selection
  let blankIndex = 0;
  const sentenceJSX = current.sentence.split(/(_+)/g).map((part, i) => {
    if (part.match(/_+/)) {
      const word = selected[blankIndex];
      const content = word || "_____";
      const element = (
        <span
          key={`blank-${i}`}
          onClick={() => word && handleUnselect(word)}
          className={`cursor-pointer px-2  font-semibold mx-1 transition-colors duration-200 ${
            word
              ? "text-indigo-600 border-indigo-400 hover:text-red-500"
              : "text-gray-400 border-gray-300"
          }`}
        >
          {content}
        </span>
      );
      blankIndex++;
      return element;
    }
    return <span key={`text-${i}`}>{part}</span>;
  });

  const handleExit = () => {
    setQuestions([]);
    setAnswers([]);
    setIndex(0);
    navigate('/');
  };

  return (
    <div className="h-screen flex items-center justify-center animate-fade-in bg-gray-50">
      <div className="w-full h-full bg-white rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col-reverse md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full flex flex-col md:w-1/5 md:border-r pr-4 py-2">
          <h2 className="text-lg font-bold text-gray-700 hidden md:block mb-4">
            Questions
          </h2>
          <ul className="md:space-y-2 flex flex-row md:flex-col overflow-x-auto items-center md:items-start flex-nowrap">
            {questions.map((_, i) => (
              <li
                key={i}
                className={`py-2 px-3 rounded-lg text-sm w-full font-semibold flex items-center justify-center md:justify-start gap-1 cursor-default transition-opacity duration-200 ${
                  i === index
                    ? "bg-indigo-100 text-indigo-700"
                    : i < index
                    ? "text-gray-400 opacity-60"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="hidden md:block">Question</span>
                {i + 1}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Q. {index + 1}
              </h1>
              <div className="flex items-center gap-2">
                <Timer duration={30} resetSignal={resetSignal} onTimeout={handleNext} />
                <IoExitOutline size={30} onClick={handleExit} className="text-red-600 cursor-pointer hover:opacity-60"/>

              </div>
            </div>

            <p className="text-xl sm:text-2xl font-medium text-gray-700 leading-relaxed mb-6">
              {sentenceJSX}
            </p>

            <span className="font-bold opacity-70">Write the words in the correct order to form the complete sentence.</span>

            <div className="grid mt-10 grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {current.options.map((word) => (
                <button
                  key={word}
                  onClick={() => handleSelect(word)}
                  disabled={selected.includes(word)}
                  className={`transition-all cursor-pointer duration-200 px-4 py-2 rounded-xl shadow-md font-semibold text-sm sm:text-base border-2 border-indigo-200 hover:bg-indigo-50 active:scale-95 ${
                    selected.includes(word)
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={selected.includes(null)}
              className="transition-all duration-300 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceGame;
