@echo off
chcp 65001 >nul
rem Double-click to start History River using the portable Node.js in ..\node
cd /d "%~dp0"
set "PATH=%~dp0..\node;%PATH%"
if not exist "%~dp0..\node\node.exe" (
  echo [錯誤] 找不到 ..\node\node.exe，可攜版 Node.js 不見了。
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo 第一次啟動，正在安裝套件...
  call npm install || (pause & exit /b 1)
)
echo 網頁啟動後，瀏覽器打開 http://localhost:5173
echo 要關閉請按 Ctrl+C 或直接關掉這個視窗。
start "" cmd /c "timeout /t 4 >nul & start http://localhost:5173"
call npm run dev
pause
