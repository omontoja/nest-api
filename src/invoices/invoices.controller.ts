import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    if (createInvoiceDto.code.length > 44 || createInvoiceDto.code.length < 44) {
      throw new HttpException('Somente 44 digitos', HttpStatus.FORBIDDEN);
    }
    const hasInvoice = await this.invoicesService.findByCode(createInvoiceDto.code);
    if  (hasInvoice && hasInvoice.status == 'left'){
       throw new HttpException('Saiu para entrega e não retornou', HttpStatus.FORBIDDEN);
    }
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    if (updateInvoiceDto.code.length > 44 || updateInvoiceDto.code.length < 44) {
      throw new HttpException('Somente 44 digitos', HttpStatus.FORBIDDEN);
    }
    const hasInvoice = await this.invoicesService.findByCode(updateInvoiceDto.code);
    if (hasInvoice.status == 'left'){
       throw new HttpException('Saiu para entrega e não retornou', HttpStatus.FORBIDDEN);
    }
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }

  @Patch('/left/:id')
  async updateLeft(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto){
    const hasInvoice = await this.invoicesService.findOne(+id);
    if (hasInvoice.status == 'left'){
       throw new HttpException('Saiu para entrega e não retornou', HttpStatus.FORBIDDEN);
    }
    return this.invoicesService.updateLeft(+id, updateInvoiceDto);
  }

  @Patch('/returned/:id')
  async updateReturn(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto){
    return this.invoicesService.updateReturn(+id, updateInvoiceDto);
  }
}
