import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ProductsComponent {
  @BlockUI() blockUI: NgBlockUI;
  constructor(private router: Router, private http: HttpClient) {}
  public products: any[];
  public productToDelete;

  getProducts(): void {
    this.products = [];
    this.http
      .get(`${baseUrl}products`)
      .toPromise()
      .then((result: []) => (this.products = _.sortBy(result, 'id')));
  }

  ngOnInit(): void {
    this.getProducts();
  }

  newProduct(): void {
    this.router.navigate(['/products/new-edit']);
  }

  editProduct(product): void {
    this.router.navigate([`/products/new-edit/${product.id}`]);
  }

  getProductToDel(product): void {
    this.productToDelete = product;
  }

  deleteProduct(product): void {
    this.blockUI.start('');
    this.http
      .delete(`${baseUrl}products/${product.id}`)
      .toPromise()
      .then(() => this.getProducts())
      .then(() => this.blockUI.stop());
  }
}
