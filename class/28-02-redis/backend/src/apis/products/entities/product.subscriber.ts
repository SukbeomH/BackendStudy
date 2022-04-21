import { BigQuery } from '@google-cloud/bigquery';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>) {
    const bigQuery = new BigQuery({
      keyFilename: process.env.BIGQUERY_KEY_FILENAME,
      projectId: process.env.BIGQUERY_PROJECT_ID,
    });

    bigQuery
      .dataset('class_bigquery')
      .table('classTable')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}
