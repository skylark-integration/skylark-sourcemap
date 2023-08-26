/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,n){var r=n.define,require=n.require,t="function"==typeof r&&r.amd,o=!t&&"undefined"!=typeof exports;if(!t&&!r){var i={};r=n.define=function(e,n,r){"function"==typeof r?(i[e]={factory:r,deps:n.map(function(n){return function(e,n){if("."!==e[0])return e;var r=n.split("/"),t=e.split("/");r.pop();for(var o=0;o<t.length;o++)"."!=t[o]&&(".."==t[o]?r.pop():r.push(t[o]));return r.join("/")}(n,e)}),resolved:!1,exports:null},require(e)):i[e]={factory:null,resolved:!0,exports:r}},require=n.require=function(e){if(!i.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=i[e];if(!module.resolved){var r=[];module.deps.forEach(function(e){r.push(require(e))}),module.exports=module.factory.apply(n,r)||null,module.resolved=!0}return module.exports}}if(!r)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-sourcemap/util",[],function(){"use strict";var e=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,n=/^data:.+\,.+$/;function r(n){var r=n.match(e);return r?{scheme:r[1],auth:r[2],host:r[3],port:r[4],path:r[5]}:null}function t(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function o(e){var n=e,o=r(e);if(o){if(!o.path)return e;n=o.path}for(var i,a=s(n),u=n.split(/\/+/),l=0,c=u.length-1;c>=0;c--)"."===(i=u[c])?u.splice(c,1):".."===i?l++:l>0&&(""===i?(u.splice(c+1,l),l=0):(u.splice(c,2),l--));return""===(n=u.join("/"))&&(n=a?"/":"."),o?(o.path=n,t(o)):n}function i(e,i){""===e&&(e="."),""===i&&(i=".");var s=r(i),a=r(e);if(a&&(e=a.path||"/"),s&&!s.scheme)return a&&(s.scheme=a.scheme),t(s);if(s||i.match(n))return i;if(a&&!a.host&&!a.path)return a.host=i,t(a);var u="/"===i.charAt(0)?i:o(e.replace(/\/+$/,"")+"/"+i);return a?(a.path=u,t(a)):u}function s(n){return"/"===n.charAt(0)||e.test(n)}var a=!("__proto__"in Object.create(null));function u(e){return e}function l(e){if(!e)return!1;var n=e.length;if(n<9)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var r=n-10;r>=0;r--)if(36!==e.charCodeAt(r))return!1;return!0}function c(e,n){return e===n?0:null===e?1:null===n?-1:e>n?1:-1}return{toSetString:a?u:function(e){if(l(e))return"$"+e;return e},fromSetString:a?u:function(e){if(l(e))return e.slice(1);return e},compareByOriginalPositions:function(e,n,r){var t=c(e.source,n.source);if(0!==t)return t;if(0!=(t=e.originalLine-n.originalLine))return t;if(0!=(t=e.originalColumn-n.originalColumn)||r)return t;if(0!=(t=e.generatedColumn-n.generatedColumn))return t;if(0!=(t=e.generatedLine-n.generatedLine))return t;return c(e.name,n.name)},isAbsolute:s,compareByGeneratedPositionsDeflated:function(e,n,r){var t=e.generatedLine-n.generatedLine;if(0!==t)return t;if(0!=(t=e.generatedColumn-n.generatedColumn)||r)return t;if(0!==(t=c(e.source,n.source)))return t;if(0!=(t=e.originalLine-n.originalLine))return t;if(0!=(t=e.originalColumn-n.originalColumn))return t;return c(e.name,n.name)},compareByGeneratedPositionsInflated:function(e,n){var r=e.generatedLine-n.generatedLine;if(0!==r)return r;if(0!=(r=e.generatedColumn-n.generatedColumn))return r;if(0!==(r=c(e.source,n.source)))return r;if(0!=(r=e.originalLine-n.originalLine))return r;if(0!=(r=e.originalColumn-n.originalColumn))return r;return c(e.name,n.name)},parseSourceMapInput:function(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))},getArg:function(e,n,r){if(n in e)return e[n];if(3===arguments.length)return r;throw new Error('"'+n+'" is a required argument.')},urlParse:r,urlGenerate:t,normalize:o,join:i,relative:function(e,n){""===e&&(e=".");e=e.replace(/\/$/,"");var r=0;for(;0!==n.indexOf(e+"/");){var t=e.lastIndexOf("/");if(t<0)return n;if((e=e.slice(0,t)).match(/^([^\/]+:\/)?\/*$/))return n;++r}return Array(r+1).join("../")+n.substr(e.length+1)},computeSourceURL:function(e,n,s){n=n||"",e&&("/"!==e[e.length-1]&&"/"!==n[0]&&(e+="/"),n=e+n);if(s){var a=r(s);if(!a)throw new Error("sourceMapURL could not be parsed");if(a.path){var u=a.path.lastIndexOf("/");u>=0&&(a.path=a.path.substring(0,u+1))}n=i(t(a),n)}return o(n)}}}),e("skylark-sourcemap/array-set",["./util"],function(e){"use strict";var n=Object.prototype.hasOwnProperty,r="undefined"!=typeof Map;function t(){this._array=[],this._set=r?new Map:Object.create(null)}return t.fromArray=function(e,n){for(var r=new t,o=0,i=e.length;o<i;o++)r.add(e[o],n);return r},t.prototype.size=function(){return r?this._set.size:Object.getOwnPropertyNames(this._set).length},t.prototype.add=function(t,o){var i=r?t:e.toSetString(t),s=r?this.has(t):n.call(this._set,i),a=this._array.length;s&&!o||this._array.push(t),s||(r?this._set.set(t,a):this._set[i]=a)},t.prototype.has=function(t){if(r)return this._set.has(t);var o=e.toSetString(t);return n.call(this._set,o)},t.prototype.indexOf=function(t){if(r){var o=this._set.get(t);if(o>=0)return o}else{var i=e.toSetString(t);if(n.call(this._set,i))return this._set[i]}throw new Error('"'+t+'" is not in the set.')},t.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},t.prototype.toArray=function(){return this._array.slice()},t}),e("skylark-sourcemap/base64",[],function(){"use strict";var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");return{encode:function(n){if(0<=n&&n<e.length)return e[n];throw new TypeError("Must be between 0 and 63: "+n)},decode:function(e){if(65<=e&&e<=90)return e-65;if(97<=e&&e<=122)return e-97+26;if(48<=e&&e<=57)return e-48+52;if(43==e)return 62;if(47==e)return 63;return-1}}}),e("skylark-sourcemap/base64-vlq",["./base64"],function(e){"use strict";return exports.encode=function(n){var r,t="",o=function(e){return e<0?1+(-e<<1):0+(e<<1)}(n);do{r=31&o,(o>>>=5)>0&&(r|=32),t+=e.encode(r)}while(o>0);return t},exports.decode=function(n,r,t){var o,i,s,a,u=n.length,l=0,c=0;do{if(r>=u)throw new Error("Expected more digits in base 64 VLQ value.");if(-1===(i=e.decode(n.charCodeAt(r++))))throw new Error("Invalid base64 digit: "+n.charAt(r-1));o=!!(32&i),l+=(i&=31)<<c,c+=5}while(o);t.value=(a=(s=l)>>1,1==(1&s)?-a:a),t.rest=r},{encode:encode,decode:decode}}),e("skylark-sourcemap/binary-search",[],function(){"use strict";const e=1,n=2;return{GREATEST_LOWER_BOUND:e,LEAST_UPPER_BOUND:n,search:function(r,t,o,i){if(0===t.length)return-1;var s=function e(r,t,o,i,s,a){var u=Math.floor((t-r)/2)+r;var l=s(o,i[u],!0);return 0===l?u:l>0?t-u>1?e(u,t,o,i,s,a):a==n?t<i.length?t:-1:u:u-r>1?e(r,u,o,i,s,a):a==n?u:r<0?-1:r}(-1,t.length,r,t,o,i||e);if(s<0)return-1;for(;s-1>=0&&0===o(t[s],t[s-1],!0);)--s;return s}}}),e("skylark-sourcemap/mapping-list",["./util"],function(e){"use strict";function n(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}return n.prototype.unsortedForEach=function(e,n){this._array.forEach(e,n)},n.prototype.add=function(n){var r,t,o,i,s,a;r=this._last,t=n,o=r.generatedLine,i=t.generatedLine,s=r.generatedColumn,a=t.generatedColumn,i>o||i==o&&a>=s||e.compareByGeneratedPositionsInflated(r,t)<=0?(this._last=n,this._array.push(n)):(this._sorted=!1,this._array.push(n))},n.prototype.toArray=function(){return this._sorted||(this._array.sort(e.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},n}),e("skylark-sourcemap/quick-sort",[],function(){"use strict";function e(e,n,r){var t=e[n];e[n]=e[r],e[r]=t}function n(r,t,o,i){if(o<i){var s=(p=o,g=i,Math.round(p+Math.random()*(g-p))),a=o-1;e(r,s,i);for(var u=r[i],l=o;l<i;l++)t(r[l],u)<=0&&e(r,a+=1,l);e(r,a+1,l);var c=a+1;n(r,t,o,c-1),n(r,t,c+1,i)}var p,g}return{quickSort:function(e,r){n(e,r,0,e.length-1)}}}),e("skylark-sourcemap/source-map-consumer",["./util","./binary-search","./array-set","./base64-vlq","./quick-sort"],function(e,n,r,t,o){"use strict";function i(n,r){var t=n;return"string"==typeof n&&(t=e.parseSourceMapInput(n)),null!=t.sections?new u(t,r):new s(t,r)}function s(n,t){var o=n;"string"==typeof n&&(o=e.parseSourceMapInput(n));var i=e.getArg(o,"version"),s=e.getArg(o,"sources"),a=e.getArg(o,"names",[]),u=e.getArg(o,"sourceRoot",null),l=e.getArg(o,"sourcesContent",null),c=e.getArg(o,"mappings"),p=e.getArg(o,"file",null);if(i!=this._version)throw new Error("Unsupported version: "+i);u&&(u=e.normalize(u)),s=s.map(String).map(e.normalize).map(function(n){return u&&e.isAbsolute(u)&&e.isAbsolute(n)?e.relative(u,n):n}),this._names=r.fromArray(a.map(String),!0),this._sources=r.fromArray(s,!0),this._absoluteSources=this._sources.toArray().map(function(n){return e.computeSourceURL(u,n,t)}),this.sourceRoot=u,this.sourcesContent=l,this._mappings=c,this._sourceMapURL=t,this.file=p}function a(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function u(n,t){var o=n;"string"==typeof n&&(o=e.parseSourceMapInput(n));var s=e.getArg(o,"version"),a=e.getArg(o,"sections");if(s!=this._version)throw new Error("Unsupported version: "+s);this._sources=new r,this._names=new r;var u={line:-1,column:0};this._sections=a.map(function(n){if(n.url)throw new Error("Support for url field in sections not implemented.");var r=e.getArg(n,"offset"),o=e.getArg(r,"line"),s=e.getArg(r,"column");if(o<u.line||o===u.line&&s<u.column)throw new Error("Section offsets must be ordered and non-overlapping.");return u=r,{generatedOffset:{generatedLine:o+1,generatedColumn:s+1},consumer:new i(e.getArg(n,"map"),t)}})}return i.fromSourceMap=function(e,n){return s.fromSourceMap(e,n)},i.prototype._version=3,i.prototype.__generatedMappings=null,Object.defineProperty(i.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),i.prototype.__originalMappings=null,Object.defineProperty(i.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),i.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},i.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},i.GENERATED_ORDER=1,i.ORIGINAL_ORDER=2,i.GREATEST_LOWER_BOUND=1,i.LEAST_UPPER_BOUND=2,i.prototype.eachMapping=function(n,r,t){var o,s=r||null,a=t||i.GENERATED_ORDER;switch(a){case i.GENERATED_ORDER:o=this._generatedMappings;break;case i.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var u=this.sourceRoot;o.map(function(n){var r=null===n.source?null:this._sources.at(n.source);return{source:r=e.computeSourceURL(u,r,this._sourceMapURL),generatedLine:n.generatedLine,generatedColumn:n.generatedColumn,originalLine:n.originalLine,originalColumn:n.originalColumn,name:null===n.name?null:this._names.at(n.name)}},this).forEach(n,s)},i.prototype.allGeneratedPositionsFor=function(r){var t=e.getArg(r,"line"),o={source:e.getArg(r,"source"),originalLine:t,originalColumn:e.getArg(r,"column",0)};if(o.source=this._findSourceIndex(o.source),o.source<0)return[];var i=[],s=this._findMapping(o,this._originalMappings,"originalLine","originalColumn",e.compareByOriginalPositions,n.LEAST_UPPER_BOUND);if(s>=0){var a=this._originalMappings[s];if(void 0===r.column)for(var u=a.originalLine;a&&a.originalLine===u;)i.push({line:e.getArg(a,"generatedLine",null),column:e.getArg(a,"generatedColumn",null),lastColumn:e.getArg(a,"lastGeneratedColumn",null)}),a=this._originalMappings[++s];else for(var l=a.originalColumn;a&&a.originalLine===t&&a.originalColumn==l;)i.push({line:e.getArg(a,"generatedLine",null),column:e.getArg(a,"generatedColumn",null),lastColumn:e.getArg(a,"lastGeneratedColumn",null)}),a=this._originalMappings[++s]}return i},s.prototype=Object.create(i.prototype),s.prototype.consumer=i,s.prototype._findSourceIndex=function(n){var r,t=n;if(null!=this.sourceRoot&&(t=e.relative(this.sourceRoot,t)),this._sources.has(t))return this._sources.indexOf(t);for(r=0;r<this._absoluteSources.length;++r)if(this._absoluteSources[r]==n)return r;return-1},s.fromSourceMap=function(n,t){var i=Object.create(s.prototype),u=i._names=r.fromArray(n._names.toArray(),!0),l=i._sources=r.fromArray(n._sources.toArray(),!0);i.sourceRoot=n._sourceRoot,i.sourcesContent=n._generateSourcesContent(i._sources.toArray(),i.sourceRoot),i.file=n._file,i._sourceMapURL=t,i._absoluteSources=i._sources.toArray().map(function(n){return e.computeSourceURL(i.sourceRoot,n,t)});for(var c=n._mappings.toArray().slice(),p=i.__generatedMappings=[],g=i.__originalMappings=[],h=0,f=c.length;h<f;h++){var d=c[h],m=new a;m.generatedLine=d.generatedLine,m.generatedColumn=d.generatedColumn,d.source&&(m.source=l.indexOf(d.source),m.originalLine=d.originalLine,m.originalColumn=d.originalColumn,d.name&&(m.name=u.indexOf(d.name)),g.push(m)),p.push(m)}return o(i.__originalMappings,e.compareByOriginalPositions),i},s.prototype._version=3,Object.defineProperty(s.prototype,"sources",{get:function(){return this._absoluteSources.slice()}}),s.prototype._parseMappings=function(n,r){for(var i,s,u,l,c,p=1,g=0,h=0,f=0,d=0,m=0,_=n.length,y=0,v={},C={},S=[],A=[];y<_;)if(";"===n.charAt(y))p++,y++,g=0;else if(","===n.charAt(y))y++;else{for((i=new a).generatedLine=p,l=y;l<_&&!this._charIsMappingSeparator(n,l);l++);if(s=n.slice(y,l),u=v[s])y+=s.length;else{for(u=[];y<l;)t.decode(n,y,C),c=C.value,y=C.rest,u.push(c);if(2===u.length)throw new Error("Found a source, but no line and column");if(3===u.length)throw new Error("Found a source and line, but no column");v[s]=u}i.generatedColumn=g+u[0],g=i.generatedColumn,u.length>1&&(i.source=d+u[1],d+=u[1],i.originalLine=h+u[2],h=i.originalLine,i.originalLine+=1,i.originalColumn=f+u[3],f=i.originalColumn,u.length>4&&(i.name=m+u[4],m+=u[4])),A.push(i),"number"==typeof i.originalLine&&S.push(i)}o(A,e.compareByGeneratedPositionsDeflated),this.__generatedMappings=A,o(S,e.compareByOriginalPositions),this.__originalMappings=S},s.prototype._findMapping=function(e,r,t,o,i,s){if(e[t]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[t]);if(e[o]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[o]);return n.search(e,r,i,s)},s.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},s.prototype.originalPositionFor=function(n){var r={generatedLine:e.getArg(n,"line"),generatedColumn:e.getArg(n,"column")},t=this._findMapping(r,this._generatedMappings,"generatedLine","generatedColumn",e.compareByGeneratedPositionsDeflated,e.getArg(n,"bias",i.GREATEST_LOWER_BOUND));if(t>=0){var o=this._generatedMappings[t];if(o.generatedLine===r.generatedLine){var s=e.getArg(o,"source",null);null!==s&&(s=this._sources.at(s),s=e.computeSourceURL(this.sourceRoot,s,this._sourceMapURL));var a=e.getArg(o,"name",null);return null!==a&&(a=this._names.at(a)),{source:s,line:e.getArg(o,"originalLine",null),column:e.getArg(o,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},s.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))},s.prototype.sourceContentFor=function(n,r){if(!this.sourcesContent)return null;var t=this._findSourceIndex(n);if(t>=0)return this.sourcesContent[t];var o,i=n;if(null!=this.sourceRoot&&(i=e.relative(this.sourceRoot,i)),null!=this.sourceRoot&&(o=e.urlParse(this.sourceRoot))){var s=i.replace(/^file:\/\//,"");if("file"==o.scheme&&this._sources.has(s))return this.sourcesContent[this._sources.indexOf(s)];if((!o.path||"/"==o.path)&&this._sources.has("/"+i))return this.sourcesContent[this._sources.indexOf("/"+i)]}if(r)return null;throw new Error('"'+i+'" is not in the SourceMap.')},s.prototype.generatedPositionFor=function(n){var r=e.getArg(n,"source");if((r=this._findSourceIndex(r))<0)return{line:null,column:null,lastColumn:null};var t={source:r,originalLine:e.getArg(n,"line"),originalColumn:e.getArg(n,"column")},o=this._findMapping(t,this._originalMappings,"originalLine","originalColumn",e.compareByOriginalPositions,e.getArg(n,"bias",i.GREATEST_LOWER_BOUND));if(o>=0){var s=this._originalMappings[o];if(s.source===t.source)return{line:e.getArg(s,"generatedLine",null),column:e.getArg(s,"generatedColumn",null),lastColumn:e.getArg(s,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},u.prototype=Object.create(i.prototype),u.prototype.constructor=i,u.prototype._version=3,Object.defineProperty(u.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),u.prototype.originalPositionFor=function(r){var t={generatedLine:e.getArg(r,"line"),generatedColumn:e.getArg(r,"column")},o=n.search(t,this._sections,function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r||e.generatedColumn-n.generatedOffset.generatedColumn}),i=this._sections[o];return i?i.consumer.originalPositionFor({line:t.generatedLine-(i.generatedOffset.generatedLine-1),column:t.generatedColumn-(i.generatedOffset.generatedLine===t.generatedLine?i.generatedOffset.generatedColumn-1:0),bias:r.bias}):{source:null,line:null,column:null,name:null}},u.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},u.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r],o=t.consumer.sourceContentFor(e,!0);if(o)return o}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},u.prototype.generatedPositionFor=function(n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r];if(-1!==t.consumer._findSourceIndex(e.getArg(n,"source"))){var o=t.consumer.generatedPositionFor(n);if(o){var i={line:o.line+(t.generatedOffset.generatedLine-1),column:o.column+(t.generatedOffset.generatedLine===o.line?t.generatedOffset.generatedColumn-1:0)};return i}}}return{line:null,column:null}},u.prototype._parseMappings=function(n,r){this.__generatedMappings=[],this.__originalMappings=[];for(var t=0;t<this._sections.length;t++)for(var i=this._sections[t],s=i.consumer._generatedMappings,a=0;a<s.length;a++){var u=s[a],l=i.consumer._sources.at(u.source);l=e.computeSourceURL(i.consumer.sourceRoot,l,this._sourceMapURL),this._sources.add(l),l=this._sources.indexOf(l);var c=null;u.name&&(c=i.consumer._names.at(u.name),this._names.add(c),c=this._names.indexOf(c));var p={source:l,generatedLine:u.generatedLine+(i.generatedOffset.generatedLine-1),generatedColumn:u.generatedColumn+(i.generatedOffset.generatedLine===u.generatedLine?i.generatedOffset.generatedColumn-1:0),originalLine:u.originalLine,originalColumn:u.originalColumn,name:c};this.__generatedMappings.push(p),"number"==typeof p.originalLine&&this.__originalMappings.push(p)}o(this.__generatedMappings,e.compareByGeneratedPositionsDeflated),o(this.__originalMappings,e.compareByOriginalPositions)},{SourceMapConsumer:i,BasicSourceMapConsumer:s,IndexedSourceMapConsumer:u}}),e("skylark-sourcemap/source-map-generator",["./base64-vlq","./util","./array-set","./mapping-list"],function(e,n,r,t){"use strict";function o(e){e||(e={}),this._file=n.getArg(e,"file",null),this._sourceRoot=n.getArg(e,"sourceRoot",null),this._skipValidation=n.getArg(e,"skipValidation",!1),this._sources=new r,this._names=new r,this._mappings=new t,this._sourcesContents=null}return o.prototype._version=3,o.fromSourceMap=function(e){var r=e.sourceRoot,t=new o({file:e.file,sourceRoot:r});return e.eachMapping(function(e){var o={generated:{line:e.generatedLine,column:e.generatedColumn}};null!=e.source&&(o.source=e.source,null!=r&&(o.source=n.relative(r,o.source)),o.original={line:e.originalLine,column:e.originalColumn},null!=e.name&&(o.name=e.name)),t.addMapping(o)}),e.sources.forEach(function(o){var i=o;null!==r&&(i=n.relative(r,o)),t._sources.has(i)||t._sources.add(i);var s=e.sourceContentFor(o);null!=s&&t.setSourceContent(o,s)}),t},o.prototype.addMapping=function(e){var r=n.getArg(e,"generated"),t=n.getArg(e,"original",null),o=n.getArg(e,"source",null),i=n.getArg(e,"name",null);this._skipValidation||this._validateMapping(r,t,o,i),null!=o&&(o=String(o),this._sources.has(o)||this._sources.add(o)),null!=i&&(i=String(i),this._names.has(i)||this._names.add(i)),this._mappings.add({generatedLine:r.line,generatedColumn:r.column,originalLine:null!=t&&t.line,originalColumn:null!=t&&t.column,source:o,name:i})},o.prototype.setSourceContent=function(e,r){var t=e;null!=this._sourceRoot&&(t=n.relative(this._sourceRoot,t)),null!=r?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[n.toSetString(t)]=r):this._sourcesContents&&(delete this._sourcesContents[n.toSetString(t)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},o.prototype.applySourceMap=function(e,t,o){var i=t;if(null==t){if(null==e.file)throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');i=e.file}var s=this._sourceRoot;null!=s&&(i=n.relative(s,i));var a=new r,u=new r;this._mappings.unsortedForEach(function(r){if(r.source===i&&null!=r.originalLine){var t=e.originalPositionFor({line:r.originalLine,column:r.originalColumn});null!=t.source&&(r.source=t.source,null!=o&&(r.source=n.join(o,r.source)),null!=s&&(r.source=n.relative(s,r.source)),r.originalLine=t.line,r.originalColumn=t.column,null!=t.name&&(r.name=t.name))}var l=r.source;null==l||a.has(l)||a.add(l);var c=r.name;null==c||u.has(c)||u.add(c)},this),this._sources=a,this._names=u,e.sources.forEach(function(r){var t=e.sourceContentFor(r);null!=t&&(null!=o&&(r=n.join(o,r)),null!=s&&(r=n.relative(s,r)),this.setSourceContent(r,t))},this)},o.prototype._validateMapping=function(e,n,r,t){if(n&&"number"!=typeof n.line&&"number"!=typeof n.column)throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if((!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0)||n||r||t)&&!(e&&"line"in e&&"column"in e&&n&&"line"in n&&"column"in n&&e.line>0&&e.column>=0&&n.line>0&&n.column>=0&&r))throw new Error("Invalid mapping: "+JSON.stringify({generated:e,source:r,original:n,name:t}))},o.prototype._serializeMappings=function(){for(var r,t,o,i,s=0,a=1,u=0,l=0,c=0,p=0,g="",h=this._mappings.toArray(),f=0,d=h.length;f<d;f++){if(t=h[f],r="",t.generatedLine!==a)for(s=0;t.generatedLine!==a;)r+=";",a++;else if(f>0){if(!n.compareByGeneratedPositionsInflated(t,h[f-1]))continue;r+=","}r+=e.encode(t.generatedColumn-s),s=t.generatedColumn,null!=t.source&&(i=this._sources.indexOf(t.source),r+=e.encode(i-p),p=i,r+=e.encode(t.originalLine-1-l),l=t.originalLine-1,r+=e.encode(t.originalColumn-u),u=t.originalColumn,null!=t.name&&(o=this._names.indexOf(t.name),r+=e.encode(o-c),c=o)),g+=r}return g},o.prototype._generateSourcesContent=function(e,r){return e.map(function(e){if(!this._sourcesContents)return null;null!=r&&(e=n.relative(r,e));var t=n.toSetString(e);return Object.prototype.hasOwnProperty.call(this._sourcesContents,t)?this._sourcesContents[t]:null},this)},o.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return null!=this._file&&(e.file=this._file),null!=this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},o.prototype.toString=function(){return JSON.stringify(this.toJSON())},o}),e("skylark-sourcemap/source-node",["./source-map-generator","./util"],function(e,n){"use strict";var n=__module__1,r=/(\r?\n)/,t="$$$isSourceNode$$$";function o(e,n,r,o,i){this.children=[],this.sourceContents={},this.line=null==e?null:e,this.column=null==n?null:n,this.source=null==r?null:r,this.name=null==i?null:i,this[t]=!0,null!=o&&this.add(o)}return o.fromStringWithSourceMap=function(e,t,i){var s=new o,a=e.split(r),u=0,l=function(){var e=r(),n=r()||"";return e+n;function r(){return u<a.length?a[u++]:void 0}},c=1,p=0,g=null;return t.eachMapping(function(e){if(null!==g){if(!(c<e.generatedLine)){var n=a[u]||"",r=n.substr(0,e.generatedColumn-p);return a[u]=n.substr(e.generatedColumn-p),p=e.generatedColumn,h(g,r),void(g=e)}h(g,l()),c++,p=0}for(;c<e.generatedLine;)s.add(l()),c++;if(p<e.generatedColumn){var n=a[u]||"";s.add(n.substr(0,e.generatedColumn)),a[u]=n.substr(e.generatedColumn),p=e.generatedColumn}g=e},this),u<a.length&&(g&&h(g,l()),s.add(a.splice(u).join(""))),t.sources.forEach(function(e){var r=t.sourceContentFor(e);null!=r&&(null!=i&&(e=n.join(i,e)),s.setSourceContent(e,r))}),s;function h(e,r){if(null===e||void 0===e.source)s.add(r);else{var t=i?n.join(i,e.source):e.source;s.add(new o(e.originalLine,e.originalColumn,t,r,e.name))}}},o.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(e){this.add(e)},this);else{if(!e[t]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);e&&this.children.push(e)}return this},o.prototype.prepend=function(e){if(Array.isArray(e))for(var n=e.length-1;n>=0;n--)this.prepend(e[n]);else{if(!e[t]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);this.children.unshift(e)}return this},o.prototype.walk=function(e){for(var n,r=0,o=this.children.length;r<o;r++)(n=this.children[r])[t]?n.walk(e):""!==n&&e(n,{source:this.source,line:this.line,column:this.column,name:this.name})},o.prototype.join=function(e){var n,r,t=this.children.length;if(t>0){for(n=[],r=0;r<t-1;r++)n.push(this.children[r]),n.push(e);n.push(this.children[r]),this.children=n}return this},o.prototype.replaceRight=function(e,n){var r=this.children[this.children.length-1];return r[t]?r.replaceRight(e,n):"string"==typeof r?this.children[this.children.length-1]=r.replace(e,n):this.children.push("".replace(e,n)),this},o.prototype.setSourceContent=function(e,r){this.sourceContents[n.toSetString(e)]=r},o.prototype.walkSourceContents=function(e){for(var r=0,o=this.children.length;r<o;r++)this.children[r][t]&&this.children[r].walkSourceContents(e);for(var i=Object.keys(this.sourceContents),r=0,o=i.length;r<o;r++)e(n.fromSetString(i[r]),this.sourceContents[i[r]])},o.prototype.toString=function(){var e="";return this.walk(function(n){e+=n}),e},o.prototype.toStringWithSourceMap=function(n){var r={code:"",line:1,column:0},t=new e(n),o=!1,i=null,s=null,a=null,u=null;return this.walk(function(e,n){r.code+=e,null!==n.source&&null!==n.line&&null!==n.column?(i===n.source&&s===n.line&&a===n.column&&u===n.name||t.addMapping({source:n.source,original:{line:n.line,column:n.column},generated:{line:r.line,column:r.column},name:n.name}),i=n.source,s=n.line,a=n.column,u=n.name,o=!0):o&&(t.addMapping({generated:{line:r.line,column:r.column}}),i=null,o=!1);for(var l=0,c=e.length;l<c;l++)10===e.charCodeAt(l)?(r.line++,r.column=0,l+1===c?(i=null,o=!1):o&&t.addMapping({source:n.source,original:{line:n.line,column:n.column},generated:{line:r.line,column:r.column},name:n.name})):r.column++}),this.walkSourceContents(function(e,n){t.setSourceContent(e,n)}),{code:r.code,map:t}},o}),e("skylark-sourcemap/main",["./array-set","./base64-vlq","./binary-search","./mapping-list","./quick-sort","./source-map-consumer","./source-map-generator","./source-node","./util"],function(e,n,r,t,o,i,s,a,u){"use strict";return{ArraySet:e,base64VLQ:n,binarySearch:r,MappingList:t,quickSort:o,consumers:i,SourceMapGenerator:s,SourceNode:a,util:u}}),e("skylark-sourcemap",["skylark-sourcemap/main"],function(e){return e})}(r),!t){var s=require("skylark-langx-ns");o?module.exports=s:n.skylarkjs=s}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-sourcemap.js.map
