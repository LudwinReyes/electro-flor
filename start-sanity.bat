@echo off
echo 🚀 Iniciando Sanity Studio con Node.js 24...

cd sanity

docker run -it --rm ^
  -v "%CD%:/app" ^
  -w /app ^
  -p 3333:3333 ^
  node:24-alpine ^
  sh -c "npm install -g sanity && sanity dev --host 0.0.0.0"

echo ✅ Sanity Studio cerrado
pause
