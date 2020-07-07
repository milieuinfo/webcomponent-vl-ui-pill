const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;


class VlPillElement extends VlElement {
  async getType() {
    return this.getAttribute('data-vl-type');
  }

  async isSuccess() {
    return await this.getType() === 'success';
  }

  async isWarning() {
    return await this.getType() === 'warning';
  }

  async isError() {
    return await this.getType() === 'error';
  }
}

class VlPill extends VlPillElement {
  async isClosable() {
    return this.hasAttribute('data-vl-closable');
  }

  async isCheckable() {
    return this.hasAttribute('data-vl-checkable');
  }

  async isChecked() {
    return this.driver.executeScript('return arguments[0].checked', this);
  }

  async toggleCheck() {
    if (await this.isCheckable()) {
      await this.click();
    }
  }

  async close() {
    if (await this.isClosable()) {
      const closeButton = await this._getCloseButton();
      await closeButton.click();
    }
  }

  async getContentSlotNodes() {
    const slot = await this._getContentSlot();
    return this.getAssignedNodes(slot);
  }

  async _getContentSlot() {
    return this.shadowRoot.findElement(By.css('slot'));
  }

  async _getCloseButton() {
    return this.shadowRoot.findElement(By.css('#close'));
  }
}

class VlButtonPill extends VlPillElement {}

module.exports = {
  VlPill,
  VlPillElement,
  VlButtonPill,
};
