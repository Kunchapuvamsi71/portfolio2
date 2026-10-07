class LMSEngine {
    constructor() {
        self.courses = [
            {
                id: "course-101",
                title: "Artificial Intelligence & Machine Learning Fundamentals",
                modules: 8,
                duration: "12 Hours",
                quizzes: [
                    { question: "What is Supervised Learning?", options: ["Training with labeled data", "Training without labels", "Random clustering"], answer: 0 }
                ]
            },
            {
                id: "course-102",
                title: "Full-Stack Web Engineering with React & Python",
                modules: 10,
                duration: "16 Hours",
                quizzes: [
                    { question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useContext"], answer: 1 }
                ]
            }
        ];
    }

    getCourses() {
        return self.courses;
    }

    evaluateQuiz(userAnswers, correctAnswers) {
        let score = 0;
        userAnswers.forEach((ans, idx) => {
            if (ans === correctAnswers[idx]) score++;
        });
        const pct = Math.round((score / correctAnswers.length) * 100);
        return {
            score: score,
            total: correctAnswers.length,
            percentage: pct,
            status: pct >= 70 ? "PASSED" : "NEEDS REVISION"
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LMSEngine;
}
