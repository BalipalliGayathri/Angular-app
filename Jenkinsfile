pipeline {
    agent any  
    tools {nodejs "node"}
    stages {
        stage('Cloning Git') {
            steps {
                git url: 'https://github.com/BalipalliGayathri/Angular-app.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm install -g rxjs@5.5.0'
                sh 'npm install -g @angular/cli'
                sh 'ng build --prod'
            }
        }
    }
} 
