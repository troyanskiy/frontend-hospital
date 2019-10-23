import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SimulationComponent } from './simulation/simulation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DrugsListComponent } from './simulation/drugs-list/drugs-list.component';
import { StatesDiffComponent } from './simulation/states-diff/states-diff.component';
import { PatientsStatesBeforeAndAfterComponent } from './simulation/results/patients-states-before-and-after.component';
import { HttpClientModule } from '@angular/common/http';
import { DrugsNamesComponent } from './simulation/drugs-names/drugs-names.component';
import { MatTableModule } from '@angular/material/table';
import { GlobalErrorHandler } from './global-error-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SimulationComponent,
    DrugsListComponent,
    StatesDiffComponent,
    PatientsStatesBeforeAndAfterComponent,
    DrugsNamesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
