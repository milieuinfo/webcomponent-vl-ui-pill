const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlPillPage = require('./pages/vl-pill.page');

describe('vl-pill', async () => {
    const vlPillPage = new VlPillPage(driver);

    before(() => {
        return vlPillPage.load();
    });

    it("Als gebruiker kan ik de inhoud van een pill zien", async () => {
        const pill = await vlPillPage.getStandardPill();
        const content = await pill.getContent();
        await assert.equal(content[0].textContent.trim(), 'Optie 1');
    });

    it("Als gebruiker kan ik pillen zien zonder type en succes, waarschuwing en fout pillen", async () => {
        const pill = await vlPillPage.getStandardPill();
        await assert.eventually.isNull(pill.getType());

        const successPill = await vlPillPage.getSuccessPill();
        await assert.eventually.equal(successPill.getType(), 'success');

        const warningPill = await vlPillPage.getWarningPill();
        await assert.eventually.equal(warningPill.getType(), 'warning');

        const errorPill = await vlPillPage.getErrorPill();
        await assert.eventually.equal(errorPill.getType(), 'error');
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
});
