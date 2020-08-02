import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';
import _ from 'lodash';

@Component({
  selector: 'public-list',
  templateUrl: './public-list.component.html',
  styleUrls: ['./public-list.component.scss'],
})
export class PublicProductsComponent {
  constructor(private http: HttpClient) {}
  public products: [];
  public productToDelete;

  getEnabledProducts(): void {
    this.products = [];
    this.http
      .get(`${baseUrl}products?enabled=true`)
      .toPromise()
      .then((result: []) => (this.products = _.sortBy(result, 'id')));
  }

  ngOnInit(): void {
    this.getEnabledProducts();
  }
}
