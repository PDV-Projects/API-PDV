import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoginDto } from '@modules/auth/dto/login.dto';

@Injectable()
export class LoginValidationPipe implements PipeTransform<any> {
  async transform(value: any) {
    // Verifica se o valor existe
    if (value === undefined || value === null) {
      throw new BadRequestException('Nenhum dado foi enviado');
    }

    // Converte para a classe DTO
    const loginDto = plainToClass(LoginDto, value);
    
    // Valida o DTO
    const errors = await validate(loginDto, {
      skipMissingProperties: false, // Garante que campos obrigatórios sejam verificados
      whitelist: true, // Remove propriedades não decoradas
      forbidNonWhitelisted: true // Rejeita propriedades não decoradas
    });

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      });
      throw new BadRequestException({
        message: 'Validação falhou',
        errors: errorMessages,
      });
    }

    return loginDto;
  }
}