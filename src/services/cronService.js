const cron = require("node-cron");

const runEvery5secTask = () => {
  const task = cron.schedule("5 * * * * *", () => {
    console.log("running a task every minute at the 5th second");
  });
  try {
    task.start();
  } catch (err) {
    task.stop();
  }
};

module.exports = {
  runEvery5secTask,
};
