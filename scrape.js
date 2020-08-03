var By = require('selenium-webdriver').By;
var _ = require('underscore');
var moment = require('moment');
var nodemailer = require('nodemailer');
var emailSent = false

function scrape(webDriver, licenseNumber, referenceNumber, location) {
//For existing bookings
  async function loginWith(webDriver, licenseNumber, referenceNumber) {
    return webDriver.get('https://driverpracticaltest.dvsa.gov.uk/login').then(function() {
      return webDriver.findElement(By.id('driving-licence-number')).sendKeys(licenseNumber).then(async function() {
        await sleep(2500);
        return webDriver.findElement(By.id('application-reference-number')).sendKeys(referenceNumber).then( async function() {
          await sleep(2500);
          return webDriver.findElement(By.id('booking-login')).click().then(async function() {
            await sleep(2500);
            return webDriver.findElement(By.id('date-time-change')).click().then( async function() {
              await sleep(2500);
              return webDriver.findElement(By.id('test-choice-earliest')).click().then( function() {
                return webDriver.findElement(By.id('driving-licence-submit')).click().then(async function() {
                  await sleep(2500);
                  return webDriver.findElement(By.id('change-test-centre')).click();
                });
              });
            });
          });
        });
      });
    });
  }

  // function loginWith(webDriver, licenseNumber, theoryPassNumber) {
  //   return webDriver.get('https://driverpracticaltest.dvsa.gov.uk/application?execution=e2s2').then(function() {
  //     return webDriver.findElement(By.id('test-type-car')).click().then(function() {
  //       return webDriver.findElement(By.id('driving-licence')).sendKeys(licenseNumber).then(function() {
  //         return webDriver.findElement(By.id('special-needs-none')).click().then(function() {
  //           return webDriver.findElement(By.id('driving-licence-submit')).click();

  //         });
  //       });
  //     });
  //   });
  // }

  function loginAndGetTestDates(webDriver, licenseNumber, referenceNumber, location) {
    return loginWith(webDriver, licenseNumber, referenceNumber).then(function() {
      return findTestCentresIn(location).then(function() {
        return findNearestTestDateAndSendEmail().then(function(string){
          return checker(string)
        });
        /*.then(function(url) {
          return findTestCentresAndDatesAndLoadMoreWith(url).then(function(data) {
            return data;
          });
        });*/
      });
    });
  }


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yy = '20';
  today = dd + '/' + mm + '/' + yy;

  console.log("SCRAPE.JS CALLED");

  // function findTestCentresIn(location) {
  //   webDriver.manage().window().setSize(1280, 1024);
  //   return webDriver.findElement(By.id('test-choice-calendar')).sendKeys(today).then(function() {
  //     return webDriver.findElement(By.id('driving-licence-submit')).click().then(function() {
  //       return webDriver.findElement(By.id('test-centres-input')).sendKeys(location).then(function() {
  //         return webDriver.findElement(By.id('test-centres-submit')).click()

  //       });
  //     });
  //   });
  // }
  function findTestCentresIn(location) {
    webDriver.manage().window().setSize(1280, 1024);
    return webDriver.findElement(By.id('test-centres-input')).sendKeys(location).then(function() {
      return webDriver.findElement(By.id('test-centres-submit')).click()
    });
  }
  function findNearestTestDateAndSendEmail(){
    return webDriver.findElement(By.id("centre-name-278")).then(function(element){
      return element.findElement(By.tagName('h5')).then(function(element){
        return element.getText()

      });
    });

  }



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sendEmail(date){
  var transporter = nodemailer.createTransport({
    service: 'gmail', // Change to your email provider
    auth: {
      user: 'YOUR EMAIL',
      pass: 'YOUR EMAIL PASSWORD'
    }
  });
  var mailOptions = {
    from: 'THE SENDER EMAIL',
    to: 'THE RECEIVER EMAIL',
    subject: 'New Test date available!',
    text: date
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      emailSent = true
    }
  });

}

    loginAndGetTestDates(webDriver, licenseNumber, referenceNumber, location);

    async function checker(string){
      var date = string.split(' ')[5].split('/')[1];
          date = parseInt(date)

      if (date ==3){
        console.log("Checking Again in 1.5 minutes...","Nearest month is" + date);
        await sleep(90000);
        console.log("Checking Again..", "Nearest month is" + date);
        webDriver.navigate().refresh()
        findNearestTestDateAndSendEmail().then(function(string){
          return checker(string)
        });

      } else{
        sendEmail(string)
      }
      return string;
    }
}



module.exports = scrape;
