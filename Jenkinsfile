pipeline {
    agent any
  
    tools {nodejs "nodejs"}

    stages {
        stage('Cloning Git') {
            steps {
                git url: 'https://github.com/BalipalliGayathri/Angular-app.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'ng build --prod'
            }
        
        }
    }
} 
