module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // Add this to support Jest testing.
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  globals: {
    module: "readonly", // Define `module` as a global variable.
    React: "readonly", // Ensure React is globally recognized.
    Razorpay: "readonly",
    test: "readonly", // Add Jest's global `test`.
    expect: "readonly", // Add Jest's global `expect`.
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version.
    },
  },
  rules: {
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off", // Not needed for React 17+ with new JSX transform.
  },
};
