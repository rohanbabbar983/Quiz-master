import { useNavigate } from "react-router-dom";
import bannerBg from "../assets/banner-background.webp";
import Footer from "../components/Footer";
import { RxArrowTopRight } from "react-icons/rx";
import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Question } from "../types/question";

const LandingPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useLocalStorage<Question[]>(
    "questions",
    []
  );
  const [answers, setAnswers] = useLocalStorage<string[][]>("answers", []);
  const [index, setIndex] = useLocalStorage("index", 0);

  useEffect(() => {
    setQuestions([]);
    setAnswers([]);
    setIndex(0);
  }, []);

  return (
    <div
      className="min-h-screen relative bg-cover bg-center flex flex-col items-center justify-center font-sans px-4 text-black"
      style={{
        backgroundImage: `url(${bannerBg})`,
      }}
    >
      {/* Glassy container */}
      <div className=" p-10 text-center">
        {/* Header */}
        <header className="py-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to <span className="text-indigo-600">QuizMaster</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Test your knowledge with a sleek and interactive quiz experience.
          </p>
        </header>

        {/* Start Button */}
        <div className="md:mt-2 flex items-center justify-center">
          <button
            onClick={() => navigate("/quiz")}
            className=" text-black border-b border-indigo-400 px-6 py-3 flex items-center rounded-full gap-1 text-base font-medium cursor-pointer shadow-md hover:opacity-80 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Start Now
            <RxArrowTopRight className="pt-1" size={25} />
          </button>
        </div>
      </div>
      <div className="absolute w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
