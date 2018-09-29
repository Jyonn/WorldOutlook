class WorldOutlook {
    static staticConstructor() {
        this.S_MAIN = 0;
        this.S_WHYDONATE = 1;
        this.S_CONFIG = 2;
        this.S_PLATFORM = 3;
        this.S_DONATE = 4;
        this.S_TABLE = [
            [this.S_MAIN, 'main'],
            [this.S_WHYDONATE, 'why-donate'],
            [this.S_CONFIG, 'config'],
            [this.S_PLATFORM, 'platform'],
            [this.S_DONATE, 'donate'],
        ];

        this.P_ALIPAY = 0;
        this.P_WEIXIN = 1;
        this.P_TABLE = [
            this.P_ALIPAY,
            this.P_WEIXIN,
        ];

        this.PF_CLIENT = 0;
        this.PF_TUTORIAL = 1;
    };

    constructor({
        // 页面状态
        // pageStatus,
        centerContainer,
        loginMask,

        // 上方用户栏
        greeting,
        userAvatar,
        userAvatarLink,

        // 主页面元素
        touchWorldBtn,
        donateBtn,
        whyDonateBtn,

        // 帮助中心
        helpText,
        whyDonateText,
        downloadClientBtn,
        viewTutorialBtn,

        // 配置中心元素
        switchVpnBtn,
        resetConfigBtn,
        port,
        password,
        configBackHomeBtn,
        ssQrcode,
        qrcodeHint,

        // 捐助页面元素
        alipayBox,
        weixinBox,
        // firstPayment,
        donateBackHomeBtn,
        movingBar,
        donateQrcode,

        // platform
        mainBtns,
        platformBox,
        pfWindows,
        pfAndroid,
        pfiOS,
        pfmacOS,
        platformBackHomeBtn,
    }) {
        let this_ = this;

        this.centerContainer = WorldOutlook.getEle(centerContainer);
        this.loginMask = WorldOutlook.getEle(loginMask);

        this.greeting = WorldOutlook.getEle(greeting);
        this.userAvatar = WorldOutlook.getEle(userAvatar);
        this.userAvatarLink = WorldOutlook.getEle(userAvatarLink);

        this.touchWorldBtn = WorldOutlook.getEle(touchWorldBtn);
        this.donateBtn = WorldOutlook.getEle(donateBtn);
        this.whyDonateBtn = WorldOutlook.getEle(whyDonateBtn);

        this.helpText = WorldOutlook.getEle(helpText);
        this.whyDonateText = WorldOutlook.getEle(whyDonateText);
        this.downloadClientBtn = WorldOutlook.getEle(downloadClientBtn);
        this.viewTutorialBtn = WorldOutlook.getEle(viewTutorialBtn);

        this.switchVpnBtn = WorldOutlook.getEle(switchVpnBtn);
        this.resetConfigBtn = WorldOutlook.getEle(resetConfigBtn);
        this.port = WorldOutlook.getEle(port);
        this.password = WorldOutlook.getEle(password);
        this.configBackHomeBtn = WorldOutlook.getEle(configBackHomeBtn);
        this.ssQrcode = WorldOutlook.getEle(ssQrcode);
        this.qrcodeHint = WorldOutlook.getEle(qrcodeHint);

        this.alipayBox = WorldOutlook.getEle(alipayBox);
        this.weixinBox = WorldOutlook.getEle(weixinBox);
        // this.firstPayment = WorldOutlook.formatFirstPayment(firstPayment);
        this.donateBackHomeBtn = WorldOutlook.getEle(donateBackHomeBtn);
        this.movingBar = WorldOutlook.getEle(movingBar);
        this.donateQrcode = WorldOutlook.getEle(donateQrcode);

        this.mainBtns = WorldOutlook.getEle(mainBtns);
        this.platformBox = WorldOutlook.getEle(platformBox);
        this.pfWindows = WorldOutlook.getEle(pfWindows);
        this.pfAndroid = WorldOutlook.getEle(pfAndroid);
        this.pfiOS = WorldOutlook.getEle(pfiOS);
        this.pfmacOS = WorldOutlook.getEle(pfmacOS);
        this.platformBackHomeBtn = WorldOutlook.getEle(platformBackHomeBtn);

        this.platforms = {
            windows: {
                element: this.pfWindows,
                client: 'https://s.6-79.cn/UqdRWo',
                // tutorial:
            },
            android: {
                element: this.pfAndroid,
                client: 'https://s.6-79.cn/J1OvfD',
            },
            ios: {
                element: this.pfiOS,
                client: 'https://s.6-79.cn/LwPo51',
            },
            macos: {
                element: this.pfmacOS,
                client: 'https://s.6-79.cn/Ikrz1W',
            },
        };

        this.touchWorldBtn.addEventListener('click', () => {this_.setPageStatus(WorldOutlook.S_CONFIG)});
        this.donateBtn.addEventListener('click', () => {this_.setPageStatus(WorldOutlook.S_DONATE)});
        this.whyDonateBtn.addEventListener('click', () => {
            if (this_.pageStatus === WorldOutlook.S_MAIN) {
                this_.setPageStatus(WorldOutlook.S_WHYDONATE);
            } else {
                this_.setPageStatus(WorldOutlook.S_MAIN);
            }
        });
        this.configBackHomeBtn.addEventListener('click', () => {this_.setPageStatus(WorldOutlook.S_MAIN)});
        this.donateBackHomeBtn.addEventListener('click', () => {this_.setPageStatus(WorldOutlook.S_MAIN)});
        this.downloadClientBtn.addEventListener('click', () => {
            this_.platformUsage = WorldOutlook.PF_CLIENT;
            this_.setPageStatus(WorldOutlook.S_PLATFORM)
        });
        this.viewTutorialBtn.addEventListener('click', () => {
            this_.platformUsage = WorldOutlook.PF_TUTORIAL;
            this_.setPageStatus(WorldOutlook.S_PLATFORM);
        });

        let backToMainListener = function () {
            this_.setPageStatus(WorldOutlook.S_MAIN);
        };
        this.pfmacOS.addEventListener('click', backToMainListener);
        this.pfiOS.addEventListener('click', backToMainListener);
        this.pfAndroid.addEventListener('click', backToMainListener);
        this.pfWindows.addEventListener('click', backToMainListener);
        this.platformBackHomeBtn.addEventListener('click', backToMainListener);

        this.alipayBox.addEventListener('click', () => this_.setFirstPayment(WorldOutlook.P_ALIPAY));
        this.weixinBox.addEventListener('click', () => this_.setFirstPayment(WorldOutlook.P_WEIXIN));

        this.qrcodeJS = new QRCode(this.ssQrcode, {
            width: 128,
            height: 128,
        });

        let dealUserDictSucc = function(body) {
            this_.greeting.innerText = `你好，${body.nickname}`;
            this_.userAvatar.style.backgroundImage = `url("${body.avatar}")`;
            this_.userAvatarLink.href = 'https://sso.6-79.cn/user/info-modify?from=https%3A%2F%2Fworld.6-79.cn%2F';
            this_.ss_on = body.ss_on;
            if (this_.ss_on) {
                this_.port.innerText = body.port;
                this_.password.innerText = body.ss_pwd;
                this_.switchVpnBtn.innerText = '关闭VPN';
                this_.ss_link = 'ss://' + window.btoa('aes-256-cfb:'+body.ss_pwd+'@65.49.195.248:'+body.port);
                this_.qrcodeJS.clear();
                this_.qrcodeJS.makeCode(this_.ssQrcode, {
                    text: this_.ss_link,
                });
                activate(this_.ssQrcode);
                deactivate(this_.qrcodeHint);
            } else {
                this_.port.innerText = 'VPN尚未开启';
                this_.password.innerText = 'VPN尚未开启';
                this_.switchVpnBtn.innerText = '开启VPN';
                deactivate(this_.ssQrcode);
                activate(this_.qrcodeHint);
            }
        };

        this.makeRequest = false;

        this.switchVpnBtn.addEventListener('click', () => {
            let action = (this_.ss_on) ? 'off' : 'on';
            if (this_.makeRequest) {
                InfoCenter.push(new Info('正在处理请求，请勿重复操作', Info.TYPE_SUCC));
                return;
            }
            this_.makeRequest = true;
            Service.changeVpnStatus({action: action})
                .then(dealUserDictSucc)
                .finally(() => {
                    this_.makeRequest = false;
                });
        });

        this.resetConfigBtn.addEventListener('click', () => {
            if (this_.makeRequest) {
                InfoCenter.push(new Info('正在处理请求，请勿重复操作', Info.TYPE_SUCC));
                return;
            }
            this_.makeRequest = true;
            Service.changeVpnStatus({action: 'reset'})
                .then(dealUserDictSucc)
                .finally(() => {
                    this_.makeRequest = false;
                });
        });

        // try login
        Service.getMyInfoAPI()
            .then(dealUserDictSucc)
            .catch(() => {
                this_.greeting.innerText = '你好，请登录';
                this_.userAvatar.style.backgroundImage = 'url("../image/unlogin.png")';
                this_.userAvatarLink.href = 'https://sso.6-79.cn/oauth/?app_id=dyELDvojaEiaX1JZAxJrcb1xxElvuo94&state=/';
            })
            .finally(() => {
                fadeOut(this_.loginMask);
                fadeIn(this_.centerContainer);
            });
    }

    setPageStatus(pageStatus) {
        let this_ = this;

        this.pageStatus = WorldOutlook.formatPageStatus(pageStatus);
        WorldOutlook.S_TABLE.forEach((item) => {
            removeClass(this_.centerContainer, item[1]);
        });
        addCLass(this.centerContainer, WorldOutlook.S_TABLE[this.pageStatus][1]);

        switch (this.pageStatus) {
            case WorldOutlook.S_MAIN:
                this.whyDonateBtn.innerText = '?';
                deactivate(this_.whyDonateText);
                activate(this_.helpText);
                deactivate(this_.platformBox);
                activate(this_.mainBtns);
                break;
            case WorldOutlook.S_WHYDONATE:
                this.whyDonateBtn.innerText = '✓';
                deactivate(this_.helpText);
                activate(this_.whyDonateText);
                break;
            case WorldOutlook.S_PLATFORM:
                deactivate(this_.mainBtns);
                activate(this_.platformBox);
                for (let platform in this.platforms) {
                    if (this.platforms.hasOwnProperty(platform)) {
                        if (this.platformUsage === WorldOutlook.PF_CLIENT)
                            this.platforms[platform].element.href = this.platforms[platform].client;
                        else
                            this.platforms[platform].element.href = this.platforms[platform].tutorial;
                    }
                }
                break;
        }
    }

    setFirstPayment(firstPayment) {
        this.firstPayment = WorldOutlook.formatFirstPayment(firstPayment);
        if (this.firstPayment === WorldOutlook.P_ALIPAY) {
            activate(this.alipayBox);
            deactivate(this.weixinBox);
            replaceClass(this.movingBar, weixin, alipay);
            replaceClass(this.donateQrcode, weixin, alipay);
        } else {
            activate(this.weixinBox);
            deactivate(this.alipayBox);
            replaceClass(this.movingBar, alipay, weixin);
            replaceClass(this.donateQrcode, alipay, weixin);
        }
    }

    static formatPageStatus(pageStatus) {
        for (let i = 0; i < this.S_TABLE.length; i++)
            if (this.S_TABLE[i][0] === pageStatus)
                return pageStatus;
        return this.S_MAIN;
    }

    static formatFirstPayment(firstPayment) {
        for (let i = 0; i < this.P_TABLE.length; i++)
            if (this.P_TABLE[i] === firstPayment)
                return i;
        return this.P_ALIPAY;
    }

    static getEle(id) {
        return document.getElementById(id);
    }
}

WorldOutlook.staticConstructor();
