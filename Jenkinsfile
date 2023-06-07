pipeline {
  agent any
  
  environment {
    AWS_ACCESS_KEY_ID = credentials('JenkinsBEN')
    AWS_SECRET_ACCESS_KEY = credentials('JenkinsBEN')
    ELASTIC_BEANSTALK_APPLICATION = 'my-app1'
    ELASTIC_BEANSTALK_ENVIRONMENT = 'my-app1-env'
    AWS_REGION = 'eu-north-1'
    APP_FILE_PATH = 'app.zip'
    AWS_ACCOUNT_ID = '033609971181'
  }
  
  stages {
    stage('Build') {
      steps {
        // Шаги сборки вашего приложения
        sh 'npm install'
        sh 'npm run build'
        sh 'zip -r $APP_FILE_PATH *'
      }
    }
    
    stage('Deploy to AWS') {
      steps {
        // Шаги для деплоя на AWS
        withAWS(credentials: 'JenkinsBEN', region: AWS_REGION) {
          script {
            // Загрузка файла приложения в S3 (нет необходимости, если файл уже локально)
            // sh "aws s3 cp ${env.APP_FILE_PATH} s3://elasticbeanstalk-${AWS_REGION}-${AWS_ACCOUNT_ID}/${env.APP_FILE_PATH}"
            
            // Шаги для создания новой версии приложения и обновления окружения в Elastic Beanstalk
            sh "aws elasticbeanstalk create-application-version --application-name ${env.ELASTIC_BEANSTALK_APPLICATION} --version-label ${env.BUILD_NUMBER} --source-bundle S3Bucket=elasticbeanstalk-${AWS_REGION}-${AWS_ACCOUNT_ID},S3Key=${env.APP_FILE_PATH}"
            sh "aws elasticbeanstalk update-environment --environment-name ${env.ELASTIC_BEANSTALK_ENVIRONMENT} --version-label ${env.BUILD_NUMBER}"
          }
        }
      }
    }
  }
}

