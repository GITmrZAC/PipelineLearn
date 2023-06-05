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
        AWS_ACCESS_KEY_ID = credentials('AKIAQPU2POXWVXCNRCGO')
        AWS_SECRET_ACCESS_KEY = credentials('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')
        AWS_REGION = 'eu-north-1'
        ECR_REPOSITORY = 'public.ecr.aws/l0f4u9w7/my_app'
      }
      steps {
        // Шаги для деплоя на AWS
        withAWS(credentials: [
          [$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']
        ]) {
          script {
            // Шаги для сборки и загрузки Docker-образа
            sh 'docker build -t my-app .'
            sh 'docker tag my-app ${env.ECR_REPOSITORY}:latest'
            sh 'docker push ${env.ECR_REPOSITORY}:latest'
            
            // Шаги для развертывания контейнера в AWS (например, на ECS, EKS или Elastic Beanstalk)
            // Здесь можно использовать команды AWS CLI, Terraform или специфичные плагины Jenkins
          }
        }
      }
    }
  }
}
