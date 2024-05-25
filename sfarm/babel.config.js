module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@context": "./src/context",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@": ".",
          },
        },
      ],
    ],
  };
};
