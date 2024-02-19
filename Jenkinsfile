pipeline {
    agent { label 'firstnode' }
    stages {
        stage("Copy Code") {

            steps {
                dir('/home/projects/next-projects/electra-clientside-uat') {
                    sh "sudo cp -r /${WORKSPACE}/** ./"
                }
            }
        }
        stage("Pm2 Process") {
            steps {
                dir('/home/projects/next-projects/electra-clientside-uat') {
                    sh "sudo npm install"
                    sh "sudo npm run build"
              //      sh "pm2 restart electra-client-uat"
                }
            }
        }
    }
}
