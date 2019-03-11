const syslog = require("syslog-client");
const _ = require('lodash');

module.exports = class syslogClient {
  /**
     *
     * @param ip
     * @param clientOptions
     */
  constructor(ip, clientOptions) {
    if (!ip) {
      throw new Error('IP is required');
    }
    this.client = syslog.createClient(ip, clientOptions);
  }

  /**
     *
     * @returns {module.syslogClient|*}
     */
  static getSyslogLib() { return syslog; }

  /**
     *
     * @returns {*}
     */
  getSyslogClient() { return this.client; }

  /**
     *
     * @param program
     */
  setProgram(program) { this.program = program; }

  /**
     *
     */
  resetProgram() { this.program = null; }

  /**
     *
     * @param facility
     */
  setFacility(facility) { this.facility = facility; }

  /**
     *
     */
  resetFacility() { this.facility = null; }

  alert(...args) { this.prepareLog(syslog.Severity.Informational, args); }

  critical(...args) { this.prepareLog(syslog.Severity.Critical, args); }

  debug(...args) { this.prepareLog(syslog.Severity.Debug, args); }

  emergency(...args) { this.prepareLog(syslog.Severity.Emergency, args); }

  error(...args) { this.prepareLog(syslog.Severity.Error, args); }

  info(...args) { this.prepareLog(syslog.Severity.Informational, args); }

  log(...args) { this.prepareLog(syslog.Severity.Informational, args); }

  notice(...args) { this.prepareLog(syslog.Severity.Notice, args); }

  warning(...args) { this.prepareLog(syslog.Severity.Warning, args); }


  /**
     *
     * @param message
     * @param options
     */
  renderLog(message, options = {}) {
    this.client.log(message, options);
  }

  /**
     *
     * @param level
     * @param options
     */
  prepareLog(level, options) {
    const messageIn = _.get(options, 0);
    if (!messageIn) {
      throw new Error('Message is required');
    }
    const programIn = _.get(options, 1);
    const program = programIn || (!_.isNil(this.program) ? this.program : 'N/A');
    const optionsLogLibDefault = _.get(options, 2, {});

    const logOptions = {
      severity: level,
      facility: !_.isNil(this.facility) || syslog.Facility.Local0,
      ...optionsLogLibDefault,
    };
    const message = `${program} ${messageIn}`;

    this.renderLog(message, logOptions);
  }
};
