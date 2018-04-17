export class User {
  public userid: number = 0
  public firstname: string = ""
  public lastname: string = ""
  public email: string = ""
  public password: string = ""
  public phone: string = ""

  public constructor(init?:Partial<User>) {
    Object.assign(this, init);
  }
}

export class Student extends User{
  public credit: number = 0
  public constructor(){
    super();
  }
  public displayMenu(): void{}
  public addItemToBasket(): void{}
  public initOrder(): void{}
  public confOrder(): void{}
  public sendReview(): void{}
  // credit up function didnt write in docs
}

export class Employee extends User{
  public constructor(){
    super();
  }

  public getIncomingOrders(): void{}
  public startMakingOrder(): void{}
  public orderCollectByStudent(): void{}
  public updateOrderList(): void{}
  public readyUpdate(): void{}
}

export class Manager extends User{
  public constructor(){
    super();
  }

  public checkItemQuantity(): void{}
  public checkReview(): void{}
  public getReportsBy(): void{}
  public addEmpToUM(): void{}
  public addNewItem(): void{}
}
