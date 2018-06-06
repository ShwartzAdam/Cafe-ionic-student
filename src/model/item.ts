export class Item {
  public itemid: number = 0
  public supid: number = 0
  public name: string = "default"
  public description: string = "default"
  public qty: number = 0
  public url: string = "default"
  public price: number = 0
  public type: string = "default"
  public ispublished: boolean = false;
  public preptime: number = 0;

  public constructor(init?:Partial<Item>) {
    Object.assign(this, init);
  }

}
