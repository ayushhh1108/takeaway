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
    // Add rules to ignore specific errors and warnings
    "react/no-unescaped-entities": "off", // Ignore unescaped entities like ' and "
    "react/jsx-key": "off", // Ignore missing key in lists
    "react/prop-types": "off", // Ignore prop-types validation warnings
    "no-unused-vars": "off", // Ignore unused variable warnings
    "no-undef": "off", // Ignore undefined variable errors
    "react/react-in-jsx-scope": "off", // Ignore missing React import in scope
  },
};
