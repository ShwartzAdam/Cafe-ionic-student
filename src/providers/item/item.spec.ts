import {ItemProvider} from "./item";

describe('Item Service', () => {
  let service: ItemProvider;
  beforeEach(() => {
    service = new ItemProvider();
  });

  it('Item service should return a defined object from API', () => {
    service.getAllItem().then( res => {
      expect(res).toBeDefined();
    });
  });
  it('Item service should return the right TYPE for any dish', () => {
    let type = 'Drinks';
    service.getAllItemByType('Drinks').then(
      res => {
        let dish = res[0]['type'];
        expect(dish).toMatch(type);
      });
  });


});

