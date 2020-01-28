#### Created By: Lawrence Ajayi

Lloyds UI Testing Automation framework
======================================
**************************************************** CMP QA Team **************************
#### Introduction

This Documents walks you through the Installation and Script creation steps through which you can start creating your Automation Scenarios using WebdriverIO and Cucumber.js

Requirement

1) Successful connection to Lloyds VPN so that Lloyds nexus repo can be accessed for installation of npm modules. 

#### Installation - it is assumed the user is using Mac OS ###############

 1) Get GitLab access and Clone this repo in your local drive and open it in your IDE (e.g. Webstorm, IntelliJ etc.)

 2) Download Node.js 8.1.0 (or latest) version and install it through the following process:

    a) Ensure you have brew installed, if not, install brew by typing at the prompt:
           /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    b) Install node js by typing at the prompt: brew install yarn (this will also install node js)

 3) Install git and copy the public ssh key into your GitLab settings (ssh key) under your profile.

 4) Hit below urls for nexus access verification:
        Url1: http://nexus.sandbox.extranet.group/nexus/content/groups/npm-master/
        Url2: http://10.113.140.187:8081/nexus/content/groups/npm-master

    If Url1 is accessible then run below command at the prompt:

        yarn config set registry  http://nexus.sandbox.extranet.group/nexus/content/groups/npm-master/

    Else if Url2 works then run below command in git bash:
        yarn config set registry  http://10.113.140.187:8081/nexus/content/groups/npm-master

    **Once registry is set: verify your registry setting by :- yarn config get registry
    the console output should show :
        http://nexus.sandbox.extranet.group/nexus/content/groups/npm-master

 5) Go to BDD folder of this project or if that is not present then go to the folder where package.json is present and run:
	
	yarn install


	(This would install the modules required for Automation (ex. WebdriverIO, Cucumber.js, Gulp, JS-Yaml etc.))

**In case any errors come up and the webdriverio module doesn't get installed, install the same through the command:

	yarn add <modulename>

For Example; if running cucumber task shows following type of errors

This error means that a required npm module is missing & should be installed manually now (or add in package.json & rerun npm install)

		C:\GIT\central_core\core-webdriverio-framework>gulp cucumber
		module.js:339
			throw err;
			^

		Error: Cannot find module 'gulp-autoprefixer'
			at Function.Module._resolveFilename (module.js:337:15)
			at Function.Module._load (module.js:287:25)
			at Module.require (module.js:366:17)
			at require (module.js:385:17)
			at Object.<anonymous> (C:\GIT\central_core\core-webdriverio-framework\gulp-tasks\sass.js:2:14)
			at Module._compile (module.js:435:26)
			at Object.Module._extensions..js (module.js:442:10)
			at Module.load (module.js:356:32)
			at Function.Module._load (module.js:311:12)
			at Module.require (module.js:366:17)
			at require (module.js:385:17)
	

Then run following command

	yarn install gulp-autoprefixer --save-dev
	
	This command will install the missing module manually & will add this as a dev dependency in package.json


### Adding new modules in framework
If the user want to add any new module then they need to add that in package.json

#### Configuration

 - We are using Gulp for creating and triggering tasks
 - Change 'wdio.cmd' to 'wdio in case the scripts are to be executed against Mac
 - The Cucumber configurations are defined in a number of configuration files in the conf folder and includes; ci-cmp-cbo-bdd-test.cuke.con.js
 etc. (These are based on whether, we are running test locally or in CI/CD environment which also depends on the epic/stories being worked on)
 - Defining world.js for the Framework etc.
 - endpoints_&_urls folder contains the test environment and the various urls being used.


#### Running the Automation Scripts against the respective browser (Chrome)

To run test individually locally,
at the prompt ensure to be at the cmp-cwa-bdd directory and type: 
e.g: based on the defined task in the gulp file, we can have the following;
yarn gulp ci-colleague --ff=cmpcbo_708_edit_user_details_displayed_on_check_and_confirm_page

ci-colleague is the name of the task in the gulp file (this will start selenium server and execute the feature file
or
To run the Test with Tags (Into Single Feature File)
e.g:
yarn gulp ci-colleague --ff=cmpcbo_708_edit_user_details_displayed_on_check_and_confirm_page --tags=@cmpcbo708-01

To run the Test with Tags across all feature files(All feature files e.g @regression))
e.g.:
yarn gulp ci-colleague --ff=*  --tags=@regression

yarn gulp ci-colleague --ff=* --tags=@sprint10

To run Test and ignore some of the feature (Then put @ignore Tag on feature , or just put '~@TagName')
yarn gulp ci-colleague --ff=*  --tags=~@ignore
To Run all feature file without Tag Names
e.g:
yarn gulp ci-colleague --ff=*

To run the entire feature suite, run the shell script as follows:

At the prompt type ./runtest.sh and press the enter key

********************************** To run sanity test locally *********************************

At the project root folder; type:

yarn gulp ci-sanity --ff=<name of the feature file>

********************************** To run sanity test in suacelab *********************************

At the project root folder; type:

yarn gulp ci-sanity-sauce --ff=<name of the feature file>

********************************** To run test in headless chrome *********************************

At the prompt run the shell script as follows: ./ci_runtest.sh

******************* USING THE DOCKERISED SELENIUM BDD TEST IMAGE ***********************************

To run the test inside the dockerised container, follow the following steps:

1. at the prompt run the image as follows:
   > docker build -t bdd-selenium-test -f Dockerfile.bddtest . --no-cache

2. Follow by: docker run --rm bdd-selenium-test

   This will run the test in headless mode

***Please refer to the gulp file for more details


#### Goals of this framework

