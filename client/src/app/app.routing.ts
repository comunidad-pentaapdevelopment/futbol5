import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import home
import { HomeComponent } from './components/home.component';

// import user
import { UserEditComponent } from './components/user-edit.component';

// client
import { ClientAddComponent } from './components/client-add.component';
import { ClientListComponent } from './components/client-list.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'clientes/:page', component: ClientListComponent},
	{path: 'crear-cliente', component: ClientAddComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
