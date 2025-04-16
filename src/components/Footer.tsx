const Footer = () => {
  return (
    <footer className="text-gray-600 flex items-center justify-between text-sm flex-col md:flex-row p-4 md:p-8 mt-12 w-full text-center">
      <p className="opacity-70">&copy; 2025 QuizMaster. All rights reserved.</p>
      <div className="space-x-6 mt-4">
        <a
          href="mailto:rohanbabbar2003@gmail.com"
          className="opacity-70 font-medium hover:opacity-100 transition"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/rohan-babbar-039512239"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 font-medium hover:opacity-100 transition"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/rohanbabbar983"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 font-medium hover:opacity-100 transition"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
