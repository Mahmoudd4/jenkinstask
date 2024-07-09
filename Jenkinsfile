pipeline {
    agent any

    stages {
        stage('Check Docker-Compose Status') {
            steps {
                script {
                    // Check if docker-compose containers are running
                    def isComposeRunning = sh(script: 'docker ps --filter "name=jenkinstask_" --format "{{.ID}}" | wc -l', returnStdout: true).trim()
                    if (isComposeRunning.toInteger() > 0) {
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
