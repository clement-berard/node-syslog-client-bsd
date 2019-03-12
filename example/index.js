const SyslogClient = require("../src/syslog-client");

const options = {
  syslogHostname: 'home-api.local',
};

const logClient = new SyslogClient('10.0.0.15', options);

// Set 1

// with same program
logClient.setProgram('My-App');

logClient.info('Log infos!');
logClient.warning('Log warning!');
logClient.error('Log error!');
logClient.debug('Log debug!');
logClient.emergency('Log emergency!');
logClient.alert('Log alert!');
logClient.critical('Log critical!');
logClient.notice('Log notice!');
