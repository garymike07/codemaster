$ErrorActionPreference = "Stop"

Set-Location -Path $PSScriptRoot

if (-not (Get-Command bun -ErrorAction SilentlyContinue)) {
  Write-Error "Bun is not installed or not on PATH. Install it from https://bun.sh and try again."
}

function Test-ConvexBackendHealthy {
  param(
    [string]$Url = "http://127.0.0.1:3212/"
  )

  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 3
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  } catch {
    return $false
  }
}

$convexUrl = "http://127.0.0.1:3212/"
$convexPort = 3212
$convexHealthy = Test-ConvexBackendHealthy -Url $convexUrl
$portListener = Get-NetTCPConnection -LocalPort $convexPort -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1

Write-Host ""
Write-Host "CodeMaster local development"
Write-Host "Project root: $PSScriptRoot"
Write-Host ""

if ($convexHealthy) {
  Write-Host "Convex backend is already healthy at $convexUrl"
  Write-Host "Starting Vite frontend only and reusing the running backend..."
  Write-Host ""
  bun run dev:vite
} elseif ($portListener) {
  $processName = "unknown"

  try {
    $processName = (Get-Process -Id $portListener.OwningProcess -ErrorAction Stop).ProcessName
  } catch {
    $processName = "unknown"
  }

  Write-Host "Port $convexPort is already in use by PID $($portListener.OwningProcess) ($processName), but Convex is not responding at $convexUrl" -ForegroundColor Yellow
  Write-Host "Stop the conflicting process and run this script again." -ForegroundColor Yellow
  exit 1
} else {
  Write-Host "No healthy Convex backend detected at $convexUrl"
  Write-Host "Starting Vite frontend and Convex backend..."
  Write-Host ""
  bun run dev
}
