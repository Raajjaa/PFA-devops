pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Raajjaa/PFA-devops.git'
            }
        }

        stage('Install & Lint Frontend') {
            steps {
                dir('front') {
                    bat 'npm install'
                    bat 'npx eslint -f checkstyle . -o eslint-front-report.xml'
                }
            }
        }

        stage('Install & Lint Backend') {
            steps {
                dir('back') {
                    bat 'npm install'
                    bat 'npx eslint -f checkstyle . -o eslint-back-report.xml'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('front') {
                    bat 'npm test -- --coverage'  // Exécuter les tests frontend avec couverture
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('back') {
                    bat 'npm test -- --coverage'  // Exécuter les tests backend avec couverture
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    bat 'docker build -t raajjaa/front-app ./front'
                    bat 'docker build -t raajjaa/back-app ./back'
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    bat "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    bat 'docker push raajjaa/front-app'
                    bat 'docker push raajjaa/back-app'
                }
            }
        }
    }

    post {
        always {
            // Enregistrer les problèmes ESLint
            recordIssues tools: [
                checkStyle(pattern: '**/front/eslint-front-report.xml'),
                checkStyle(pattern: '**/back/eslint-back-report.xml')
            ]
        }
    }
}
