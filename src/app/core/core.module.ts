import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './pipe/search.pipe';
import { SortPipe } from './pipe/sort.pipe';


@NgModule({
    declarations: [



  ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
    ]
})
export class CoreModule {}
