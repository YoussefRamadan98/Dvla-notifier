## DVLA Scraper
 A continuous web scraper for finding the soonest available test dates within a given 
  date range. As soon as a date is found an email will be sent to you to notify you.

## Install
##### [NPM](https://www.npmjs.com/)

#### Clone repo  

```
git clone https://github.com/YoussefRamadan98/dvla-scraper
```

## Run the Scraper


#### 1) Go into the project
```
cd dvla-scraper
```
#### 2) Install packages
```
npm install
```

#### 4) Edit Credentials
```
Edit the following variables in testScrape.js

var licenseNumber =  "ENTER YOUR LICENCE",
var theoryPassNumber = "ENTER YOUR THEORY PASS NUMBER",
var postcode = "ENTER YOUR POSTCODE",

```
Edit the following variables in scrape.js
 
```
 user: 'YOUR EMAIL',
 pass: 'YOUR EMAIL PASSWORD'
 
 var mailOptions = {
    from: 'THE SENDER EMAIL',
    to: 'THE RECEIVER EMAIL',
```
#### 5) Run the scraper
```
node testScrape.js
```
#### 6) When the scraper is finished it will generate a file with all the data
```
 dates.json
```

