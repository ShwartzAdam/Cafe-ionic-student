import {Order} from "./order";

export class OrderList {
  public olid: number = 0
  public userid: number = 0
  public totalprice: number = 0
  public ol_dttm: string = "default"
  public status: string = "default"

  public order: Order[];

  public constructor(init?:Partial<OrderList>) {
    Object.assign(this, init);
  }

  public init(): void{}
  public activateOrderList(): void{}
  public decItemsFromMenu(): void{}
  public changeStatus(): void{}
  public notifyStudent(): void{}

}
