const mongoose = require("mongoose");
const Task = require("./taskSchema");

const quizSchema = new mongoose.Schema({
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  taskDetails: {
    scoreThreshold: Number,
    pointsPerQuestion: Number,
    coinsPerQuestion: Number,
    timeLimit: Number,
    waterLevelDeduction: Number,
  },
});

const choiceSchema = new mongoose.Schema({
  scenarios: [
    {
      scenario: String,
      options: [
        {
          choice: String,
          score: Number,
          coins: Number,
          outcomeText: String,
        },
      ],
    },
  ],
  taskDetails: {
    scoreThreshold: Number,
    waterLevelDeduction: Number,
    maxPoints: Number,
    waterLevelIncrease: Number,
  },
});

const puzzleSchema = new mongoose.Schema({
  crosswordGrid: {
    size: [Number],
    clues: [
      {
        direction: String,
        position: [Number],
        clue: String,
        answer: String,
      },
    ],
    hints: [
      {
        hint: String,
      },
    ],
  },
  taskDetails: {
    scoreThreshold: Number,
    pointsPerCorrectAnswer: Number,
    coinsPerCorrectAnswer: Number,
    maxAttempts: Number,
    waterLevelDeduction: Number,
    bonusForCompletion: Number,
  },
  feedback: {
    correct: String,
    incorrect: String,
    completion: String,
  },
});

const Quiz = Task.discriminator("Quiz", quizSchema);
const Choice = Task.discriminator("Choice", choiceSchema);
const Puzzle = Task.discriminator("Puzzle", puzzleSchema);

module.exports = { Task, Quiz, Choice, Puzzle };
