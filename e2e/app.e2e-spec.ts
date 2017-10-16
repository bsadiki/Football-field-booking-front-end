import { TerrainReservationPage } from './app.po';

describe('terrain-reservation App', () => {
  let page: TerrainReservationPage;

  beforeEach(() => {
    page = new TerrainReservationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
