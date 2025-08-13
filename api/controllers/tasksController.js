const { BadRequest, NotFound } = require("../errors/index");
const { Quiz, Puzzle, Choice } = require("../models/gamesSchema");
const createTasks = async (req, res) => {
  const { gameId } = req.params;
  if (!gameId) {
    throw new BadRequest("Game Id is not present");
  }
  let tasks;
  switch (gameId) {
    case "quiz": {
      tasks = await Quiz.create(req.body);
      break;
    }
    case "choice": {
      tasks = await Choice.create(req.body);
      break;
    }
    case "puzzle": {
      tasks = await Puzzle.create(req.body);
      break;
    }
    default: {
      throw new BadRequest("Invalid Game Id");
    }
  }
  return res.status(201).json({ data: tasks, msg: "Created Successfully" });
};
const getTasks = async (req, res) => {
  const { element, level, type } = req.query;
  if (!element || !level || !type) {
    throw new BadRequest("Element, Level, and Type are required.");
  }
  let tasks;
  switch (type) {
    case "quiz":
      tasks = await Quiz.find({ element, level });
      break;
    case "choice":
      tasks = await Choice.find({ element, level });
      break;
    case "puzzle":
      tasks = await Puzzle.find({ element, level });
      break;
    default:
      throw new BadRequest("Invalid Type!");
  }
  return res.status(200).json({ data: tasks, msg: "Successfully Received!" });
};

module.exports = { createTasks, getTasks };
