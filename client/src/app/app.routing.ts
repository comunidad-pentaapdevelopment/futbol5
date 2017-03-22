import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import home
import { HomeComponent } from './components/home.component';

// import user
import { UserEditComponent } from './components/user-edit.component';

// client
import { ClientAddComponent } from './components/client-add.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: 'crear-cliente', component: ClientAddComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
