const fs = require('fs');
const path = require('path');

module.exports = {
  loadData(task, variation = '') {
    const dataPath = path.join(__dirname, 'tasks', `${task}${variation}.input.txt`);
    return fs.readFileSync(dataPath, 'utf-8');
  }
};
