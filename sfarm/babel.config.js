module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": ".",
            "@assets": "./assets",
            "@screens": "./src/screens",
            "@components": "./src/components",
          },
        },
      ],
    ],
  };
};
