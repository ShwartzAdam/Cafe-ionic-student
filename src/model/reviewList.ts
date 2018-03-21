export class ReviewList {
  public rlid: number = 0
  public itemid: string = "default"

  public constructor(init?:Partial<ReviewList>) {
    Object.assign(this, init);
  }
}
