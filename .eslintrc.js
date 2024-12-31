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
    // Disable all validations
    "react/no-unescaped-entities": "off",
    "react/jsx-key": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-empty": "off",
    "no-irregular-whitespace": "off",
    "no-redeclare": "off",
    "no-extra-semi": "off",
    "react/display-name": "off",
    "react/forbid-prop-types": "off",
    "react/no-direct-mutation-state": "off",
    "react/no-typos": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-no-duplicate-props": "off",
    "react/jsx-no-literals": "off",
    "react/jsx-no-target-blank": "off",
    "react/no-danger": "off",
  },
};
