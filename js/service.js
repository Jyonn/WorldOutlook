class Service {
    static qtbCallbackAPI({code}) {
        return Request.get('/oauth/qtb/callback', arguments[0]);
    }

    static getMyInfoAPI() {
        return Request.get('/user/');
    }

    static changeVpnStatus({action}) {
        return Request.put('/user/ss', arguments[0]);
    }
}
