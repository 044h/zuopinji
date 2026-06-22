const fs = require('fs');
const path = require('path');

const jsContent = fs.readFileSync(path.join(__dirname, 'dist/assets/index-EsnYeYvE.js'), 'utf-8');

const assetPaths = jsContent.match(/["'][^"']+\.(png|jpg|jpeg|mp4)["']/g);
console.log('=== 所有资源路径 ===');
if (assetPaths) {
  assetPaths.forEach(r => console.log(r));
} else {
  console.log('没有找到资源路径');
}