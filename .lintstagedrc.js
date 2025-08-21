import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

const buildEslintFixCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;

const lintStageConfig = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildEslintFixCommand, buildPrettierCommand],
};

export default lintStageConfig;
