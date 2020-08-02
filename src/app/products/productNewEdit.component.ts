import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { baseUrl } from '../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'new-edit',
  templateUrl: './productNewEdit.component.html',
  styleUrls: ['./productNewEdit.component.scss'],
})
export class ProductNewEditComponent {
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  title: string;
  editing: boolean;
  id: string;
  public product: {
    name: string;
    description: string;
    enabled: boolean;
  };

  ngOnInit(): void {
    this.product = {
      name: '',
      description: '',
      enabled: false,
    };
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.blockUI.start('');
      this.title = 'Edit';
      this.editing = true;
      this.http
        .get(`${baseUrl}products/${this.id}`)
        .subscribe((result: any) => {
          this.product = {
            name: result.name,
            description: result.description,
            enabled: result.enabled,
          };
          this.blockUI.stop();
        });
    } else {
      this.editing = false;
      this.title = 'New';
    }
  }

  onSubmit(product): void {
    this.blockUI.start('');
    if (this.editing) {
      const editedFields = {
        name: !_.isEqual(this.product.name, product.name)
          ? product.name
          : undefined,
        description: !_.isEqual(this.product.description, product.description)
          ? product.description
          : undefined,
        enabled: !_.isEqual(this.product.enabled, product.enabled)
          ? product.enabled
          : undefined,
      };
      this.http
        .put(`${baseUrl}products/${this.id}`, editedFields)
        .subscribe(() => {
          this.blockUI.stop();
          this.router.navigate(['/products/list']);
        });
    } else {
      this.http.post(`${baseUrl}products`, product).subscribe(() => {
        this.blockUI.stop();
        this.router.navigate(['/products/list']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products/list']);
  }
}
