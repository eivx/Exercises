module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: "plugin:prettier/recommended",
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