This framework has been written to enable the Automation of UI through Selenium Standalone Server, WebdriverIO and Cucumber.js.

######## Framework/Tools used consist of the following: ###############

- Gulp 
- WebdriverIO
- Cucumber.js
- Selenium Standalone Server
- Chrome/IE drivers
- JS-Yaml


#### Git branching

You can create new branch in this project using below command and can push your changes in your branch:
- Create new branch:- git checkout -b "branchname"
- Pull master into your branch: - git pull origin master
- Make your changes
- Add changes:- git add *
- Commit changes to branch:- git commit -m "comments"
- Push changes to your branch:- git push
- This will push your changes into your branch

Pushing your branch changes into master:
- Stay into your branch and Take git pull from master so that any new master code is in your branch: - git pull origin master
- Resolve any conflicts (if any)
- git add *
- git commit -m "conflicts resolved"
- Push your updated branch in GitLab (it will have your changes + latest master changes) - git push
- Push changes of your branch to master: git ready master OR use command: git push origin HEAD:refs/for/master
- Above command will raise a patchset in GitLab  - > Get it reviewed as patchset and submit your parchset


#### Important Links

- http://webdriver.io/api/action/
- http://webdriver.io/
- https://saucelabs.com/selenium/css-selectors
- http://seleniumeasy.com/selenium-tutorials/examples-for-xpath-and-css-selectors
- http://www.softwaretestinghelp.com/css-selector-selenium-locator-selenium-tutorial-6/

#####Selenium/Browser compatibility (Please note we are using selenium 2.53.1 version as of now)

Browser 	    |   Version	                  |  Driver	             |  Selenium-standalone-server	    |  To be placed in Folder

Mozilla Firefox	|   47.0.1 32bit              |	Not Required	    |   2.53.1 32 bit                   |         	NA

Google Chrome	|   6.0.3359.181              |	2.35 32 bit	|   2.53.1 32 bit / 3.4.0 32 bit    |	..node_modules\chromedriver\lib\chromedriver

Mozilla Firefox	|   53.0 32 bit /55.0 32/64 bit   |	0.18.0 32/64 bit	|   3.4.0                       |	..node_modules\geckodriver

- Use task selenium3 to run the framework for higher version of firefox( tested with Firefox 55 64bit)
- Use task selenium to run the framework with Firefox 47.0.1 32 bit.

***Please note, update the browser's version in the package.json file as needed.

#### Tools used
Check the package.json file for a full listing with all the dependencies.

#########=============================================================


#### Script Creation
Tests are written in [Gherkin syntax](http://docs.behat.org/en/latest/guides/1.gherkin.html#gherkin-syntax)
that means that you write down what's supposed to happen in a real language. All test files are located in
`./tests/features/FeatureFiles/*` and have the file ending `.feature`.


**Sample Feature File:**

Feature: Searching for Lloyds
  As an internet user
  In order to find out more about Lloyds
  I want to be able to search for information about Lloyds on Google

  Scenario: Google Lloyds search
    Given I am on the Google web page
    When I search Google for "Llyods"
    Then I should see some results
    And I should get the Url and Title correctly


**Corresponding Step Definition Files**


``` javascript
var yaml = require('js-yaml');
var fs = require("fs");
//Load the Yaml file corresponding to Locators
var eleLoc = yaml.load(fs.readFileSync('tests/acceptance/wdio/utilities/pom/ElementLocators.yml'));
//Load the Yaml file corresponding to Test Data
var testData = yaml.load(fs.readFileSync('tests/acceptance/wdio/testData/Environment1'));


var ExampleShowingTestData = function() {
    this.World = require('../../../support/world.js').World;
    this.Environment = require('../../../support/environment.js').Environment;


    this.Given(/^I am on the Google web page$/, function(next) {
        this.client
            .url('http://www.google.co.uk')
            .pause(1000)
            .call(next);
    });
    this.When(/^I search Google for "([^"]*)"$/, function(searchQuery, next) {
        this.client
            ////The Element Locator is fetched from 'utilities/POM/ElementLocators.yml
            ////The Search Query is fetached from 'TestData/Environment1.yml'
            .setValue(eleLoc.googleHomePage['searchField'], testData.googleSearchPage['searchQuery'])
            .keys('\uE007')
            .then(function() {
                this.call(next);
            });
    });
    this.Then(/^I should see some results$/, function(next) {
            this.client

                .pause(1000)
                .waitForExist(eleLoc.googleSearchPage['rightNavigation'], 3000)
                .then(function() {
                    return this.client.elements(eleLoc.googleSearchPage['rightNavigation'])
                        .then(function(elements) {
                            return this.expect(elements.value.length).to.not.equal(0);
                        }.bind(this));
                }.bind(this))
                .getText(eleLoc.googleSearchPage['rightNavigationFirstChild'])
                .then(function(text) {
                    this.assert(Array.isArray(text), 'getText returned an array');
                    return this.expect(text[0]).to.contain('Lloyds Bank');
                }.bind(this))
                .call(next);
        }
    );

};

module.exports = ExampleShowingTestData;

```


**Points of Interest**

**1)  By Default the Signature would be generated as:**
    this.Then(/^I should see some result$/, function (callback) {
		Add Code here.............
        callback.pending();
  });

Change it to:
    this.Then(/^I should see some result$/, function (next) {
	Add Code here.................

    });


**2)  All the Locators would be placed in *.yml files and the Test Data would be stored in Environment1.yml**
**3)  Feature Files would be stored in features/FeatureFiles/EpicXXX/StoryXXX/*.feature**
**4)  Step Definitions would be stored in features/step_definitions/EpicXXX/StoryXXX/*.feature**
