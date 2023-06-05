pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        // Шаги сборки вашего приложения
        sh 'npm install'
        sh 'npm run build'
      }
    }
    
    stage('Deploy to AWS') {
      environment {
        AWS_ACCESS_KEY_ID = "${credentials('JenkinsBEN').accessKeyId}"
        AWS_SECRET_ACCESS_KEY = "${credentials('JenkinsBEN').secretKey}"
        AWS_REGION = 'eu-north-1'
        ELASTIC_BEANSTALK_APPLICATION = 'my-app'
        ELASTIC_BEANSTALK_ENVIRONMENT = 'my-app-env'
      }
      steps {
        // Шаги для деплоя на AWS
        withAWS(credentials: [
          [$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']
        ]) {
          script {
            // Шаги для развертывания приложения на Amazon Elastic Beanstalk
            // Здесь можно использовать команды AWS CLI, Terraform или специфичные плагины Jenkins
          }
        }
      }
    }
  }
}
