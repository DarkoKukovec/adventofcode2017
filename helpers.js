const fs = require('fs');
const path = require('path');


function isDirectory(source) {
  return fs.lstatSync(source).isDirectory();
}

function getDirectories(source) {
  return fs.readdirSync(source)
    .filter((name) => isDirectory(path.join(source, name)));
}

module.exports = {
  loadData(task) {
    const dataPath = path.join(__dirname, 'tasks', task.toString(), 'input.txt');
    return fs.readFileSync(dataPath, 'utf-8');
  },

  getLatestTask() {
    return getDirectories(path.join(__dirname, 'tasks'))
      .map(Number)
      .sort((a, b) => a - b)
      .pop();
  },

  runTask(taskNumber, variant, input) {
    const taskPath = path.join(__dirname, 'tasks', taskNumber.toString(), `${variant}.js`);
    if (fs.existsSync(taskPath)) {
      const task = require(taskPath);
      console.log(`Task ${taskNumber}${variant} result:`, task(input));
    }
  }
};
