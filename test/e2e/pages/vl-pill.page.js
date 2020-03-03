const VlPill = require('../components/vl-pill');
const { Page, Config, VlElement } = require('vl-ui-core').Test;

class VlPillPage extends Page {
    async _getPill(selector) {
        return new VlPill(this.driver, selector);
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

    async getClosablePill() {
        return this._getPill('#pill-closable');
    }

    async getCloseResult() {
        return new VlElement(this.driver, '#close-result');
    }

    async getCheckablePill() {
        return this._getPill('#pill-checkable');
    }
}

module.exports = VlPillPage;
