import Request from '../../http/request';

export default class AgendaHttpService {
    public static index(params: { id?: number, day?: string }) {
        return Request.get('/listAgenda', params);
    }

    public static save(params: { momento }) {
        return Request.post('/saveAgenda', params);
    }

    public static saveItem(params: { agendaId, name, id }) {
        return Request.post('/saveAgendaItems', params);
    }

    public static getItems(params: { momento }) {
        return Request.get('/getItems', params);
    }
}
