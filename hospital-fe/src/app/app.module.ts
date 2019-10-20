import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SimulationComponent } from './simulation/simulation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DrugsShortComponent } from './simulation/drugs-short/drugs-short.component';
import { StatesDiffShortComponent } from './simulation/states-diff-short/states-diff-short.component';
import { ResultsComponent } from './simulation/results/results.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SimulationComponent,
    DrugsShortComponent,
    StatesDiffShortComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
