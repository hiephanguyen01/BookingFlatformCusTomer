import { BaseService } from "./baseService";

export class BankService extends BaseService {
  getBank = () => {
    return this.get(`/api/bank`);
  };
}

export const bankService = new BankService();
