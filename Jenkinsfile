pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check for app.js changes') {
            steps {
                script {
                    def appJsChanged = false
                    def changes = currentBuild.changeSets

                    for (changeSet in changes) {
                        for (entry in changeSet.items) {
                            for (file in entry.affectedFiles) {
                                if (file.path == 'app.js') {
                                    appJsChanged = true
                                    break
                                }
                            }
                            if (appJsChanged) {
                                break
                            }
                        }
                        if (appJsChanged) {
                            break
                        }
                    }

                    if (!appJsChanged) {
                        echo "No changes in app.js, skipping Docker Compose steps."
                        currentBuild.result = 'SUCCESS'
                        return
                    }
                }
            }
        }

        stage('Docker Compose Up') {
            when {
                expression {
                    def appJsChanged = false
                    def changes = currentBuild.changeSets

                    for (changeSet in changes) {
                        for (entry in changeSet.items) {
                            for (file in entry.affectedFiles) {
                                if (file.path == 'app.js') {
                                    appJsChanged = true
                                    break
                                }
                            }
                            if (appJsChanged) {
                                break
                            }
                        }
                        if (appJsChanged) {
                            break
                        }
                    }

                    return appJsChanged
                }
            }
            steps {
                script {
                    def isDockerComposeRunning = sh(script: 'docker-compose ps -q', returnStatus: true) == 0

                    if (isDockerComposeRunning) {
                        echo "Docker Compose is already running, restarting services."
                        sh 'docker-compose restart'
                    } else {
                        echo "Docker Compose is not running, starting services."
                        sh 'docker-compose up --build -d'
                    }
                }
            }
        }
    }
}
