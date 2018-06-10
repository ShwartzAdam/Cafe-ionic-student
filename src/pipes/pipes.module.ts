import { NgModule } from '@angular/core';
import { CapitalizeFirstPipe } from './capitalize-first/capitalize-first';
@NgModule({
	declarations: [CapitalizeFirstPipe],
	imports: [],
	exports: [CapitalizeFirstPipe]
})
export class PipesModule {}
