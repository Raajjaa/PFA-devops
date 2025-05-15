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

        stage('Docker Build') {
            steps {
                script {
                    bat 'docker build -t front ./front-ecommerce-main'
                    bat 'docker build -t /back ./back-ecommerce-main'
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    bat "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    bat 'docker push front'
                    bat 'docker push back'
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
