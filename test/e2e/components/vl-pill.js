const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;

class VlPill extends VlElement {
    async isClosable() {
        return this.hasAttribute('closable');
    }

    async isCheckable() {
        return this.hasAttribute('checkable');
    }

    async isChecked() {
        return await this.driver.executeScript('return arguments[0].checked', this);
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

    async getContent() {
        const slot = await this._getContentSlot();
        return this.getAssignedNodes(slot);
    }

    async getType() {
        return this.getAttribute('type');
    }

    async _getContentSlot() {
        return this.shadowRoot.findElement(By.css('slot'));
    }

    async _getCloseButton() {
        return this.shadowRoot.findElement(By.css('#close'));
    }
}

module.exports = VlPill;
