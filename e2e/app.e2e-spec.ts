import { QuestoAdminToolPage } from './app.po';

describe('questo-admin-tool App', function() {
  let page: QuestoAdminToolPage;

  beforeEach(() => {
    page = new QuestoAdminToolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
