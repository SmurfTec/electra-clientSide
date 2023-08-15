pipeline {
    agent { label 'FirstNode' }
    stages {
        stage("Copy Code") {

            steps {
                dir('/home/zain/nextjs_projects/electra-client-uat') {
                    sh "sudo cp -r /${WORKSPACE}/** ./"
                }
            }
        }
        stage("Pm2 Process") {
            steps {
                dir('/home/zain/nextjs_projects/electra-client-uat') {
                    sh "sudo npm install"
                    sh "sudo npm run build"
                    sh "pm2 restart electra-client-uat"
                }
            }
        }
    }
}
