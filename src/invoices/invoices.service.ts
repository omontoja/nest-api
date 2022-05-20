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
    // const invoice = await this.invoicesRepository.create(createInvoiceDto)
    const invoice = new createInvoiceDto
    return invoice
  }

  async findAll() {
    const invoices = await this.invoicesRepository.findAll<Invoice>();
		return invoices;
  }

  async findOne(id: number) {
		const invoice = await this.invoicesRepository.findOne({
			where: { 
				id
			}
		});
    return invoice;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    // const invoice = id;
		// await this.invoicesRepository.update( {
		// 	where: { 
		// 		id
		// 	}
		// });
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
