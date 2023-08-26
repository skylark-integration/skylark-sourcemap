/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./util","./binary-search","./array-set","./base64-vlq","./quick-sort"],function(e,n,r,t,o){"use strict";function i(n,r){var t=n;return"string"==typeof n&&(t=e.parseSourceMapInput(n)),null!=t.sections?new u(t,r):new s(t,r)}function s(n,t){var o=n;"string"==typeof n&&(o=e.parseSourceMapInput(n));var i=e.getArg(o,"version"),s=e.getArg(o,"sources"),a=e.getArg(o,"names",[]),u=e.getArg(o,"sourceRoot",null),l=e.getArg(o,"sourcesContent",null),g=e.getArg(o,"mappings"),p=e.getArg(o,"file",null);if(i!=this._version)throw new Error("Unsupported version: "+i);u&&(u=e.normalize(u)),s=s.map(String).map(e.normalize).map(function(n){return u&&e.isAbsolute(u)&&e.isAbsolute(n)?e.relative(u,n):n}),this._names=r.fromArray(a.map(String),!0),this._sources=r.fromArray(s,!0),this._absoluteSources=this._sources.toArray().map(function(n){return e.computeSourceURL(u,n,t)}),this.sourceRoot=u,this.sourcesContent=l,this._mappings=g,this._sourceMapURL=t,this.file=p}function a(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function u(n,t){var o=n;"string"==typeof n&&(o=e.parseSourceMapInput(n));var s=e.getArg(o,"version"),a=e.getArg(o,"sections");if(s!=this._version)throw new Error("Unsupported version: "+s);this._sources=new r,this._names=new r;var u={line:-1,column:0};this._sections=a.map(function(n){if(n.url)throw new Error("Support for url field in sections not implemented.");var r=e.getArg(n,"offset"),o=e.getArg(r,"line"),s=e.getArg(r,"column");if(o<u.line||o===u.line&&s<u.column)throw new Error("Section offsets must be ordered and non-overlapping.");return u=r,{generatedOffset:{generatedLine:o+1,generatedColumn:s+1},consumer:new i(e.getArg(n,"map"),t)}})}return i.fromSourceMap=function(e,n){return s.fromSourceMap(e,n)},i.prototype._version=3,i.prototype.__generatedMappings=null,Object.defineProperty(i.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),i.prototype.__originalMappings=null,Object.defineProperty(i.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),i.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},i.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},i.GENERATED_ORDER=1,i.ORIGINAL_ORDER=2,i.GREATEST_LOWER_BOUND=1,i.LEAST_UPPER_BOUND=2,i.prototype.eachMapping=function(n,r,t){var o,s=r||null;switch(t||i.GENERATED_ORDER){case i.GENERATED_ORDER:o=this._generatedMappings;break;case i.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var a=this.sourceRoot;o.map(function(n){var r=null===n.source?null:this._sources.at(n.source);return{source:r=e.computeSourceURL(a,r,this._sourceMapURL),generatedLine:n.generatedLine,generatedColumn:n.generatedColumn,originalLine:n.originalLine,originalColumn:n.originalColumn,name:null===n.name?null:this._names.at(n.name)}},this).forEach(n,s)},i.prototype.allGeneratedPositionsFor=function(r){var t=e.getArg(r,"line"),o={source:e.getArg(r,"source"),originalLine:t,originalColumn:e.getArg(r,"column",0)};if(o.source=this._findSourceIndex(o.source),o.source<0)return[];var i=[],s=this._findMapping(o,this._originalMappings,"originalLine","originalColumn",e.compareByOriginalPositions,n.LEAST_UPPER_BOUND);if(s>=0){var a=this._originalMappings[s];if(void 0===r.column)for(var u=a.originalLine;a&&a.originalLine===u;)i.push({line:e.getArg(a,"generatedLine",null),column:e.getArg(a,"generatedColumn",null),lastColumn:e.getArg(a,"lastGeneratedColumn",null)}),a=this._originalMappings[++s];else for(var l=a.originalColumn;a&&a.originalLine===t&&a.originalColumn==l;)i.push({line:e.getArg(a,"generatedLine",null),column:e.getArg(a,"generatedColumn",null),lastColumn:e.getArg(a,"lastGeneratedColumn",null)}),a=this._originalMappings[++s]}return i},s.prototype=Object.create(i.prototype),s.prototype.consumer=i,s.prototype._findSourceIndex=function(n){var r,t=n;if(null!=this.sourceRoot&&(t=e.relative(this.sourceRoot,t)),this._sources.has(t))return this._sources.indexOf(t);for(r=0;r<this._absoluteSources.length;++r)if(this._absoluteSources[r]==n)return r;return-1},s.fromSourceMap=function(n,t){var i=Object.create(s.prototype),u=i._names=r.fromArray(n._names.toArray(),!0),l=i._sources=r.fromArray(n._sources.toArray(),!0);i.sourceRoot=n._sourceRoot,i.sourcesContent=n._generateSourcesContent(i._sources.toArray(),i.sourceRoot),i.file=n._file,i._sourceMapURL=t,i._absoluteSources=i._sources.toArray().map(function(n){return e.computeSourceURL(i.sourceRoot,n,t)});for(var g=n._mappings.toArray().slice(),p=i.__generatedMappings=[],c=i.__originalMappings=[],h=0,m=g.length;h<m;h++){var f=g[h],_=new a;_.generatedLine=f.generatedLine,_.generatedColumn=f.generatedColumn,f.source&&(_.source=l.indexOf(f.source),_.originalLine=f.originalLine,_.originalColumn=f.originalColumn,f.name&&(_.name=u.indexOf(f.name)),c.push(_)),p.push(_)}return o(i.__originalMappings,e.compareByOriginalPositions),i},s.prototype._version=3,Object.defineProperty(s.prototype,"sources",{get:function(){return this._absoluteSources.slice()}}),s.prototype._parseMappings=function(n,r){for(var i,s,u,l,g,p=1,c=0,h=0,m=0,f=0,_=0,d=n.length,C=0,L={},A={},v=[],y=[];C<d;)if(";"===n.charAt(C))p++,C++,c=0;else if(","===n.charAt(C))C++;else{for((i=new a).generatedLine=p,l=C;l<d&&!this._charIsMappingSeparator(n,l);l++);if(u=L[s=n.slice(C,l)])C+=s.length;else{for(u=[];C<l;)t.decode(n,C,A),g=A.value,C=A.rest,u.push(g);if(2===u.length)throw new Error("Found a source, but no line and column");if(3===u.length)throw new Error("Found a source and line, but no column");L[s]=u}i.generatedColumn=c+u[0],c=i.generatedColumn,u.length>1&&(i.source=f+u[1],f+=u[1],i.originalLine=h+u[2],h=i.originalLine,i.originalLine+=1,i.originalColumn=m+u[3],m=i.originalColumn,u.length>4&&(i.name=_+u[4],_+=u[4])),y.push(i),"number"==typeof i.originalLine&&v.push(i)}o(y,e.compareByGeneratedPositionsDeflated),this.__generatedMappings=y,o(v,e.compareByOriginalPositions),this.__originalMappings=v},s.prototype._findMapping=function(e,r,t,o,i,s){if(e[t]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[t]);if(e[o]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[o]);return n.search(e,r,i,s)},s.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},s.prototype.originalPositionFor=function(n){var r={generatedLine:e.getArg(n,"line"),generatedColumn:e.getArg(n,"column")},t=this._findMapping(r,this._generatedMappings,"generatedLine","generatedColumn",e.compareByGeneratedPositionsDeflated,e.getArg(n,"bias",i.GREATEST_LOWER_BOUND));if(t>=0){var o=this._generatedMappings[t];if(o.generatedLine===r.generatedLine){var s=e.getArg(o,"source",null);null!==s&&(s=this._sources.at(s),s=e.computeSourceURL(this.sourceRoot,s,this._sourceMapURL));var a=e.getArg(o,"name",null);return null!==a&&(a=this._names.at(a)),{source:s,line:e.getArg(o,"originalLine",null),column:e.getArg(o,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},s.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))},s.prototype.sourceContentFor=function(n,r){if(!this.sourcesContent)return null;var t=this._findSourceIndex(n);if(t>=0)return this.sourcesContent[t];var o,i=n;if(null!=this.sourceRoot&&(i=e.relative(this.sourceRoot,i)),null!=this.sourceRoot&&(o=e.urlParse(this.sourceRoot))){var s=i.replace(/^file:\/\//,"");if("file"==o.scheme&&this._sources.has(s))return this.sourcesContent[this._sources.indexOf(s)];if((!o.path||"/"==o.path)&&this._sources.has("/"+i))return this.sourcesContent[this._sources.indexOf("/"+i)]}if(r)return null;throw new Error('"'+i+'" is not in the SourceMap.')},s.prototype.generatedPositionFor=function(n){var r=e.getArg(n,"source");if((r=this._findSourceIndex(r))<0)return{line:null,column:null,lastColumn:null};var t={source:r,originalLine:e.getArg(n,"line"),originalColumn:e.getArg(n,"column")},o=this._findMapping(t,this._originalMappings,"originalLine","originalColumn",e.compareByOriginalPositions,e.getArg(n,"bias",i.GREATEST_LOWER_BOUND));if(o>=0){var s=this._originalMappings[o];if(s.source===t.source)return{line:e.getArg(s,"generatedLine",null),column:e.getArg(s,"generatedColumn",null),lastColumn:e.getArg(s,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},u.prototype=Object.create(i.prototype),u.prototype.constructor=i,u.prototype._version=3,Object.defineProperty(u.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),u.prototype.originalPositionFor=function(r){var t={generatedLine:e.getArg(r,"line"),generatedColumn:e.getArg(r,"column")},o=n.search(t,this._sections,function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r||e.generatedColumn-n.generatedOffset.generatedColumn}),i=this._sections[o];return i?i.consumer.originalPositionFor({line:t.generatedLine-(i.generatedOffset.generatedLine-1),column:t.generatedColumn-(i.generatedOffset.generatedLine===t.generatedLine?i.generatedOffset.generatedColumn-1:0),bias:r.bias}):{source:null,line:null,column:null,name:null}},u.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},u.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r].consumer.sourceContentFor(e,!0);if(t)return t}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},u.prototype.generatedPositionFor=function(n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r];if(-1!==t.consumer._findSourceIndex(e.getArg(n,"source"))){var o=t.consumer.generatedPositionFor(n);if(o)return{line:o.line+(t.generatedOffset.generatedLine-1),column:o.column+(t.generatedOffset.generatedLine===o.line?t.generatedOffset.generatedColumn-1:0)}}}return{line:null,column:null}},u.prototype._parseMappings=function(n,r){this.__generatedMappings=[],this.__originalMappings=[];for(var t=0;t<this._sections.length;t++)for(var i=this._sections[t],s=i.consumer._generatedMappings,a=0;a<s.length;a++){var u=s[a],l=i.consumer._sources.at(u.source);l=e.computeSourceURL(i.consumer.sourceRoot,l,this._sourceMapURL),this._sources.add(l),l=this._sources.indexOf(l);var g=null;u.name&&(g=i.consumer._names.at(u.name),this._names.add(g),g=this._names.indexOf(g));var p={source:l,generatedLine:u.generatedLine+(i.generatedOffset.generatedLine-1),generatedColumn:u.generatedColumn+(i.generatedOffset.generatedLine===u.generatedLine?i.generatedOffset.generatedColumn-1:0),originalLine:u.originalLine,originalColumn:u.originalColumn,name:g};this.__generatedMappings.push(p),"number"==typeof p.originalLine&&this.__originalMappings.push(p)}o(this.__generatedMappings,e.compareByGeneratedPositionsDeflated),o(this.__originalMappings,e.compareByOriginalPositions)},{SourceMapConsumer:i,BasicSourceMapConsumer:s,IndexedSourceMapConsumer:u}});
//# sourceMappingURL=sourcemaps/source-map-consumer.js.map
