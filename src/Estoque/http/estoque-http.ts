import Request from '../../http/request';

export default class EstoqueHttpService {
    public static index() {
        return Request.get('/listInventory');
    }

    public static save(params) {
        return Request.post('/saveInventory', params);
    }
}
