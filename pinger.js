const request = require('request');
const fs = require('fs');

const appNexusLogger = function (serviceName) {
  this.serviceName = serviceName == undefined ? 'AppNexus' : serviceName;

  this.severity = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    DEBUG: 'debug'
  };

  this.log = function (message, severity) {
    switch (severity) {
      case this.severity.WARN:
        console.warn(`[Warning] - ${serviceName} - ${message}`);
        break;
      case this.severity.ERROR:
        console.error(`[Error] - ${serviceName} - ${message}`);
        break;
      case this.severity.DEBUG:
        console.debug = console.log(`[Debug] - ${serviceName} - ${message}`); // adaptation for node
        break;
      case this.severity.INFO:
      default:
        console.info(`[Info] - ${serviceName} - ${message}`);
        break;
    }
  };

  this.log("Logging service created.");
};

const authenticate = () => {
  return new Promise((resolve, reject) => {
    const authentication = new appNexusLogger("Authentication Service"); 

    // keeping a file that is gitIgnored so that credentials are hopefully never accidentally uploaded to a repo
    fs.createReadStream('auth.json').pipe(request.post(('https://api-test.appnexus.com/auth'), function (error, response, body) {
      authentication.log('Authenicating API access');

      if (error) {
        authentication.log(`Error in authentication ${error}`, authentication.severity.ERROR);
        authentication.log(`statusCode: ${response && response.statusCode}`, authentication.severity.ERROR);
      }

      console.log('response - ', response)
      if (typeof response === 'undefined') {
        let dateTime = new Date;
        const fileName = 'noInternet.txt';
        console.log(dateTime)
        fs.appendFile(fileName, `No Internet detected on ${dateTime} \n`, (err) => {
          if (err) throw err;
        });
        reject('There is no internet connection')
      }      

      if (typeof response !== 'undefined') {
        body = JSON.parse(body);
        token = body.response.token
        if (typeof(token) === 'undefined') {
          reject('No Token Available');
        }
        authentication.log('Successfully logged in.');
        resolve(token);
      }
    }));
  })
}

setInterval(() => {
  authenticate().catch((err) => console.log(err));
}, 60000)

