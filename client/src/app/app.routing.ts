import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import home
import { HomeComponent } from './components/home.component';

// import user
import { UserEditComponent } from './components/user-edit.component';

// client
import { ClientAddComponent } from './components/client-add.component';
import { ClientListComponent } from './components/client-list.component';
import { ClientEditComponent } from './components/client-edit.component';

// Field
import { FieldAddComponent } from './components/field-add.component';
import { FieldEditComponent } from './components/field-edit.component';
import { FieldListComponent } from './components/field-list.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'clientes/:page', component: ClientListComponent},
	{path: 'crear-cliente', component: ClientAddComponent},
	{path: 'editar-cliente/:id', component: ClientEditComponent},
	{path: 'crear-cancha', component: FieldAddComponent},
	{path: 'editar-cancha/:id', component: FieldEditComponent},
	{path: 'canchas/:page', component: FieldListComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
