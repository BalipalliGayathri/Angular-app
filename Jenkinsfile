pipeline {
    agent any  
    tools {
	      nodejs 'NodeJS 13.0.1' 
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
