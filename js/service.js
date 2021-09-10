class Service {
    static qtbCallbackAPI({code}) {
        return Request.get('/api/oauth/callback', arguments[0]);
    }

    static getErrorAPI() {
        return Request.get('/api/base/errors');
    }

    static getMyInfoAPI() {
        return Request.get('/api/user/');
    }

    static changeVpnStatus({action}) {
        return Request.put('/api/user/ss', arguments[0]);
    }
}
