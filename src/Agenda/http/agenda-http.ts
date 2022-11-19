import Request from '../../http/request';

export default class AgendaHttpService {
    public static index(params: { id?: number, day?: string }) {
        return Request.get('/listAgenda', params);
    }

    public static save(params: { momento, name }) {
        return Request.post('/saveAgenda', params);
    }
}
