const { getDefaultConfig } = require("expo/metro-config");
const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

/** `@solar-icons/react-native` ships `.mjs` chunks; Metro must resolve them (see Bold.mjs → …/Tuning2.mjs). */
config.resolver.sourceExts = [...new Set([...config.resolver.sourceExts, "mjs"])];

config.watchFolders = [workspaceRoot];
config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

/**
 * Root hoisted `semver` is often v6 (no `functions/satisfies`). Reanimated ships semver v7
 * nested under its package — Metro must resolve `semver` there or bundling fails with HTTP 500.
 */
function resolveSemver7() {
  const candidates = [
    path.join(workspaceRoot, "node_modules/react-native-reanimated/node_modules/semver"),
    path.join(projectRoot, "node_modules/react-native-reanimated/node_modules/semver"),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "functions/satisfies.js"))) return dir;
  }
  return path.join(workspaceRoot, "node_modules/semver");
}

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  semver: resolveSemver7(),
};

module.exports = config;
