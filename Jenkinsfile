pipeline {
    agent any

    stages {
        stage('Cloning Git') {
            steps {
                git url: 'https://github.com/BalipalliGayathri/Angular-app.git'
            }
        }
        stage('Build') {
            withNode(nodejs : 'NodeJS_10_9_0')
            steps {
                sh 'npm install node-sass'
                sh 'npm install -g @angular/cli'
                sh 'ng build --prod'
            }
        }
    }
} 
