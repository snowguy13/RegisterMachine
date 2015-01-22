System.config({
  "paths": {
    "*": "*.js",
    "app": "react-components/build/app.js",
    "github:*": "jspm-packages/github/*.js",
    "npm:*": "jspm-packages/npm/*.js",
    "react": "jspm-packages/github/facebook/react.js",
    "react:*": "react-components/build/*.js",
  }
});

System.config({
  "map": {
    "jquery": "github:components/jquery@^2.1.1"
  }
});

System.config({
  "versions": {
    "github:components/jquery": "2.1.1"
  }
});

