import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { FindUserReqDto } from './dto/req.dto';
import { FindUserResDto } from './dto/res.dto';
import { ApiGetItemsResponse, ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from './enum/user.enum';

@ApiTags('User')
@Controller('user')
@ApiExtraModels(FindUserReqDto, FindUserResDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiGetItemsResponse(FindUserResDto)
  async findAll(@Query() { page, size }) {
    return await this.userService.findAll((page = 1), (size = 10));
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  async findOne(@Param() { id }: FindUserReqDto) {
    return await this.userService.findOne(id);
  }
}
