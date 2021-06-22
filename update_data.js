const fs = require('fs');
var path = "static/assets/img/creative";
var tree = {};

fs.readdirSync(path).forEach(file => {
    if (fs.lstatSync(path + "/" + file).isDirectory()) {
        path2 = path + "/" + file;
        tree[file] = [];
        fs.readdirSync(path2).forEach(file2 => {
            if (fs.lstatSync(path2 + "/" + file2).isFile()) {
                tree[file].push(file2);
            }
        });
    }
});
console.log(tree);
var data = JSON.stringify(tree);
fs.writeFileSync('data/creatives.json', data);