import { Test, TestingModule } from '@nestjs/testing';
import { AxiosAdapterService } from './axios.adapter.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosAdapterService', () => {
  let service: AxiosAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosAdapterService],
    }).compile();

    service = module.get<AxiosAdapterService>(AxiosAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data from the API call', (done) => {
    const mockData = { data: 'test data' };
    mockedAxios.get.mockResolvedValue(mockData);

    service.get('http://pokeurl.com').subscribe({
      next: (data) => {
        expect(data).toEqual('test data');
        expect(mockedAxios.get).toHaveBeenCalledWith('http://pokeurl.com');
        done();
      },
    });
  });
});
