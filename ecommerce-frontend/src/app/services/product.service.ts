import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private productCategoryBaseUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {
  }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchByCategoryUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponse>(searchByCategoryUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductgategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetProductCategoryResponse>(this.productCategoryBaseUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

