export class Review {
  public revid: number = 0
  public userid: number = 0
  public rlid: number = 0
  public stars: number = 0
  public comment: string = "default"

  public constructor(init?:Partial<Review>) {
    Object.assign(this, init);
  }
}
