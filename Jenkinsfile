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
                sh 'npm install node-sass'
                sh 'npm install -g @angular/cli'
                sh 'npm install rxjs@6.2.2 --save  &&  npm install rxjs-compat@6.2.2 --save'
                sh 'ng build --prod'
            }
        }
    }
} 
