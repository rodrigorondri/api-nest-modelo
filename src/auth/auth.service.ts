import { BadRequestException, ConflictException, Injectable, UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Use raw: false para obter a instância do modelo completo
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Acesse a senha corretamente
    const userPassword = user.getDataValue('password');
    
    if (!userPassword) {
      throw new UnauthorizedException('Senha não configurada para este usuário');
    }

    const isPasswordValid = await bcrypt.compare(password, userPassword);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Retorna o usuário sem a senha
    const userPlain = user.get({ plain: true });
    const { password: _, ...result } = userPlain;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    // Hash da senha com salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Garantindo que a senha não será retornada
    const { password, ...result } = newUser.get({ plain: true });
    return result;
  }
}