import {
    Controller,
    Get,
    Post,
    Patch,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async index() {
        return {
            statusCode: HttpStatus.OK,
            data: await this.usersService.index(),
        }
    }

    @Post()
    async create(@Body() data: UsersDTO) {
        return {
            statusCode: HttpStatus.OK,
            message: 'User Added Successfully',
            data: await this.usersService.create(data),
        }
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return {
            statusCode: HttpStatus.OK,
            data: await this.usersService.show(id),
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UsersDTO) {
        return {
            statusCode: HttpStatus.OK,
            message: 'User update succesfully',
            data: await this.usersService.update(id, data),
        }

    }

    @Delete(':id')
    async destroy(@Param('id') id: number) {
        await this.usersService.destroy(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        }
    }
}
