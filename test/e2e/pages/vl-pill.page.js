const {VlPill, VlButtonPill} = require('../components/vl-pill');
const {Page, Config, VlElement} = require('vl-ui-core').Test;

class VlPillPage extends Page {
  async _getPill(selector) {
    return new VlPill(this.driver, selector);
  }

  async _getPillButton(selector) {
    return new VlButtonPill(this.driver, selector);
  }

  async load() {
    await super.load(`${Config.baseUrl}/demo/vl-pill.html`);
  }

  async getStandardPill() {
    return this._getPill('#pill');
  }

  async getSuccessPill() {
    return this._getPill('#pill-success');
  }

  async getWarningPill() {
    return this._getPill('#pill-warning');
  }

  async getErrorPill() {
    return this._getPill('#pill-error');
  }

  async getDisabledPill() {
    return this._getPill('#pill-disabled');
  }

  async getClosablePill() {
    return this._getPill('#pill-closable');
  }

  async getCloseResult() {
    return new VlElement(this.driver, '#close-result');
  }

  async getCheckablePill() {
    return this._getPill('#pill-checkable');
  }

  async getPillButton() {
    return this._getPillButton('#button-pill');
  }

  async getPillSuccessButton() {
    return this._getPillButton('#button-pill-success');
  }

  async getPillWarningButton() {
    return this._getPillButton('#button-pill-warning');
  }

  async getPillErrorButton() {
    return this._getPillButton('#button-pill-error');
  }
}

module.exports = VlPillPage;
