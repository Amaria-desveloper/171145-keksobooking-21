const path = require("path");

module.exports = {
  entry: [
    "./js/constants.js",
    "./js/variables.js",
    "./js/util.js",
    "./js/filter.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/notices.js",
    "./js/backend.js",
    "./js/form.js",
    "./js/validateForm.js",
    "./js/dragPinMain.js",
    "./js/map.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
