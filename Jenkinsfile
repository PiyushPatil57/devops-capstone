pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'piyush5702'
        DOCKER_HUB_PASS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Checkout Code') {
            steps {
                // ✅ Uses Jenkins credential ID 'capstone' (GitHub token)
                git branch: 'main',
                    credentialsId: 'capstone',
                    url: 'https://github.com/PiyushPatil57/devops-capstone.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🔧 Building Docker images...'
                sh '''
                docker build -t capstone-backend ./backend
                docker build -t capstone-frontend ./frontend
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '📦 Pushing Docker images to Docker Hub...'
                sh '''
                echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin
                docker tag capstone-backend $DOCKER_HUB_USER/capstone-backend:latest
                docker tag capstone-frontend $DOCKER_HUB_USER/capstone-frontend:latest
                docker push $DOCKER_HUB_USER/capstone-backend:latest
                docker push $DOCKER_HUB_USER/capstone-frontend:latest
                docker logout
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '🚀 Deploying to Kubernetes...'
                sh '''
                kubectl apply -f k8s/backend-deployment.yaml
                kubectl apply -f k8s/frontend-deployment.yaml
                kubectl apply -f k8s/backend-service.yaml
                kubectl apply -f k8s/frontend-service.yaml
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Build or Deployment Failed.'
        }
    }
}

