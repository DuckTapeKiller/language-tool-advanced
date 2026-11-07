import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";
import { globalIgnores } from "eslint/config";

export default tseslint.config(
    {
        languageOptions: {
            parserOptions: {
                projectService: { allowDefaultProject: ["*.mjs", "manifest.json", "package.json"] },
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: [".json"],
            },
        },
    },
    ...obsidianmd.configs.recommended,
    {
        // Sentence case in UI text. Names the rule does not know are added to the words it
        // leaves alone; its own lists of brands and acronyms stay as they are.
        files: ["**/*.ts"],
        rules: {
            "obsidianmd/ui/sentence-case": [
                "warn",
                { ignoreWords: ["DuckTapeKiller", "Ko-fi", "Spanish", "MB"] },
            ],
        },
    },
    { files: ["**/*.mjs"], ...tseslint.configs.disableTypeChecked },
    // Only the committed bundle is excluded; everything else is linted
    globalIgnores(["node_modules", "main.js"]),
);
