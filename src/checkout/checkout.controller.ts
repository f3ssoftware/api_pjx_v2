import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutDto } from './dtos/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  
  @Post()
  async postCheckout(@Body() checkoutDto: CheckoutDto) {
    
    console.log(checkoutDto);
  
    return { message: 'Checkout realizado com sucesso' };
  }
}