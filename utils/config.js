var bower = require("bower");
var path = require("path");
var fs = require("fs");

var argv = require("minimist")(process.argv.slice(2));

var config = {};

module.exports = function() {
    if (config && config.local) {
        return config;
    }

    config.bowerPackageFolder = bower.config.directory;

    config.local = require(path.join(process.cwd(), "ux.json"));
    config.open = argv.open;
    config.tasks = argv._;

    var home = getUserHome();
    var globalConfigPath = path.join(home, ".ux-global.json");

    if (fs.existsSync(globalConfigPath)) {
        config.global = require(globalConfigPath);
    }
    
    var eslintConfigPath = path.join(process.cwd(), ".eslintrc.json");
    
    if(fs.existsSync(eslintConfigPath)) {
        config.eslint = require(eslintConfigPath);
    } else {
        config.eslint = {
            "extends": "@unumux/unumux"
        };
    }
    
    var stylelintConfigPath = path.join(process.cwd(), ".stylelintrc");
    
    if(fs.existsSync(stylelintConfigPath)) {
        config.stylelint = require(stylelintConfigPath);
    } else {
        config.stylelint = {
            "extends": "@unumux/stylelint-config-unumux"
        };
    }

    config.babel = loadBabelConfig();

    return config;
};

function getUserHome() {
    return process.env[(process.platform == "win32") ? "USERPROFILE" : "HOME"];
}

function loadBabelConfig() {
    var babelConfigPath = path.join(process.cwd(), ".babelrc");

    if(fs.existsSync(babelConfigPath)) {
        return JSON.parse(fs.readFileSync(babelConfigPath));
    } else {
        return {
            presets: [
                require("babel-preset-es2015"),
                require("babel-preset-react")
            ]
        };
    }
}