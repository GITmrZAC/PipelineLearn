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
        
        // Временные шаги для проверки сборки
        sh 'ls -l' // Вывод списка файлов и папок в текущей директории
        sh 'echo "App zip file:"'
        sh 'ls -l $APP_FILE_PATH' // Вывод информации о файле app.zip
      }
    }
    
    stage('Deploy to AWS') {
      steps {
        // Шаги для деплоя на AWS
        withAWS(credentials: 'JenkinsBEN', region: AWS_REGION) {
          script {
            // Шаги для создания новой версии приложения
            //sh "aws elasticbeanstalk create-application-version --application-name ${env.ELASTIC_BEANSTALK_APPLICATION} --version-label ${env.BUILD_NUMBER} --source-bundle S3Bucket=elasticbeanstalk-eu-north-1,S3Key=${env.APP_FILE_PATH}"
            sh "aws elasticbeanstalk create-application-version --application-name ${env.ELASTIC_BEANSTALK_APPLICATION} --version-label ${env.BUILD_NUMBER}"
            // Добавленный шаг для указания команды npm start
            sh "aws elasticbeanstalk update-environment --environment-name ${env.ELASTIC_BEANSTALK_ENVIRONMENT} --version-label ${env.BUILD_NUMBER} --option-settings Namespace=aws:elasticbeanstalk:container:nodejs,OptionName=NodeCommand,Value=\"npm start\""
          }
        }
      }
    }
  }
}
