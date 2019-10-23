import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SimulationComponent } from './simulation/simulation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DrugListComponent } from './simulation/drug-list/drug-list.component';
import { StateDiffComponent } from './simulation/state-diff/state-diff.component';
import { StatesReportTableComponent } from './simulation/states-report-table/states-report-table.component';
import { HttpClientModule } from '@angular/common/http';
import { DrugsPanelComponent } from './simulation/drugs-panel/drugs-panel.component';
import { MatTableModule } from '@angular/material/table';
import { GlobalErrorHandler } from './global-error-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SimulationComponent,
    DrugListComponent,
    StateDiffComponent,
    StatesReportTableComponent,
    DrugsPanelComponent,
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
