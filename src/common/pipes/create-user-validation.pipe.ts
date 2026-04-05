import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateUserDto } from '@modules/users/dto/createUser.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 1. Verifica se há dados
    if (!value || Object.keys(value).length === 0) {
      throw new BadRequestException('Nenhum dado foi enviado');
    }

    // 2. Converte para a instância da classe DTO
    // Se o metatype não for fornecido ou for um tipo simples, usa o CreateUserDto diretamente
    const targetMetadata = metatype || CreateUserDto;
    const object = plainToInstance(targetMetadata, value);

    // 3. Valida
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      // Formata os erros de forma amigável
      const errorMessages = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints ? Object.values(error.constraints) : [],
      }));

      // 4. Lança a exceção com o OBJETO, não string
      throw new BadRequestException({
        message: 'Validação falhou',
        errors: errorMessages, // Removido o JSON.stringify
      });
    }

    return object;
  }
}
