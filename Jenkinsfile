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
                dir('front-ecommerce-main') {
                   bat 'npm install eslint@8.56.0 --save-dev --legacy-peer-deps'

                    bat 'npx eslint -f checkstyle . -o eslint-front-report.xml'
                }
            }
        }

        stage('Install & Lint Backend') {
            steps {
                dir('back-ecommerce-main') {
                    bat 'npm install'
                    bat 'npx eslint -f checkstyle . -o eslint-back-report.xml'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('front-ecommerce-main') {
                    bat 'npm test -- --coverage'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('back-ecommerce-main') {
                    bat 'npm test -- --coverage'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    bat 'docker build -t raajjaa/front-app ./front-ecommerce-main'
                    bat 'docker build -t raajjaa/back-app ./back-ecommerce-main'
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
            recordIssues tools: [
                checkStyle(pattern: '**/front-ecommerce-main/eslint-front-report.xml'),
                checkStyle(pattern: '**/back-ecommerce-main/eslint-back-report.xml')
            ]
        }
    }
}
