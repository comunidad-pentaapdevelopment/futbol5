import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

// general
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';

// user
import { UserEditComponent } from './components/user-edit.component';

// client
import { ClientAddComponent } from './components/client-add.component';
import { ClientListComponent } from './components/client-list.component';
import { ClientEditComponent } from './components/client-edit.component';

// Field
import { FieldAddComponent } from './components/field-add.component';
import { FieldEditComponent } from './components/field-edit.component';
import { FieldListComponent } from './components/field-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ClientAddComponent,
    ClientListComponent,
    ClientEditComponent,
    FieldAddComponent,
    FieldEditComponent,
    FieldListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
