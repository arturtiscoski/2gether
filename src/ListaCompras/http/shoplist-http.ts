import Request from '../../http/request';

export default class ShopListHttpService {
    public static index() {
        return Request.get('/listShopList');
    }

    public static save(params: { momento }) {
        return Request.post('/saveShopList', params);
    }
}
