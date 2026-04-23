import axios from 'axios';
import getProducts from '../../services/product.service';

jest.mock('axios', () => ({ get: jest.fn() }));

describe('getProducts', () => {
    it('verifica a chamada do endpoint para "/products"', async () => {
        axios.get.mockResolvedValue({data: [{ id: 1 }] });

        await getProducts();

        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/products'));
    });
});