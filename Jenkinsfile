pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
    DOCKER_IMAGE = "vedantoncloud/myapp"
    STAGING_HOST = 'STAGING_IP_OR_HOST'        // <-- replace later with VPS IP
    STAGING_SSH = 'staging-ssh'
  }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Install') { steps { sh 'npm install' } }

    stage('Unit Test') {
      steps {
        sh '''
          node app.js & sleep 2
          npm run test
        '''
      }
    }

    stage('Docker Build & Push') {
      steps {
        script {
          docker.withRegistry('', "${DOCKERHUB_CREDENTIALS}") {
            def img = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
            img.push()
            img.push('latest')
          }
        }
      }
    }

    stage('Deploy to Staging') {
      steps {
        sshagent([STAGING_SSH]) {
          sh """
            scp docker-compose.yml ubuntu@${STAGING_HOST}:/home/ubuntu/docker-compose.yml
            ssh ubuntu@${STAGING_HOST} 'docker pull ${DOCKER_IMAGE}:latest || true'
            ssh ubuntu@${STAGING_HOST} 'docker-compose -f /home/ubuntu/docker-compose.yml up -d --remove-orphans'
          """
        }
      }
    }

    stage('Approval') {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          input message: "Approve deployment to PRODUCTION?"
        }
      }
    }

    stage('Deploy to Production') {
      steps {
        sshagent([STAGING_SSH]) {
          sh """
            ssh ubuntu@${STAGING_HOST} 'docker pull ${DOCKER_IMAGE}:latest || true'
            ssh ubuntu@${STAGING_HOST} 'docker-compose -f /home/ubuntu/docker-compose.yml up -d --remove-orphans'
          """
        }
      }
    }
  }

  post {
    success { echo "Pipeline succeeded" }
    failure { echo "Pipeline failed" }
  }
}
