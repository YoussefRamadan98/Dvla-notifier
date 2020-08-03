var scrape = require('./scrape');
var webdriver = require('selenium-webdriver');
var sendEmail = require('./scrape');


var licenseNumber =  "ENTER LICENSE NUMBER";

var referenceNumber = "ENTER REFERENCE NUMBER"
var postcode = "ENTER POSTCODE";

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
driver.manage().window().setSize(1280, 1024);
console.log("TESTSCRAPE.JS CALLED");


scrape(driver, licenseNumber, referenceNumber, postcode)







