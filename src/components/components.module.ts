import { NgModule } from '@angular/core';
import { ItemComponent } from './item/item';
import { FooterNavComponent } from './footer-nav/footer-nav';
import { ReviewItemComponent } from './review-item/review-item';
import { DrinkQuickComponent } from './quick/drink-quick/drink-quick';
import { SnackQuickComponent } from './quick/snack-quick/snack-quick';
import { SandQuickComponent } from './quick/sand-quick/sand-quick';
import {CorDrinkQuickComponent} from "./quick/cor-drink-quick/cor-drink-quick";
import { InfoItemComponent } from './info-item/info-item';
@NgModule({
	declarations: [ItemComponent,
    FooterNavComponent,
    ReviewItemComponent,
    DrinkQuickComponent,
    CorDrinkQuickComponent,
    SnackQuickComponent,
    SandQuickComponent,
    InfoItemComponent,],
	imports: [],
	exports: [ItemComponent,
    FooterNavComponent,
    ReviewItemComponent,
    DrinkQuickComponent,
    CorDrinkQuickComponent,
    SnackQuickComponent,
    SandQuickComponent,
    InfoItemComponent,]
})
export class ComponentsModule {}
