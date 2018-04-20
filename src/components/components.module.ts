import { NgModule } from '@angular/core';
import { ItemComponent } from './item/item';
import { FooterNavComponent } from './footer-nav/footer-nav';
@NgModule({
	declarations: [ItemComponent,
    FooterNavComponent,],
	imports: [],
	exports: [ItemComponent,
    FooterNavComponent,]
})
export class ComponentsModule {}
