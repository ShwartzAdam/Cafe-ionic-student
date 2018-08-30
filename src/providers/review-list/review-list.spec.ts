import {ReviewListProvider} from "./review-list";


describe('Review List Service', () => {
  let service: ReviewListProvider;
  beforeEach(() => {
    service = new ReviewListProvider();
  });
  it('Review List service should returned an Item from API', () => {
    service.getReviewListForItem(20).then( res => {
      expect(res).toBeDefined();
    });
  });

});

