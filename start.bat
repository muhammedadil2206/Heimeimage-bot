@echo off
echo Starting Backend and Frontend...
start "Backend Server" cmd /k "cd server && npm run dev"
timeout /t 2 /nobreak >nul
start "Frontend Server" cmd /k "cd client && npm run dev"
echo.
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause

