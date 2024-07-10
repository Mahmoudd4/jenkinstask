pipeline {
    agent any

    //triggers {
        // Trigger the pipeline when changes are pushed to the repository
      //  pollSCM('* * * * *')
    //}

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the repository
                checkout scm
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Run Docker Compose up with the --build option
                    sh 'docker-compose down' // Stop any running containers to ensure a clean start
                    sh 'docker-compose up --build -d' // Build and start the containers in detached mode
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
