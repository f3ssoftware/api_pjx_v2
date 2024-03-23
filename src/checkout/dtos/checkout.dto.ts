import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsNotEmpty,
    IsDateString,
    MinLength,
    MaxLength,
    IsInt,
    IsCreditCard,
    IsEmail,
    IsPhoneNumber,
    IsPostalCode
} from 'class-validator'


export class CheckoutDto {

    @IsEmail()
    email: string;

    @IsPhoneNumber('BR')
    phone: number;

    @IsDateString()
    birthdate: string;

    @IsString()
    cpf: string;

    @IsString()
    state: string;

    @IsString()
    city: string;

    @IsString()
    district: string;

    @IsPostalCode('BR')
    @IsString()
    zipcode: string;

    @IsString()
    number: string;

    @IsString()
    complement: string;

    @IsNotEmpty()
    card_name: string;
  
    @IsCreditCard()
    card_number: string;
  
    @IsInt()
    @Min(1)
    @Max(12)
    exp_month: number;
  
    @IsInt()
    @Min(2024)
    exp_year: number;
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(4)
    cvv: string;
  
    @IsInt()
    @Min(1)
    installments: number;

}