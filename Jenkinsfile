pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "vedantoncloud/myapp"
    // If you add a Render hook credential in Jenkins, set its ID as 'render-hook' and uncomment the next line
    // RENDER_HOOK = credentials('render-hook')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        powershell label: 'npm ci', script: '''
          Write-Output "Installing dependencies..."
          npm ci
        '''
      }
    }

    stage('Run health check') {
      steps {
        powershell label: 'start app & test health', script: '''
          Write-Output "Starting node app in background..."
          $proc = Start-Process -FilePath "node" -ArgumentList "app.js" -PassThru
          Start-Sleep -Seconds 2
          try {
            $resp = Invoke-RestMethod -Uri "http://localhost:3000/health" -UseBasicParsing -TimeoutSec 5
            Write-Output "Health response: $resp"
          } catch {
            Write-Error "Health check failed: $_"
            Exit 1
          } finally {
            if ($proc -and -not $proc.HasExited) {
              Stop-Process -Id $proc.Id -Force
            }
          }
        '''
      }
    }

    stage('Docker Build & Push (optional)') {
      when { expression { return env.BUILD_DOCKER == 'true' } }
      steps {
        powershell label: 'docker build & push', script: '''
          Write-Output "Building docker image..."
          docker build -t $env:DOCKER_IMAGE:$env:BUILD_NUMBER .
          docker tag $env:DOCKER_IMAGE:$env:BUILD_NUMBER $env:DOCKER_IMAGE:latest
          Write-Output "Docker build done (push requires Docker Hub credentials)."
        '''
      }
    }

    stage('Trigger Render (optional)') {
      when { expression { return env.RENDER_HOOK != null && env.RENDER_HOOK != '' } }
      steps {
        powershell label: 'trigger render', script: '''
          Write-Output "Calling Render deploy hook..."
          Invoke-RestMethod -Uri "$env:RENDER_HOOK" -Method Get
        '''
      }
    }
  }

  post {
    success { echo "Pipeline SUCCESS" }
    failure { echo "Pipeline FAILED" }
  }
}
