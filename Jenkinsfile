pipeline {
    agent any

    stages {
        stage('Check Directory') {
            steps {
                script {
                    echo "Current directory: ${pwd()}"
                }
            }
        }

        stage('Check Changes in app.js') {
            steps {
                script {
                    // Check if there are changes in app.js in the last commit
                    def changes = sh(script: 'git diff-tree --no-commit-id --name-only -r HEAD | grep app.js', returnStatus: true) == 0
                    if (changes) {
                        echo 'Changes detected in app.js'
                        env.CHANGES_IN_APP_JS = 'true'
                    } else {
                        echo 'No changes detected in app.js'
                        env.CHANGES_IN_APP_JS = 'false'
                    }
                }
            }
        }

        stage('Manage Docker Compose') {
            steps {
                script {
                    // Check if Docker Compose services are running
                    def dockerComposePs = sh(script: 'docker-compose ps -q', returnStatus: true).trim()
                    if (dockerComposePs == 0) {
                        echo 'Docker Compose services are running.'
                        if (env.CHANGES_IN_APP_JS == 'true') {
                            echo 'Changes detected in app.js, restarting Docker Compose services...'
                            sh 'docker-compose down'
                            sh 'docker-compose up --build -d'
                        } else {
                            echo 'No changes in app.js, Docker Compose services are running normally.'
                        }
                    } else {
                        echo 'Docker Compose services are not running. Starting services...'
                        sh 'docker-compose up --build -d'
                    }
                }
            }
        }
    }
}
