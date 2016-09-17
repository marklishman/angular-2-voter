import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { VoterComponent }   from './voter.component';

@NgModule({
    imports:      [BrowserModule],
    declarations: [VoterComponent],
    bootstrap:    [VoterComponent]
})
export class AppModule { }