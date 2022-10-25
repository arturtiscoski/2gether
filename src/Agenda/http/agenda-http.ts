import Request from '../../http/request';

export default class AgendaHttpService {
    private static uri = 'listAgenda';

    public static index(params: { id?: number }) {
        return Request.get(`${this.uri}/${params.id}`);
    }
}
