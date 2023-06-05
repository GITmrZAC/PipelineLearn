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
        AWS_ACCESS_KEY_ID = credentials('YOUR_AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('YOUR_AWS_SECRET_ACCESS_KEY')
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
            // Шаги для создания новой версии приложения и обновления окружения в Elastic Beanstalk
            sh 'zip -r my-app.zip *'
            sh "aws elasticbeanstalk create-application-version --application-name ${ELASTIC_BEANSTALK_APPLICATION} --version-label ${env.BUILD_NUMBER} --source-bundle S3Bucket=null,S3Key=my-app.zip"
            sh "aws elasticbeanstalk update-environment --environment-name ${ELASTIC_BEANSTALK_ENVIRONMENT} --version-label ${env.BUILD_NUMBER}"
          }
        }
      }
    }
  }
}
