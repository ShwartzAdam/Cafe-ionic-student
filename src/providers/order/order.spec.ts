import {OrderProvider} from "./order";

describe('Order Service', () => {
  let service: OrderProvider;
  beforeEach(() => {
    service = new OrderProvider();
  });
  it('Order service should return a defined object from API by using order list id', () => {
    service.getOrdersByOrderListId(100).then(res => {
      expect(res).toBeDefined();
    })
  });
  it('Order service should works successfully and return 200 status ', () => {
    service.getOrdersByOrderListId(100).then(res => {
      let status = res['status'];
      expect(status).toEqual(200);
    })
  });


});

