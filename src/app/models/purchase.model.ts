import { CartItem } from './cart-item.model';

export interface Purchase {
  orderId: string;
  orderDate: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Completed' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
