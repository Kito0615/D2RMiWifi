// ==UserScript==
// @name         Download To MiRouter.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       AnarL.
// @include      http*://*dytt8.net*
// @include      http*://*dy2018.com*
// @include      http*://*btbtdy.com*
// @include      http*://*dygod.net*
// @include      http*://*ygdy8.net*
// @include      http*://*btsj5.com*
// @include      http*://*meiju8.cc*
// @include      http*://*mjhui.net*
// @include      http*://*btapple.com*
// @include      http*://*bttiantangw.com*
// @include      http*://*ikools.com*
// @include      http*://*poxiaody.com*
// @include      http*://*mkv99.com*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var Base64 = {
        table : ['A', 'B', 'C', 'D', 'E', 'F', 'G',
                 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                 'O', 'P', 'Q', 'R', 'S', 'T',
                 'U', 'V', 'W', 'X', 'Y', 'Z',
                 'a', 'b', 'c', 'd', 'e', 'f', 'g',
                 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                 'o', 'p', 'q', 'r', 's', 't',
                 'u', 'v', 'w', 'x', 'y', 'z',
                 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'],
        UTF16ToUTF8 : function(str)
        {
            var res = [], len = str.length;
            for (var i = 0; i < len; i ++)
            {
                var code = str.charCodeAt(i);
                if (code > 0x0000 && code <= 0x007F)
                {
                    res.push(str.charAt(i));
                } else if (code > 0x0080 && code <= 0x7FF)
                {
                    var byte1 = 0xC0 | ((code >> 6) & 0x1F);
                    var byte2 = 0x80 | (code & 0x3F);
                    res.push(String.fromCharCode(byte1),String.fromCharCode(byte2));
                } else if (code >= 0x0800 && code <= 0xFFFF)
                {
                    var byte1 = 0xE0 | ((code >> 12) & 0x0F);
                    var byte2 = 0x80 | ((code >> 6) & 0x3F);
                    var byte3 = 0x80 | (code & 0x3F);
                    res.push(String.fromCharCode(byte1), String.fromCharCode(byte2), String.fromCharCode(byte3));
                } else if (code >= 0x00010000 && code <= 0x001FFFFF)
                {
                } else　if (code >= 0x00200000 && code <= 0x03FFFFFF)
                {
                } else
                {
                }
            }
            return res.join('');
        },
        UTF8ToUTF16 : function(str)
        {
            var res = [], len = str.length;
            for (var i = 0; i < len; i ++)
            {
                var code = str.charCodeAt(i);
                if (((code >> 7) & 0xFF) == 0x00)
                {
                    res.push(str.charAt(i));
                } else if (((code >> 5) & 0xFF) == 0x6)
                {
                    var code2 = str.charCodeAt(++i);
                    var byte1 = (code & 0x1F) << 6;
                    var byte2 = code & 0x3F;
                    var utf16 = byte1 | byte2;
                    res.push(String.fromCharCode(utf16));
                } else if (((code >> 4) & 0xFF) == 0xE)
                {
                    var code2 = str.charCodeAt(++i);
                    var code3 = str.charCodeAt(++i);
                    var byte1 = (code << 4) | ((code >> 2) & 0x0F);
                    var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                    var utf16 = ((byte1 & 0x00FF) << 8) | byte2;
                    res.push(String.fromCharCode(utf16));
                } else if (((code >> 3) & 0xFF) == 0x1E)
                {
                } else if (((code >> 2) & 0xFF) == 0x3E)
                {
                } else
                {
                }
            }
            return res.join('');
        },
        encode : function(str)
        {
            if (!str)
            {
                return '';
            }
            var utf8 = this.UTF16ToUTF8(str);
            var i = 0;
            var len = utf8.length;
            var res = [];
            while (i < len)
            {
                var c1 = utf8.charCodeAt(i++) & 0xFF;
                res.push(this.table[c1 >> 2]);
                if (i == len)
                {
                    res.push(this.table[(c1 & 0x3) << 4]);
                    res.push('==');
                    break;
                }
                var c2 = utf8.charCodeAt(i++);
                if (i == len)
                {
                    res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                    res.push(this.table[(c2 & 0x0F) << 2]);
                    res.push('=');
                    break;
                }
                var c3 = utf8.charCodeAt(i++);
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                res.push(this.table[((c2 & 0x0F) << 2) | ((c3 >> 0xC0) >> 6)]);
                res.push(this.table[c3 & 0x3F]);
            }
            return res.join('');
        },
        decode : function(str)
        {
            if (!str)
            {
                return '';
            }
            var len = str.length;
            var i = 0;
            var res = [];
            while (i < len)
            {
                code1 = this.table.indexOf[str.charAt(i++)];
                code2 = this.table.indexOf[str.charAt(i++)];
                code3 = this.table.indexOf[str.charAt(i++)];
                code4 = this.table.indexOf[str.charAt(i++)];

                c1 = (code1 << 2) | (code2 >> 4);
                res.push(String.fromCharCode(c1));

                if (code3 != -1)
                {
                    c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
                    res.push(String.fromCharCode(c2));
                }
                if (code4 != -1)
                {
                    c3 = ((code3 & 0x3) << 6) | code4;
                    res.push(String.fromCharCode(c3));
                }
            }
            return this.UTF8ToUTF16(res.join(''));
        }
    };

    var addBtnDownload = function() {
        var elements = document.getElementsByTagName('a');
        for (var i = 0; i < elements.length; i ++) {
            var el = elements[i];
            var parent = el.parentNode;
            var url = el.getAttribute('href');
            if (url.indexOf('ftp://') == -1 && url.indexOf('thunder://') == -1 && url.indexOf('ed2k://') == -1 && url.indexOf('magnet:?' == -1))
            {
                url = el.innerHTML;
            }
            if (url.indexOf('ftp://') !== -1 || url.indexOf('thunder://') !== -1 || url.indexOf('ed2k://') !== -1 || url.indexOf('magnet:?' !== -1))
            {
                var div = document.createElement('div');
                var a = document.createElement('a');
                var bgColor = 'rgb(255, 103, 0)';
                var blRadius = '30px';
                var brRadius = '30px';
                var bbStyle = 'solid';
                var bbWidth = '1px';

                div.style.background = bgColor;
                div.style.width = '200px';
                div.style.display = 'table';
                div.style.textAlign = 'center';
                div.style.bottomLeftRadius = blRadius;
                div.style.bottomRightRadius = brRadius;
                div.style.bottomBorderStyle = bbStyle;
                div.style.bottomBorderWidth = bbWidth;
                a.style.display = 'table-cell';
                a.style.verticalAlign = 'middle';
                a.style.color = 'rgb(255, 255, 255)';
                div.style.height = '30px';

                url = 'https://d.miwifi.com/d2r?userID=85566446&url=' + Base64.encode(url);
                a.setAttribute('href', url);
                a.setAttribute('target', '_blank');
                a.innerHTML = '下载到小米路由器';
                div.appendChild(a);
                parent.appendChild(div);
            }
        }
    };
    addBtnDownload();
})();