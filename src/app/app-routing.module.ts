import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/list.component';
import { PublicProductsComponent } from './public-products/public-list.component';
import { LoginComponent } from './login/login.component';
import { ProductNewEditComponent } from './products/productNewEdit.component';
import { BaseComponent } from './base/base.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'products',
    component: BaseComponent,
    children: [
      { path: 'list', component: ProductsComponent },
      { path: 'public-list', component: PublicProductsComponent },
      { path: 'new-edit', component: ProductNewEditComponent },
      { path: 'new-edit/:id', component: ProductNewEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
