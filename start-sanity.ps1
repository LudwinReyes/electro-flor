# Script para iniciar Sanity Studio con Node.js 24 (Docker)
# Ejecutar: .\start-sanity.ps1

Write-Host "🚀 Iniciando Sanity Studio con Node.js 24..." -ForegroundColor Green

# Cambiar al directorio sanity
Set-Location sanity

# Ejecutar Sanity Studio usando Docker con Node 24
docker run -it --rm `
  -v "${PWD}:/app" `
  -w /app `
  -p 3333:3333 `
  node:24-alpine `
  sh -c "npm install -g sanity && sanity dev --host 0.0.0.0"

Write-Host "✅ Sanity Studio cerrado" -ForegroundColor Green
