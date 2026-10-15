import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

// Config base de análisis estático para el gate de CI (SAST básico).
export default tseslint.config(
  { ignores: ['dist', 'dist-ssr', 'node_modules', '.vercel'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Enlaces internos: usar components/ui/LocalizedLink, que mantiene el
      // idioma de la página (/en/...).
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-router-dom',
              importNames: ['Link', 'NavLink'],
              message: 'Usa Link/NavLink de components/ui/LocalizedLink.',
            },
          ],
        },
      ],
    },
  },
);
