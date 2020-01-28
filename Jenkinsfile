#!groovy

import com.lloydsbanking.ci.*

pipeline {


    agent {
     docker {
             label "sandbox"
             image "registry.sbx.zone/platform/ci-base:2.1"
             registryUrl "https://registry.sbx.zone"
             registryCredentialsId "registrycredentials"
           }

    }
    options {
        timeout(time: 300, unit: 'MINUTES')
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    env.BUILD_COUNTER = new buildNumber().getNext("${env.ETCD_HOST}", 'savings', "${env.JOB_BASE_NAME}")
                    currentBuild.displayName = "Job #${env.BUILD_COUNTER}"
                }
            }
        }
        stage('Build SeleniumBDDTest Image') {
            steps {
                script {
                    new docker().login("trusted-registry.sbx.zone", "cmpServiceUser")
                    new docker().buildAndPush("trusted-registry.sbx.zone", 'cmpServiceUser', "cmp/cmp-cwa-bdd:${env.BUILD_COUNTER}", '-t trusted-registry.sbx.zone/cmp/cmp-cwa-bdd:latest -f Dockerfile.bddtest --no-cache', '.')
                }
            }
        }

        stage('Selenium BDD Test') {
            steps {
                script {
                    sh """
                    echo Selenium Connectivity Test
                    curl -X GET http://selenium.cmp.sbx.zone:4444/grid/api/hub/ -d '{"configuration":["newSessionRequestCount"]}'
                    curl -X GET http://selenium2.cmp.sbx.zone:4444/grid/api/hub/ -d '{"configuration":["newSessionRequestCount"]}'
                    curl -X GET http://10.112.207.167:4444/grid/api/hub/ -d '{"configuration":["newSessionRequestCount"]}'
                    """
                    sh "rm -rf tests/reports/output/*"
                    sh "rm -rf tests/reports/output-html/*"
                    sh "docker run --rm \
                    -v ${env.WORKSPACE}/tests/reports:/www/tests/reports/ \
                    --name=cmp-cwa-bdd \
                    trusted-registry.sbx.zone/cmp/cmp-cwa-bdd:${env.BUILD_COUNTER} \
                    tests/conf/ci-cmp-cbo-bdd-test.cuke.conf.js \
                    --seleniumHost=selenium.cmp.sbx.zone \
                    --browser=chrome \
                    --ff=* \
                    --pack=colleague \
                    --subpack= \
                    --channel=desktop"
                  }
                }
            }

    }
    post {
        always {
            script {
                archiveArtifacts artifacts: 'tests/reports/**/*', allowEmptyArchive: true
                //generate cucumber reports
                cucumber 'tests/reports/output/*'
            }
             mail to: 'aderemi.ajayi@wipro.com',
            //mail to: 'sachin.jadhav12@wipro.com',
            subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
            body: "${env.JOB_NAME} has the test result ${currentBuild.result}"
           // body: "CMPCBO- Test Results : Job ${env.JOB_NAME},Build No-${env.BUILD_COUNTER} has the test result ${currentBuild.result}\n BDD Test report: https://jenkins-test.cmp.sbx.zone/job/cmp-cwa-bdd/${env.BUILD_COUNTER}/cucumber-html-reports/overview-features.html"

        }
        success{
            slackSend channel: "#cmp-cbo-ci-bddtest",
                    color: "#00FF00",
                     message: "SUCCESS: Job ${env.JOB_NAME},Build No-${env.BUILD_COUNTER} has the test result ${currentBuild.result}\n more info at ${env.BUILD_URL}"
                     //  message: "SUCCESS: Job ${env.JOB_NAME},Build No-${env.BUILD_COUNTER} has the test result ${currentBuild.result}\n BDD Test report: https://jenkins-test.cmp.sbx.zone/job/cmp-cwa-bdd/${env.BUILD_COUNTER}/cucumber-html-reports/overview-features.html"

        }

        failure{
            slackSend channel: "#cmp-cbo-ci-bddtest",
                            color: "#FF0000",
                            message: "FAILED: Job ${env.JOB_NAME} has the test result ${currentBuild.result}\n more info at ${env.BUILD_URL}"
                          // message: "FAILED: Job ${env.JOB_NAME},Build No-${env.BUILD_COUNTER} has the test result ${currentBuild.result}\n BDD Test report: https://jenkins-test.cmp.sbx.zone/job/cmp-cwa-bdd/${env.BUILD_COUNTER}/cucumber-html-reports/overview-features.html"

        }
        aborted{
            slackSend channel: "#cmp-cbo-ci-bddtest",
                            color: "#808080",
                           message: "ABORTED: Job ${env.JOB_NAME} has the test result ${currentBuild.result}\n more info at ${env.BUILD_URL}"
                          //   message: "ABORTED: Job ${env.JOB_NAME},Build No-${env.BUILD_COUNTER} has the test result ${currentBuild.result}\n BDD Test report: https://jenkins-test.cmp.sbx.zone/job/cmp-cwa-bdd/${env.BUILD_COUNTER}/cucumber-html-reports/overview-features.html"


        }

    }
}

