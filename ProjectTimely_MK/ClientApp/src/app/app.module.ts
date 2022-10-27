import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './shared.service';

import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { StopDialogComponent } from './stop-dialog/stop-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { StopComponent } from './stop/stop.component';
import { ProjectTableComponent } from './project-table/project-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    StopComponent,
    ProjectTableComponent,
    StopDialogComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'start', component: StartComponent },
      { path: 'stop', component: StopComponent },
    ])
  ],
  entryComponents: [StopDialogComponent, EditDialogComponent],
  providers: [SharedService],
  bootstrap: [AppComponent]
})

export class AppModule { }
