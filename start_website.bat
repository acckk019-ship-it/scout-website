@echo off
echo Starting Al-Salam Scouts Website Server...
echo Please wait for the browser to open.
cd /d "%~dp0"
start "" http://localhost:8081
node server.js
pause
