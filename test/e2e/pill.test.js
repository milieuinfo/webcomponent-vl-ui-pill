
const { assert, driver } = require('vl-ui-core').Test;
const VlPillPage = require('./pages/vl-pill.page');

describe('vl-pill', async () => {
    const vlPillPage = new VlPillPage(driver);

    before(() => {
        return vlPillPage.load();
    });
});
