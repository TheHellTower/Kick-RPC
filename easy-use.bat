@echo off
Title Kick-RPC
cls
color a

:ask
Title Kick-RPC - Home
echo 1) Install modules
echo 2) Launch
echo 3) Exit
set /p choice=What do u want? (1/2/3):
 
if /I "%choice%"=="1" (goto :Install)
if /I "%choice%"=="2" (goto :Launch)
if /I "%choice%"=="3" (goto :End)
goto ask
 
:Install
Title Kick-RPC - Installation
cls
npm i
echo Finished!
timeout 3
goto ask
 
:Launch
Title Kick-RPC - Started
cls
npm start
timeout 3
goto Launch

:End
exit