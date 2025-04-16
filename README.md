# QuizMaster

Welcome to **QuizMaster**, a sleek and interactive sentence-building quiz application built with modern web technologies like React, TypeScript, TailwindCSS, and Vite. This app provides a clean and user-friendly interface for constructing sentences using drag-and-drop style selections with a live timer and dynamic result evaluation.

## 🚀 Live Demo

Check out the live site: https://quiz-master-ex7y.onrender.com/

## Features

- ⚛️ **React + TypeScript**: For a robust and type-safe codebase
- ⚡ **Vite**: Super fast development and build tool
- 🎨 **Tailwind CSS**: Utility-first modern styling
- 🧠 **Interactive Sentence Construction**: Choose words to complete a sentence
- ⏱️ **30-second Timer**: Automatically moves to the next question when time runs out
- 📊 **Live Score Result Page**: Tracks correct/incorrect answers with final score
- 🔁 **State Persistence**: Uses `localStorage` to preserve quiz state on refresh
- 📱 **Responsive UI**: Optimized for all screen sizes
- 🎯 **Result Evaluation**: Highlights your answer vs. the correct one at the end

---
## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Custom hooks & context
- Optional: shadcn/ui for beautiful UI elements

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quiz-master.git
   cd quiz-master
   
2. Install dependencies
    ```bash
    npm install
    ```
3. Start the development server
    ```bash
    npm run dev
    ```
4. Start the Json server
   ```bash
    npx json-server --watch src/data/db.json --port 3000
    ```

## Usage

Visit `http://localhost:5173` to see the application in action.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
