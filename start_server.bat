@echo off
title Babylon's Wine — Study Library Server
echo.
echo  ================================================
echo   Babylon's Wine — Bible Prophecy Study Library
echo   Local Web Server
echo  ================================================
echo.

:: Try Python 3 first
where python >nul 2>&1
if %errorlevel% == 0 (
    echo  Starting server with Python...
    echo  Open your browser and go to:
    echo.
    echo    http://localhost:3030
    echo.
    echo  Press Ctrl+C to stop the server.
    echo.
    python -m http.server 3030
    goto :done
)

:: Try py launcher (Python 3 on some Windows installs)
where py >nul 2>&1
if %errorlevel% == 0 (
    echo  Starting server with Python...
    echo  Open your browser and go to:
    echo.
    echo    http://localhost:3030
    echo.
    echo  Press Ctrl+C to stop the server.
    echo.
    py -m http.server 3030
    goto :done
)

:: Try Node.js http-server
where npx >nul 2>&1
if %errorlevel% == 0 (
    echo  Starting server with Node.js / npx http-server...
    echo  Open your browser and go to:
    echo.
    echo    http://localhost:3030
    echo.
    echo  Press Ctrl+C to stop the server.
    echo.
    npx http-server -p 3030 -o
    goto :done
)

:: Nothing found
echo  ERROR: No suitable server found.
echo.
echo  Please install one of the following:
echo   - Python (https://python.org) — recommended
echo   - Node.js (https://nodejs.org)
echo.
echo  Alternatively, open this folder in VS Code and use
echo  the "Live Server" extension (right-click index.html).
echo.
pause
exit /b 1

:done
pause
