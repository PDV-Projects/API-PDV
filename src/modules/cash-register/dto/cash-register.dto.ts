import {IsString, IsNumber, IsNotEmpty, IsDate} from 'class-validator'
import { cashRegisterHistoryDto } from './cash-register-history.dto';

type statusType = 'open'| 'close'

export class CashRegisterDto {
  @IsString({message: 'Status deve ser uma String'})
  @IsNotEmpty({ message: 'Status é obrigatório'})
  status: statusType;

  @IsString({message: 'employee deve ser uma string'})
  @IsNotEmpty({message: 'employee é obrigatório'})
  employee: string;

  @IsNumber({}, {message: 'initial_value deve ser um Number'})
  @IsNotEmpty({message: 'Initial_value é obrigatório'})
  initial_value: number;

  @IsNumber()
  @IsNotEmpty()
  close_value: number

  @IsNumber({}, {message: 'sales deve ser um Number'})
  @IsNotEmpty({message: 'sales é obrigatório'})
  sales_value: number;

  @IsDate({message: 'open_at deve ser um Date'})
  @IsNotEmpty({message: 'open_at é obrigatório'})
  open_at: Date;


  history: cashRegisterHistoryDto[]
}