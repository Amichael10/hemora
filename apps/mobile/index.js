/**
 * Local Metro entry (monorepo / pnpm): avoids broken resolution when `main` points
 * directly at `expo-router/entry` (web dev 500 + JSON MIME on entry.bundle).
 * @see https://github.com/expo/expo/issues/29139
 */
import "expo-router/entry";
