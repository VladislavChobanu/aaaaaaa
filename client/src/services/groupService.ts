import type { AxiosInstance } from 'axios';
import axiosInstance from './apiInstance';
import type { GroupType } from '../types/GroupType';

class GroupService {
  constructor(private readonly api: AxiosInstance) {}

  public async getGroups(): Promise<GroupType[]> {
    const response = await this.api.get<GroupType[]>('/group');
    return response.data;
  }

}


export default new GroupService(axiosInstance);