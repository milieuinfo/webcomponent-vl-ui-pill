const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlPillPage = require('./pages/vl-pill.page');

describe('vl-pill', async () => {
    const vlPillPage = new VlPillPage(driver);

    before(() => {
        return vlPillPage.load();
    });

    it("Als gebruiker kan ik de inhoud van een pill zien", async () => {
        const pill = await vlPillPage.getStandardPill();
        const content = await pill.getContentSlotNodes();
        await assert.equal(content[0].textContent.trim(), 'Optie 1');
    });

    it("Als gebruiker kan ik pillen zien zonder type en succes, waarschuwing en fout pillen", async () => {
        const pill = await vlPillPage.getStandardPill();
        await assert.eventually.isFalse(pill.isSuccess());
        await assert.eventually.isFalse(pill.isWarning());
        await assert.eventually.isFalse(pill.isError());

        const successPill = await vlPillPage.getSuccessPill();
        await assert.eventually.isTrue(successPill.isSuccess());
        await assert.eventually.isFalse(successPill.isWarning());
        await assert.eventually.isFalse(successPill.isError());

        const warningPill = await vlPillPage.getWarningPill();
        await assert.eventually.isFalse(warningPill.isSuccess());
        await assert.eventually.isTrue(warningPill.isWarning());
        await assert.eventually.isFalse(warningPill.isError());

        const errorPill = await vlPillPage.getErrorPill();
        await assert.eventually.isFalse(errorPill.isSuccess());
        await assert.eventually.isFalse(errorPill.isWarning());
        await assert.eventually.isTrue(errorPill.isError());
    });

    it("Als gebruiker kan ik een closable pill sluiten", async () => {
        const pill = await vlPillPage.getClosablePill();

        await assert.eventually.isTrue(pill.isClosable());
        await assert.eventually.isFalse(pill.isCheckable());

        await pill.close();

        const closeResult = await vlPillPage.getCloseResult();
        await assert.eventually.equal(closeResult.getTextContent(), 'Er werd op de sluitknop gedrukt!');
    });

    it("Als gebruiker kan ik een checkable pill aan- en uitvinken", async () => {
        const pill = await vlPillPage.getCheckablePill();

        await assert.eventually.isFalse(pill.isClosable());
        await assert.eventually.isTrue(pill.isCheckable());

        await assert.eventually.isFalse(pill.isChecked());

        await pill.toggleCheck();
        await assert.eventually.isTrue(pill.isChecked());

        await pill.toggleCheck();
        await assert.eventually.isFalse(pill.isChecked());
    });

    it('als gebruiker zie ik een pill button', async () => {
        const pillButton = await vlPillPage.getPillButton();
        await assert.eventually.isTrue(pillButton.isDisplayed());
        await assert.eventually.equal(pillButton.getText(), 'Optie 1');
    });
});
