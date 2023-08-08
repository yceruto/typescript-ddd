import { AggregateRoot } from '@lib/shared/domain/model';
import { ProductCreatedEvent } from '../event/product-created.event';
import { ProductUpdatedEvent } from '../event/product-updated.event';
import { ProductId } from './product-id';
import { ProductName } from './product-name';
import { ProductPrice } from './product-price';
import { ProductStock } from './product-stock';

export interface UpdateProductProps {
  name: ProductName;
  price: ProductPrice;
}

export interface CreateProductProps extends UpdateProductProps {
  id: ProductId;
  stock: ProductStock;
}

export class Product extends AggregateRoot {
  public static create(props: CreateProductProps): Product {
    const product = new Product(
      props.id,
      props.name,
      props.price,
      props.stock,
      new Date()
    );
    product.pushEvent(new ProductCreatedEvent(product.id));

    return product;
  }

  public update(props: UpdateProductProps) {
    this.name = props.name;
    this.price = props.price;
    this.updatedAt = new Date();
    this.pushEvent(new ProductUpdatedEvent(this.id));
  }

  public getId(): ProductId {
    return this.id;
  }

  public getName(): ProductName {
    return this.name;
  }

  public getPrice(): ProductPrice {
    return this.price;
  }

  public getStock(): ProductStock {
    return this.stock;
  }

  public increaseStock(quantity: number = 1): void {
    this.stock = this.stock.increase(quantity);
  }

  public decreaseStock(quantity: number = 1): void {
    this.stock = this.stock.decrease(quantity);
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  private constructor(
    private readonly id: ProductId,
    private name: ProductName,
    private price: ProductPrice,
    private stock: ProductStock,
    private readonly createdAt: Date,
    private updatedAt?: Date,
  ) {
    super();
  }
}