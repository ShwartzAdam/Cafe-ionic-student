export class ReviewList {
  public rlid: number = 0
  public itemid: number = 0

  public constructor(init?:Partial<ReviewList>) {
    Object.assign(this, init);
  }
}
