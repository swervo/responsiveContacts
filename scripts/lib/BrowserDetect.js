'use strict';

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version';
        this.OS = this.searchString(this.dataOS) || 'an unknown OS';
        this.platform = navigator.platform;

        this.isIos = (this.platform === 'iPhone' || this.platform === 'iPad'|| this.platform === 'iPod');
        $('html').addClass('browserDetect_' + this.platform.replace(' ', '_'));
        if (this.isIos) {
            $('html').addClass('isIos');
        }
        this.isIPad = this.platform === 'iPad';

        this.isTabletSize = 'unknown';

        if (this.platform === 'iPad'){
            this.isTabletSize = true;
        } else {
            //determine by browser resolution
            //not totally reliable
            this.isTabletSize = this.isTabletResolution();
            console.log('tablet size determined by resolution check. tabletSize: ' + this.isTabletSize);
        }

        this.isFastWebkit = (this.isIos || this.browser === 'Safari' || this.browser === 'Chrome');
        this.isMSPointerEnabled = (navigator.msPointerEnabled);

        this.tap = 'click';

        // NOTE: There is no double tap in iOS nor doubl click, just expect click
        this.dbltap = (this.isIos ? 'click' : 'dblclick');
        if(this.isIos) {
            this.touchstart = 'touchstart';
            this.touchmove = 'touchmove';
            this.touchend = 'touchend';
            this.touchcancel = 'touchcancel';
        } else if (this.isMSPointerEnabled) { // ie10
            this.touchstart = 'MSPointerDown';
            this.touchmove = 'MSPointerMove';
            this.touchend = 'MSPointerUp';
            this.touchcancel = 'MSPointerCancel';
        } else if (this.isIeInSilverlightWebView) {
            this.touchstart = 'onmousedown';
            this.touchmove = 'onmousemove';
            this.touchend = 'onmouseup';
            this.touchcancel = 'onmousecancel';
        } else {
            this.touchstart = 'mousedown';
            this.touchmove = 'mousemove';
            this.touchend = 'mouseup';
            this.touchcancel = 'mousecancel';
        }

        this.touchEventIdentifier = navigator.appVersion.match(/MSIE /) ? 'pointerId' : 'identifier';

        console.log('BT: platform: ' + this.platform);
        console.log('BT: tap: ' + this.tap);
        console.log('BT: isTabletResolution: ' + this.isTabletSize);
        console.log('BT: touchstart: ' + this.touchstart);
        console.log('BT: touchmove: ' + this.touchmove);
        console.log('BT: touchend: ' + this.touchend);
    },
    /**determine tabletsize using the browser resolution**/
    isTabletResolution: function() {
        //for starters we just check the width of our main html
        //we may start having problems with this when we take landscape mode into account
        var w = $('html').width();
        if (w > 1000) {
            return true;
        } else {
            return false;
        }
    },
    searchString: function (data) {
        var i;
        for (i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
            else if (dataProp) {
                return data[i].identity;
            }
        }
        return undefined;
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }
        /*jsl:ignore*/
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        /*jsl:end*/
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: 'Chrome',
            identity: 'Chrome'
        },
        {
            string: navigator.userAgent,
            subString: 'OmniWeb',
            versionSearch: 'OmniWeb/',
            identity: 'OmniWeb'
        },
        {
            string: navigator.vendor,
            subString: 'Apple',
            identity: 'Safari',
            versionSearch: 'Version'
        },
        {
            prop: window.opera,
            identity: 'Opera',
            versionSearch: 'Version'
        },
        {
            string: navigator.vendor,
            subString: 'iCab',
            identity: 'iCab'
        },
        {
            string: navigator.vendor,
            subString: 'KDE',
            identity: 'Konqueror'
        },
        {
            string: navigator.userAgent,
            subString: 'Firefox',
            identity: 'Firefox'
        },
        {
            string: navigator.vendor,
            subString: 'Camino',
            identity: 'Camino'
        },
        {        // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: 'Netscape',
            identity: 'Netscape'
        },
        {
            string: navigator.userAgent,
            subString: 'MSIE',
            identity: 'Explorer',
            versionSearch: 'MSIE'
        },
        {
            string: navigator.userAgent,
            subString: 'Gecko',
            identity: 'Mozilla',
            versionSearch: 'rv'
        },
        {         // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: 'Mozilla',
            identity: 'Netscape',
            versionSearch: 'Mozilla'
        }
    ],
    dataOS : [
        {
            string: navigator.platform,
            subString: 'Win',
            identity: 'Windows'
        },
        {
            string: navigator.platform,
            subString: 'Mac',
            identity: 'Mac'
        },
        {
            string: navigator.userAgent,
            subString: 'iPhone',
            identity: 'iPhone/iPod'
        },

        {
            string: navigator.platform,
            subString: 'Linux',
            identity: 'Linux'
        }
    ]
};

BrowserDetect.init();
