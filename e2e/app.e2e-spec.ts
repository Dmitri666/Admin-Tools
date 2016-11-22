import { EKuKAdminPage } from './app.po';

describe('e-ku-k-admin App', function() {
  let page: EKuKAdminPage;

  beforeEach(() => {
    page = new EKuKAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
