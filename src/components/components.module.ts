import { NgModule } from '@angular/core';
import { ItemComponent } from './item/item';
import { FooterNavComponent } from './footer-nav/footer-nav';
import { ReviewItemComponent } from './review-item/review-item';
import { DrinkQuickComponent } from './quick/drink-quick/drink-quick';
import { FoodQuickComponent } from './quick/food-quick/food-quick';
import { SnackQuickComponent } from './quick/snack-quick/snack-quick';
import { SandQuickComponent } from './quick/sand-quick/sand-quick';
@NgModule({
	declarations: [ItemComponent,
    FooterNavComponent,
    ReviewItemComponent,
    DrinkQuickComponent,
    FoodQuickComponent,
    SnackQuickComponent,
    SandQuickComponent,],
	imports: [],
	exports: [ItemComponent,
    FooterNavComponent,
    ReviewItemComponent,
    DrinkQuickComponent,
    FoodQuickComponent,
    SnackQuickComponent,
    SandQuickComponent,]
})
export class ComponentsModule {}
