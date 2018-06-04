import { NgModule } from '@angular/core';
import { ItemComponent } from './item/item';
import { FooterNavComponent } from './footer-nav/footer-nav';
import { ReviewItemComponent } from './review-item/review-item';
@NgModule({
	declarations: [ItemComponent,
    FooterNavComponent,
    ReviewItemComponent,],
	imports: [],
	exports: [ItemComponent,
    FooterNavComponent,
    ReviewItemComponent,]
})
export class ComponentsModule {}
