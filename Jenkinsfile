pipeline {
agent any
environment {
AWS_REGION = 'ap-south-1'
AWS_ACCOUNT_ID = 'YOUR-AWS-ACCOUNT-ID'
ECR_REPO = 'movie-service'
ECR_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"
DOCKER_TAG = "${BUILD_NUMBER}"
}
stages {
stage('Git Checkout') {
steps {
git branch: 'movie',
credentialsId: 'github-creds',
url: 'https://github.com/YOUR-USERNAME/booking-app.git'
}
}
stage('NPM Install') {
steps {
sh 'npm install'
}
}
stage('SonarQube Scan') {
steps {
withSonarQubeEnv('SonarQube') {
sh '''
sonar-scanner \
-Dsonar.projectKey=movie-service \
-Dsonar.sources=.
'''
}
}
}
stage('OWASP Dependency Check') {
steps {
dependencyCheck additionalArguments: '''
--scan .
--format HTML
--out dependency-check-report
--prettyPrint
''', odcInstallation: 'OWASP-DC'
dependencyCheckPublisher pattern:
'dependency-check-report/dependency-check-report.xml'
}
}
stage('Docker Build') {
steps {
sh 'docker build -t ${ECR_URI}:${DOCKER_TAG} .'
}
}
stage('Trivy Scan') {
steps {
sh '''
trivy image \
--exit-code 0 \
--severity HIGH,CRITICAL \
${ECR_URI}:${DOCKER_TAG}
'''
}
}
stage('ECR Push') {
steps {
sh '''
aws ecr get-login-password \
--region ${AWS_REGION} | \
docker login \
--username AWS \
--password-stdin \
${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
docker push ${ECR_URI}:${DOCKER_TAG}
docker tag ${ECR_URI}:${DOCKER_TAG} ${ECR_URI}:latest
docker push ${ECR_URI}:latest
'''
}
}
stage('Deploy to EKS') {
steps {
sh 'kubectl apply -f k8s/'
}
}
}
post {
always { cleanWs() }
success { echo 'Movie Service Deployed!' }
failure { echo 'Pipeline Failed!' }
}
}
