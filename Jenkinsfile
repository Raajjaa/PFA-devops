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
                    sh 'docker build -t raajjaa/front-app ./front'
                    sh 'docker build -t raajjaa/back-app ./back'
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    sh 'docker push raajjaa/front-app'
                    sh 'docker push raajjaa/back-app'
                }
            }
        }
    }
}
