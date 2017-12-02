const {getLatestTask, loadData, runTask} = require('./helpers');

const task = process.argv[2] || getLatestTask();
const input = loadData(task);

runTask(task, 'A', input);
runTask(task, 'B', input);
