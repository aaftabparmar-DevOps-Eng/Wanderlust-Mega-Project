@Library('Shared') _
pipeline {
    agent any 
    
    environment{
        SONAR_HOME = tool "Sonar"
    }
    
    parameters {
        string(name: 'FRONTEND_DOCKER_TAG', defaultValue: '', description: 'Setting docker image for latest push')
        string(name: 'BACKEND_DOCKER_TAG', defaultValue: '', description: 'Setting docker image for latest push')
    }
    
    stages {
        stage("Validate Parameters") {
            steps {
                script {
                    if (params.FRONTEND_DOCKER_TAG == '' || params.BACKEND_DOCKER_TAG == '') {
                        error("FRONTEND_DOCKER_TAG and BACKEND_DOCKER_TAG must be provided.")
                    }
                }
            }
        }
        
        stage("Workspace cleanup"){
            steps{ cleanWs() }
        }
        
        stage('Git: Code Checkout') {
            steps { script{ code_checkout("https://github.com/aaftabparmar-DevOps-Eng/Wanderlust-Mega-Project.git","main") } }
        }
        
        stage("Trivy: Filesystem scan"){
            steps { script{ trivy_scan() } }
        }
        
        // OWASP REMOVED - NVD API issue hai
        
        stage("SonarQube: Code Analysis"){
            steps { script{ sonarqube_analysis("Sonar","wanderlust","wanderlust") } }
        }
        
        stage("SonarQube: Code Quality Gates"){
            steps { script{ sonarqube_code_quality() } }
        }
        
        stage('Exporting environment variables') {
            parallel{
                stage("Backend env setup"){ steps { script{ dir("Automations"){ sh "bash updatebackendnew.sh || true" } } } }
                stage("Frontend env setup"){ steps { script{ dir("Automations"){ sh "bash updatefrontendnew.sh || true" } } } }
            }
        }
        
        stage("Docker: Build Images"){
            steps{
                script{
                    dir('backend'){ sh "docker build -t aaftabparmar217/wanderlust-backend-beta:${params.BACKEND_DOCKER_TAG} ." }
                    dir('frontend'){ sh "docker build -t aaftabparmar217/wanderlust-frontend-beta:${params.FRONTEND_DOCKER_TAG} ." }
                }
            }
        }
        
        stage("Docker: Push to DockerHub"){
            steps{
                script{
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                            docker push aaftabparmar217/wanderlust-backend-beta:${params.BACKEND_DOCKER_TAG}
                            docker push aaftabparmar217/wanderlust-frontend-beta:${params.FRONTEND_DOCKER_TAG}
                        """
                    }
                }
            }
        }
    }
    
    post{
        success{
            echo "CI Pipeline Completed Successfully!"
            build job: "Wanderlust-CD", parameters: [
                string(name: 'FRONTEND_DOCKER_TAG', value: "${params.FRONTEND_DOCKER_TAG}"),
                string(name: 'BACKEND_DOCKER_TAG', value: "${params.BACKEND_DOCKER_TAG}")
            ]
        }
        failure { echo "CI Pipeline Failed!" }
    }
}
