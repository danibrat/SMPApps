/*!!
 * Hasher <http://github.com/millermedeiros/hasher>
 * @author Miller Medeiros
 * @version 1.1.4 (2013/04/03 08:59 AM)
 * Released under the MIT License
 */
;(function(){var f=function(s){var h=(function(w){var P=25,d=w.document,a=w.history,S=s.Signal,h,_,b,c,e,g,i=/#(.*)$/,j=/(\?.*)|(\#.*)/,k=/^\#/,l=(!+"\v1"),m=('onhashchange'in w)&&d.documentMode!==7,n=l&&!m,o=(location.protocol==='file:');function p(C){return String(C||'').replace(/[\\.+*?\^$\[\](){}\/'#]/g,"\\$&")}function q(C){if(!C)return'';var D=new RegExp('^'+p(h.prependHash)+'|'+p(h.appendHash)+'$','g');return C.replace(D,'')}function r(){var C=i.exec(h.getURL());return(C&&C[1])?decodeURIComponent(C[1]):''}function t(){return(e)?e.contentWindow.frameHash:null}function u(){e=d.createElement('iframe');e.src='about:blank';e.style.display='none';d.body.appendChild(e)}function v(){if(e&&_!==t()){var C=e.contentWindow.document;C.open();C.write('<html><head><title>'+d.title+'</title><script type="text/javascript">var frameHash="'+_+'";</script></head><body>&nbsp;</body></html>');C.close()}}function x(C,D){if(_!==C){var E=_;_=C;if(n){if(!D){v()}else{e.contentWindow.frameHash=C}}h.changed.dispatch(q(C),q(E))}}if(n){g=function(){var C=r(),D=t();if(D!==_&&D!==C){h.setHash(q(D))}else if(C!==_){x(C)}}}else{g=function(){var C=r();if(C!==_){x(C)}}}function y(C,D,E){if(C.addEventListener){C.addEventListener(D,E,false)}else if(C.attachEvent){C.attachEvent('on'+D,E)}}function z(C,D,E){if(C.removeEventListener){C.removeEventListener(D,E,false)}else if(C.detachEvent){C.detachEvent('on'+D,E)}}function A(C){C=Array.prototype.slice.call(arguments);var D=C.join(h.separator);D=D?h.prependHash+D.replace(k,'')+h.appendHash:D;return D}function B(C){C=encodeURI(C);if(l&&o){C=C.replace(/\?/,'%3F')}return C}h={VERSION:'1.1.4',appendHash:'',prependHash:'/',separator:'/',changed:new S(),stopped:new S(),initialized:new S(),init:function(){if(c)return;_=r();if(m){y(w,'hashchange',g)}else{if(n){if(!e){u()}v()}b=setInterval(g,P)}c=true;h.initialized.dispatch(q(_))},stop:function(){if(!c)return;if(m){z(w,'hashchange',g)}else{clearInterval(b);b=null}c=false;h.stopped.dispatch(q(_))},isActive:function(){return c},getURL:function(){return w.location.href},getBaseURL:function(){return h.getURL().replace(j,'')},setHash:function(C){C=A.apply(null,arguments);if(C!==_){x(C);if(C===_){w.location.hash='#'+B(C)}}},replaceHash:function(C){C=A.apply(null,arguments);if(C!==_){x(C,true);if(C===_){w.location.replace('#'+B(C))}}},getHash:function(){return q(_)},getHashAsArray:function(){return h.getHash().split(h.separator)},dispose:function(){h.stop();h.initialized.dispose();h.stopped.dispose();h.changed.dispose();e=h=w.hasher=null},toString:function(){return'[hasher version="'+h.VERSION+'" hash="'+h.getHash()+'"]'}};h.initialized.memorize=true;return h}(window));return h};if(typeof define==='function'&&define.amd){define(['signals'],f)}else if(typeof exports==='object'){module.exports=f(require('signals'))}else{window['hasher']=f(window['signals'])}}());
