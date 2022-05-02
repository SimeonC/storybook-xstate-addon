module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  env: {
    esm: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
          },
        ],
      ],
    },
  },
};
