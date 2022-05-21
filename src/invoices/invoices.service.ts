import { Injectable, Inject } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @Inject('INVOICES_REPOSITORY')
    private invoicesRepository: typeof Invoice
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return  await this.invoicesRepository.create<Invoice>(createInvoiceDto as any)
  }

  async findAll() {
    return await this.invoicesRepository.findAll<Invoice>();
  }

  async findOne(id: number) {
    return this.invoicesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesRepository.update({ ...updateInvoiceDto }, { where: { id } });
  }

  remove(id: number) {
    return this.invoicesRepository.destroy({ where: { id } });
  }
}