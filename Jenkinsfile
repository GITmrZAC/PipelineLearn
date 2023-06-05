pipeline {
  agent any
  environment {
    AWS_ACCESS_KEY_ID = credentials('JenkinsBEN')['accessKeyId']
    AWS_SECRET_ACCESS_KEY = credentials('JenkinsBEN')['secretKey']
    ELASTIC_BEANSTALK_APPLICATION = 'my-app'
    ELASTIC_BEANSTALK_ENVIRONMENT = 'my-app-env'
  }
  stages {
    stage('Build') {
      steps {
        // Шаги сборки вашего приложения
        sh 'npm install'
        sh 'npm run build'
      }
    }
    
    stage('Deploy to AWS') {
      steps {
        // Шаги для деплоя на AWS
        withAWS(credentials: 'JenkinsBEN') {
          script {
            // Шаги для создания новой версии приложения и обновления окружения в Elastic Beanstalk
            sh 'zip -r my-app.zip *'
            sh "aws elasticbeanstalk create-application-version --application-name ${env.ELASTIC_BEANSTALK_APPLICATION} --version-label ${env.BUILD_NUMBER} --source-bundle S3Bucket=null,S3Key=my-app.zip"
            sh "aws elasticbeanstalk update-environment --environment-name ${env.ELASTIC_BEANSTALK_ENVIRONMENT} --version-label ${env.BUILD_NUMBER}"
          }
        }
      }
    }
  }
}

