const fs = require('fs-extra');
const path = require('path');

const root = path.resolve(__dirname, '..');
const buildPath = path.join(root, 'build');

// Cleanup
fs.emptyDirSync(buildPath);

// Copy React build
// fs.copySync(path.join(root, 'packages/client/build'), path.join(buildPath, 'client'));

// // Copy server folder
// fs.copySync(path.join(root, 'packages/server'), path.join(buildPath, 'server'), {
//   filter: src => !src.includes('node_modules') // exclude node_modules
// });

// Copy package files for deployment
['package.json', 'package-lock.json'].forEach(file => {
  const filePath = path.join(root, file);
  if (fs.existsSync(filePath)) {
    fs.copySync(filePath, path.join(buildPath, file));
  }
});

console.log('✅ Build complete at /build');
