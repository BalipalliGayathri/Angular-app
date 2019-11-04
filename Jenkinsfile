pipeline {
    agent any

    stages {
        stage('Cloning Git') {
            steps {
                git 'https://github.com/gustavoapolinario/node-todo-frontend'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
} 
