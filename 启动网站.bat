@echo off
chcp 65001 >nul
echo ========================================
echo   胡铭航作品集网站 - 启动脚本
echo ========================================
echo.
echo 正在启动开发服务器...
echo.
cd /d "%~dp0"
echo 启动命令：npm run dev
echo.
echo 服务器启动后，请在浏览器中访问：
echo   http://localhost:3000/
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.
npm run dev
pause