import {OrderListProvider} from "./order-list";
import {OrderList} from "../../model/orderList";


describe('Order List Service', () => {
  let service: OrderListProvider;
  beforeEach(() => {
    service = new OrderListProvider();
  });
  it('Order List service return a time stamp for student', () => {
    let orderList = new OrderList();
    orderList.totalpreptime = 2;
    orderList.userid = 1;
    orderList.totalprice = 1;
    orderList.hasreview = false;
    orderList.status = 'None';

    service.checkTimeOrderList(orderList).then(res => {
      expect(res).toBeDefined();
    })
  });



});

