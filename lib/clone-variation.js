var fs = require('fs');
module.exports = function(variation, directory){
    var dirname =
    (directory || "") +
    variation.experiment_id +
    "/" + variation.id + "/";
    try{
        fs.mkdirSync(dirname);
    }catch(e){

    }
    console.log("DIRNAME", dirname)
    fs.writeFileSync(
        dirname +
        "js_component.js",
        variation.js_component
    );
    delete variation.js_component;
    fs.writeFileSync(
        dirname +
        "variation.js",
        variation ? JSON.stringify(variation, null, "    ") : ""
    );
}