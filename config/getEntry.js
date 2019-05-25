const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

const entriesConfig = [
    {
        entryName: 'main',
        entry: path.resolve(ROOT_PATH, '../src/module/MainModule/index.js')
    },
    {
        entryName: 'example',
        entry: path.resolve(ROOT_PATH, '../src/module/ExampleModule/index.js')
    },
];

module.exports = function () {
    let entries = {};
    entriesConfig.forEach(item => {
        entries[item.entryName] = item.entry;
    });

    return {entries, entriesConfig};
}