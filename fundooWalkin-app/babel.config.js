module.exports = {
  presets: ['module:metro-react-native-babel-preset',"module:react-native-dotenv"],
 

  plugins: [
    "react-native-classname-to-style",
    [
      "react-native-platform-specific-extensions",
      {
        "extensions": ["less"]
      }
    ],
    ["transform-inline-environment-variables", {
      "include": [
        "NODE_ENV"
      ]
    }]
  ]

};
