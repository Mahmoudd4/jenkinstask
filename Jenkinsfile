pipeline {
    agent any

    stages {
        stage('Check Docker-Compose Status') {
            steps {
                script {
                    def composeStatus = sh(script: 'docker-compose ps -q', returnStatus: true).exitCode
                    if (composeStatus == 0) {
                        echo 'Docker Compose is up'
                        // Check for changes in app.js
                        def changes = sh(script: 'git diff --name-only HEAD^ HEAD', returnStdout: true).trim()
                        if (changes.contains('app.js')) {
                            echo 'Changes detected in app.js'
                            // Stop and rebuild docker-compose
                            sh 'docker-compose down'
                            sh 'docker-compose up --build -d'
                        } else {
                            echo 'No changes in app.js, skipping docker-compose actions'
                        }
                    } else {
                        echo 'Docker Compose is down'
                        // Start docker-compose
                        sh 'docker-compose up --build -d'
                    }
                }
            }
        }
    }
}
