param(
    [int]$IntervalSeconds = 10,
    [switch]$RunOnce
)

$repoRoot = (Get-Item $PSScriptRoot).Parent.FullName
Set-Location $repoRoot

function Ensure-GitIdentity {
    $gitUser = git config user.name
    if ([string]::IsNullOrWhiteSpace($gitUser)) {
        git config user.name "VS Code Auto Sync"
    }

    $gitEmail = git config user.email
    if ([string]::IsNullOrWhiteSpace($gitEmail)) {
        git config user.email "auto-sync@local"
    }
}

function Sync-ToGitHub {
    $status = git status --porcelain
    if ([string]::IsNullOrWhiteSpace($status)) {
        Write-Host "No local changes to sync."
        return
    }

    git add .

    $branch = git branch --show-current
    if ([string]::IsNullOrWhiteSpace($branch)) {
        $branch = "main"
    }

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto-sync from VS Code at $timestamp"
    git push origin $branch

    Write-Host "Changes synced to GitHub on $branch."
}

try {
    Ensure-GitIdentity

    if ($RunOnce) {
        Sync-ToGitHub
        return
    }

    Write-Host "Watching for changes in $repoRoot. Press Ctrl+C to stop."

    while ($true) {
        try {
            Sync-ToGitHub
        }
        catch {
            Write-Warning $_.Exception.Message
        }

        Start-Sleep -Seconds $IntervalSeconds
    }
}
catch {
    Write-Error $_.Exception.Message
    exit 1
}
