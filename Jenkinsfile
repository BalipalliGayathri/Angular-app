pipeline {
    agent any
     
    tools {
	      nodejs 'NodeJS 10.9.0' 
    }
    stages {
        stage('Cloning Git') {
            steps {
                git url: 'https://github.com/BalipalliGayathri/Angular-app.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install node-sass'
                sh 'npm install -g @angular/cli'
                sh 'ng build --prod'
            }
        }
    }
} 
