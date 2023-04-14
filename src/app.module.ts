import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { Order } from './order/entities/order.entity';
import { Cart } from './cart/entities/cart.entity';
import { OrderItem } from './order-item/entities/order-item.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME, 
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Category, Cart, Order, OrderItem],
      synchronize: false,
    }),
     MulterModule.register({
        dest: './upload',
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
    
    UsersModule,
    
    ProductsModule,
    
    CategoriesModule,
    
    CartModule,
    
    OrderModule,
    
    OrderItemModule,
     
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_PIPE, useClass: ValidationPipe}
  
  ]
})
export class AppModule {}
