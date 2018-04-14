export class User {
  public userid: number = 0
  public email: string = ""
  public password: string = ""
  public firstname: string = ""
  public lastname: string = ""
  public phone: string = ""
  public image: string = ""

  public constructor(init?:Partial<User>) {
    Object.assign(this, init);
  }
  get _userid(){return this.userid}
  get _email(){return this.email}
  get _password(){return this.password}
  get _firstname(){return this.firstname}
  get _lastname(){return this.lastname}
  get _phone(){return this.phone}
  get _image(){return this.image}

  set _userid(value){this.userid = value}
  set _email(value){this.email = value}
  set _password(value){this.password = value}
  set _firstname(value){this.firstname = value}
  set _lastname(value){this.lastname = value}
  set _phone(value){this.phone = value}
  set _image(value){this.image = value}

  public login(): void {}
  public signup(): void {}
  public forgotpass():void {}
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
