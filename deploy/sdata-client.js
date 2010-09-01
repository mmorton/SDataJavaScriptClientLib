/*
 * 
 */
if(Sage){(function(d){var a=d.namespace("SData.Client.Ajax");var f=function(g){return((g>=200&&g<300)||g===304||g===0)};var b=function(h,g){if(h.readyState==4){if(f(h.status)){if(g.success){g.success.call(g.scope||this,h,g)}}else{if(g.failure){g.failure.call(g.scope||this,h,g)}}}};var c=function(h,g){h.onreadystatechange=function(){b.call(h,h,g)}};var e=function(h){var g=[];for(var i in h){g.push(encodeURIComponent(i)+"="+encodeURIComponent(h[i]))}return g.join("&")};d.apply(a,{request:function(j){var j=d.apply({},j);j.params=d.apply({},j.params);j.headers=d.apply({},j.headers);if(j.cache!==false){j.params[j.cacheParam||"_t"]=(new Date()).getTime()}j.method=j.method||"GET";var g=e(j.params);if(g){j.url=j.url+(/\?/.test(j.url)?"&":"?")+g}var i=new XMLHttpRequest();if(j.user){i.open(j.method,j.url,j.async!==false,j.user,j.password);i.withCredentials=true}else{i.open(j.method,j.url,j.async!==false)}try{i.setRequestHeader("Accept",j.accept||"*/*");i.setRequestHeader("X-Requested-With","XMLHttpRequest");if(j.contentType){i.setRequestHeader("Content-Type",j.contentType)}for(var k in j.headers){i.setRequestHeader(k,j.headers[k])}}catch(h){}c(i,j);i.send(j.body||null);return i},cancel:function(g){g.abort()}})})(Sage)}if(Sage){(function(a){var b=a.namespace("SData.Client");b.SDataBaseRequest=a.Class.define({constructor:function(c){this.base.apply(this,arguments);this.service=c;this.uri=new Sage.SData.Client.SDataUri();if(this.service){this.uri.setVersion(this.service.getVersion());this.uri.setIncludeContent(this.service.getIncludeContent());this.uri.setServer(this.service.getVirtualDirectory()?this.service.getVirtualDirectory():"sdata");this.uri.setScheme(this.service.getProtocol());this.uri.setHost(this.service.getServerName());this.uri.setPort(this.service.getPort())}},getService:function(){return this.service},getUri:function(){return this.uri},setUri:function(c){this.uri=c;return this},getServerName:function(){return this.uri.getHost()},setServerName:function(c){this.uri.setHost(c);return this},getVirtualDirectory:function(){return this.uri.getServer()},setVirtualDirectory:function(c){this.uri.setServer(c);return this},getProtocol:function(){return this.uri.getScheme()},setProtocol:function(c){this.uri.setScheme(c);return this},getPort:function(){return this.uri.getPort()},setPort:function(c){this.uri.setPort(c);return this},getQueryArgs:function(){return this.uri.getQueryArgs()},setQueryArgs:function(d,c){this.uri.setQueryArgs(d,c);return this},getQueryArg:function(c){return this.uri.getQueryArg(c)},setQueryArg:function(c,d){this.uri.setQueryArg(c,d);return this},build:function(){return this.uri.build()}})})(Sage)}if(Sage){(function(a){var b=a.namespace("SData.Client");b.SDataApplicationRequest=b.SDataBaseRequest.extend({constructor:function(){this.base.apply(this,arguments);if(this.service){this.uri.setProduct(this.service.getApplicationName()?this.service.getApplicationName():"-");this.uri.setContract(this.service.getContractName()?this.service.getContractName():"-");this.uri.setCompanyDataset(this.service.getDataSet()?this.service.getDataSet():"-")}},getApplicationName:function(){return this.uri.getProduct()},setApplicationName:function(c){this.uri.setProduct(c);return this},getContractName:function(){return this.uri.getContract()},setContractName:function(c){this.uri.setContract(c);return this},getDataSet:function(){return this.uri.getCompanyDataset()},setDataSet:function(c){this.uri.setCompanyDataset(c);return this},getResourceKind:function(){return this.uri.getCollectionType()},setResourceKind:function(c){this.uri.setCollectionType(c);return this}})})(Sage)}if(Sage){(function(a){var b=a.namespace("SData.Client");b.SDataResourceCollectionRequest=b.SDataApplicationRequest.extend({constructor:function(){this.base.apply(this,arguments)},getCount:function(){return this.uri.getCount()},setCount:function(c){this.uri.setCount(c);return this},getStartIndex:function(){return this.uri.getStartIndex()},setStartIndex:function(c){this.uri.setStartIndex(c);return this},read:function(c){return this.service.readFeed(this,c)}})})(Sage)}if(Sage){(function(a){var b=a.namespace("SData.Client");b.SDataSingleResourceRequest=b.SDataApplicationRequest.extend({constructor:function(){this.base.apply(this,arguments)},read:function(c){return this.service.readEntry(this,c)},update:function(d,c){return this.service.updateEntry(this,d,c)},create:function(d,c){return this.service.createEntry(this,d,c)},"delete":function(d,c){return this.service.deleteEntry(this,d,c)},getResourceSelector:function(){return this.uri.getCollectionPredicate()},setResourceSelector:function(c){this.uri.setCollectionPredicate(c);return this}})})(Sage)}if(Sage){(function(a){var b=a.namespace("SData.Client");b.SDataSystemRequest=b.SDataBaseRequest.extend({constructor:function(){this.base.apply(this,arguments);this.uri.setPathSegment(Sage.SData.Client.SDataUri.ProductPathIndex,Sage.SData.Client.SDataUri.SystemSegment)},getCategory:function(){this.uri.getPathSegment(Sage.SData.Client.SDataUri.ContractTypePathIndex)},setCategory:function(c){this.uri.setPathSegment(Sage.SData.Client.SDataUri.ContractTypePathIndex,c);return this},read:function(c){return this.service.readFeed(this,c)}})})(Sage)}if(Sage){(function(a){var b=a.namespace("SData.Client");b.SDataTemplateResourceRequest=b.SDataApplicationRequest.extend({constructor:function(){this.base.apply(this,arguments);this.uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex,Sage.SData.Client.SDataUri.TemplateSegment)},read:function(c){return this.service.readEntry(this,c)}})})(Sage)}if(Sage){(function(a){var b=a.namespace("SData.Client");b.SDataUri=a.Class.define({constructor:function(c){this.base.apply(this,arguments);this.scheme=Sage.SData.Client.SDataUri.Http;this.host="";this.server="";this.port=Sage.SData.Client.SDataUri.UnspecifiedPort;this.queryArgs={};this.pathSegments=[];this.startIndex=false;this.count=false;this.version={major:1,minor:0};a.apply(this,c)},getVersion:function(){return this.version},setVersion:function(c){this.version=a.apply({major:0,minor:0},c);return this},getScheme:function(){return this.scheme},setScheme:function(c){this.scheme=c;return this},getHost:function(){return this.host},setHost:function(c){this.host=c;return this},getPort:function(){return this.port},setPort:function(c){this.port=c;return this},getServer:function(){return this.server},setServer:function(c){this.server=c;return this},getQueryArgs:function(){return this.queryArgs},setQueryArgs:function(d,c){this.queryArgs=c!==true?a.apply(this.queryArgs,d):d;return this},getQueryArg:function(c){return this.queryArgs[c]},setQueryArg:function(c,d){this.queryArgs[c]=d;return this},getPathSegments:function(){return this.pathSegments},setPathSegments:function(c){this.pathSegments=c;return this},getPathSegment:function(c){return this.pathSegments.length>c?this.pathSegments[c]:false},setPathSegment:function(d,e,c){if(typeof e==="string"){var e={text:e};if(c){e.predicate=c}}this.pathSegments[d]=a.apply(this.pathSegments[d]||{},e);return this},getStartIndex:function(){return this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.StartIndex]?parseInt(this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.StartIndex]):false},setStartIndex:function(c){this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.StartIndex]=c;return this},getCount:function(){return this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.Count]?parseInt(this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.Count]):false},setCount:function(c){this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.Count]=c;return this},getIncludeContent:function(){if(this.version.major>=1){return this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.IncludeContent]=="true"}else{return this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.LegacyIncludeContent]=="true"}},setIncludeContent:function(c){if(this.version.major>=1){this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.IncludeContent]=c?"true":"false"}else{this.queryArgs[Sage.SData.Client.SDataUri.QueryArgNames.LegacyIncludeContent]=c?"true":"false"}return this},appendPath:function(c){this.pathSegments.push(typeof c==="string"?{text:c}:c);return this},build:function(){var c=[];c.push(this.getScheme());c.push(Sage.SData.Client.SDataUri.SchemeSuffix);c.push(Sage.SData.Client.SDataUri.PathSegmentPrefix);c.push(Sage.SData.Client.SDataUri.PathSegmentPrefix);c.push(this.getHost());if(this.getPort()!==Sage.SData.Client.SDataUri.UnspecifiedPort){c.push(Sage.SData.Client.SDataUri.PortPrefix);c.push(this.getPort())}c.push(Sage.SData.Client.SDataUri.PathSegmentPrefix);var g=this.getPathSegments();var l=[];var e=this.getServer();if(e&&e.length>0){l=l.concat(e.split("/"))}for(var f=0;f<g.length;f++){var h=g[f];if(typeof h==="undefined"){continue}if(h.predicate){l.push(encodeURIComponent(h.text+"("+h.predicate+")"))}else{l.push(encodeURIComponent(h.text))}}c.push(l.join(Sage.SData.Client.SDataUri.PathSegmentPrefix));var d=this.getQueryArgs();var j=[];for(var k in d){j.push(encodeURIComponent(k)+Sage.SData.Client.SDataUri.QueryArgValuePrefix+encodeURIComponent(d[k]))}if(j.length>0){c.push(Sage.SData.Client.SDataUri.QueryPrefix);c.push(j.join(Sage.SData.Client.SDataUri.QueryArgPrefix))}return c.join("")},getProduct:function(){return this.getPathSegment(Sage.SData.Client.SDataUri.ProductPathIndex)},setProduct:function(c){return this.setPathSegment(Sage.SData.Client.SDataUri.ProductPathIndex,c)},getContract:function(){return this.getPathSegment(Sage.SData.Client.SDataUri.ContractTypePathIndex)},setContract:function(c){return this.setPathSegment(Sage.SData.Client.SDataUri.ContractTypePathIndex,c)},getCompanyDataset:function(){return this.getPathSegment(Sage.SData.Client.SDataUri.CompanyDatasetPathIndex)},setCompanyDataset:function(c){return this.setPathSegment(Sage.SData.Client.SDataUri.CompanyDatasetPathIndex,c)},getCollectionType:function(){return this.getPathSegment(Sage.SData.Client.SDataUri.CollectionTypePathIndex)},setCollectionType:function(c){return this.setPathSegment(Sage.SData.Client.SDataUri.CollectionTypePathIndex,c)},getCollectionPredicate:function(){var c=this.getPathSegment(Sage.SData.Client.SDataUri.CollectionTypePathIndex);return c&&c.predicate?c.predicate:false},setCollectionPredicate:function(c){return this.setPathSegment(Sage.SData.Client.SDataUri.CollectionTypePathIndex,{predicate:c})}});a.apply(b.SDataUri,{Http:"http",Https:"https",PathSegmentPrefix:"/",PortPrefix:":",QueryArgPrefix:"&",QueryArgValuePrefix:"=",QueryPrefix:"?",SchemeSuffix:":",UnspecifiedPort:-1,UriName:"uri",QueryArgNames:{Count:"count",Exclude:"exclude",Format:"format",Include:"include",IncludeContent:"_includeContent",LegacyIncludeContent:"includeContent",IncludeSchema:"includeSchema",Language:"language",OrderBy:"orderby",Precedence:"precedence",ReturnDelta:"returnDelta",Search:"search",Select:"select",StartIndex:"startIndex",Thumbnail:"thumbnail",TrackingID:"trackingID",Where:"where"},ProductPathIndex:0,ContractTypePathIndex:1,CompanyDatasetPathIndex:2,CollectionTypePathIndex:3,ResourcePropertyIndex:4,ServiceMethodSegment:"$service",TemplateSegment:"$template",SystemSegment:"$system"})})(Sage)}if(Sage){(function(a){var b=a.namespace("SData.Client");b.SDataService=a.Evented.extend({constructor:function(c){this.base.apply(this,arguments);this.uri=new Sage.SData.Client.SDataUri();this.userAgent="Sage";this.username=false;this.password="";if(c){if(c.version){this.uri.setVersion(c.version)}if(c.serverName){this.uri.setHost(c.serverName)}if(c.virtualDirectory){this.uri.setServer(c.virtualDirectory)}if(c.applicationName){this.uri.setProduct(c.applicationName)}if(c.contractName){this.uri.setContract(c.contractName)}if(c.port){this.uri.setPort(c.port)}if(c.protocol){this.uri.setScheme(c.protocol)}if(typeof c.includeContent==="boolean"){this.uri.setIncludeContent(c.includeContent)}if(c.userName){this.username=c.userName}if(c.password){this.password=c.password}if(c.json){this.json=true}}this.addEvents("beforerequest","requestcomplete","requestexception")},isJsonEnabled:function(){return this.json},enableJson:function(){this.json=true;return this},disableJson:function(){this.json=false;return this},getVersion:function(){return this.uri.getVersion()},setVersion:function(c){this.uri.setVersion(c);return this},getUri:function(){return this.uri},getUserName:function(){return this.username},setUserName:function(c){this.username=c;return this},getPassword:function(){return this.password},setPassword:function(c){this.password=c;return this},getProtocol:function(){return this.uri.getScheme()},setProtocol:function(c){this.uri.setScheme(c);return this},getServerName:function(){return this.uri.getHost()},setServerName:function(c){this.uri.setHost(c);return this},getPort:function(){return this.uri.getPort()},setPort:function(c){this.uri.setPort(c);return this},getVirtualDirectory:function(){return this.uri.getServer()},setVirtualDirectory:function(c){this.uri.setServer(c);return this},getApplicationName:function(){return this.uri.getProduct()},setApplicationName:function(c){this.uri.setProduct(c);return this},getContractName:function(){return this.uri.getContract()},setContractName:function(c){this.uri.setContract(c);return this},getDataSet:function(){return this.uri.getCompanyDataset()},setDataSet:function(c){this.uri.setCompanyDataset(c);return this},getIncludeContent:function(){return this.uri.getIncludeContent()},setIncludeContent:function(c){this.uri.setIncludeContent(c);return this},getUserAgent:function(){return this.userAgent},setUserAgent:function(c){this.userAgent=c;return this},createBasicAuthToken:function(){return"Basic "+Base64.encode(this.username+":"+this.password)},createHeadersForRequest:function(c){var d={"X-Authorization-Mode":"no-challenge"};if(this.username!==false){d.Authorization=d["X-Authorization"]=this.createBasicAuthToken()}return d},executeRequest:function(d,c,e){var f=a.apply({headers:{},method:"GET",async:c.async},{scope:this,success:function(g,h){var i=this.processFeed(g);this.fireEvent("requestcomplete",d,h,i);if(c.success){c.success.call(c.scope||this,i)}},failure:function(g,h){this.fireEvent("requestexception",d,h,g);if(c.failure){c.failure.call(c.scope||this,g,h)}}},e);a.apply(f.headers,this.createHeadersForRequest(d));if(this.json){d.setQueryArg("format","json")}f.url=d.build();this.fireEvent("beforerequest",d,f);if(typeof f.result!=="undefined"){if(c.success){c.success.call(c.scope||this,f.result)}return}return b.Ajax.request(f)},abortRequest:function(c){b.Ajax.abort(c)},readFeed:function(d,c){return this.executeRequest(d,c,{headers:{Accept:this.json?"application/json":"application/atom+xml;type=feed,*/*"}})},readEntry:function(d,c){var e=a.apply({},{success:function(g){var f=g["$resources"][0]||false;if(c.success){c.success.call(c.scope||this,f)}}},c);return this.executeRequest(d,e,{headers:{Accept:this.json?"application/json":"application/atom+xml;type=entry,*/*"}})},createEntry:function(f,e,d){var h=a.apply({},{success:function(j){var i=j["$resources"][0]||false;if(d.success){d.success.call(d.scope||this,i)}}},d);var g=a.apply({},{method:"POST"});if(this.isJsonEnabled()){a.apply(g,{body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})}else{var c=new XML.ObjTree();c.attr_prefix="@";a.apply(g,{body:c.writeXML(this.formatEntry(e)),headers:{"Content-Type":"application/atom+xml;type=entry",Accept:"application/atom+xml;type=entry,*/*"}})}return this.executeRequest(f,h,g)},updateEntry:function(f,e,d){var h=a.apply({},{success:function(j){var i=j["$resources"][0]||false;if(d.success){d.success.call(d.scope||this,i)}}},d);var g=a.apply({},{method:"PUT"});if(this.isJsonEnabled()){a.apply(g,{body:JSON.stringify(e),headers:{"Content-Type":"application/json","If-Match":e["$etag"]}})}else{var c=new XML.ObjTree();c.attr_prefix="@";a.apply(g,{body:c.writeXML(this.formatEntry(e)),headers:{"Content-Type":"application/atom+xml;type=entry",Accept:"application/atom+xml;type=entry,*/*","If-Match":e["$etag"]}})}return this.executeRequest(f,h,g)},deleteEntry:function(e,d,c){var f=a.apply({},{method:"DELETE",headers:{"If-Match":d["$etag"]}});return this.executeRequest(e,c,f)},parseFeedXml:function(d){var c=new XML.ObjTree();c.attr_prefix="@";return c.parseXML(d)},convertEntity:function(h,c,e,d){d=d||{};d["$name"]=c;d["$key"]=e["@sdata:key"];d["$url"]=e["@sdata:uri"];d["$uuid"]=e["@sdata:uuid"];var f=h+":";for(var k in e){if(k.indexOf(f)===0){var g=k.substring(f.length);var i=e[k];if(typeof i==="object"){if(i.hasOwnProperty("@xsi:nil")){var j=null}else{if(i.hasOwnProperty("@sdata:key")){var j=this.convertEntity(h,g,i)}}i=j}d[g]=i}}return d},formatEntity:function(e,d,g){g=g||{};if(d["$key"]){g["@sdata:key"]=d["$key"]}if(d["$url"]){g["@sdata:uri"]=d["$url"]}for(var c in d){if(/^\$/.test(c)){continue}var f=d[c];if(f==null){f={"@xsi:nil":"true"}}else{if(typeof f==="object"){f=this.formatEntity(e,f)}}g[c]=f}return g},convertEntry:function(h){var c={};c["$descriptor"]=h.title;c["$etag"]=h["http:etag"];c["$httpStatus"]=h["http:httpStatus"];var j=h["sdata:payload"];for(var f in j){if(j.hasOwnProperty(f)==false){continue}var i=f.split(":");if(i.length<2){continue}var g=i[0];var e=i[1];var d=j[f];this.convertEntity(g,e,d,c)}return c},formatEntry:function(d){var c={};c["@xmlns:sdata"]="http://schemas.sage.com/sdata/2008/1";c["@xmlns:xsi"]="http://www.w3.org/2001/XMLSchema-instance";c["@xmlns:http"]="http://schemas.sage.com/sdata/http/2008/1";c["@xmlns"]="http://www.w3.org/2005/Atom";if(d["$etag"]){c["http:etag"]=d["$etag"]}c["sdata:payload"]={};c["sdata:payload"][d["$name"]]={"@xmlns":"http://schemas.sage.com/dynamic/2007"};this.formatEntity(false,d,c["sdata:payload"][d["$name"]]);return{entry:c}},convertFeed:function(e){var c={};if(e["opensearch:totalResults"]){c["$totalResults"]=parseInt(e["opensearch:totalResults"])}if(e["opensearch:startIndex"]){c["$startIndex"]=parseInt(e["opensearch:startIndex"])}if(e["opensearch:itemsPerPage"]){c["$itemsPerPage"]=parseInt(e["opensearch:itemsPerPage"])}if(e.link){c["$link"]={};for(var d=0;d<e.link.length;d++){c["$link"][e.link[d]["@rel"]]=e.link[d]["@href"]}if(c["$link"]["self"]){c["$url"]=c["$link"]["self"]}}c["$resources"]=[];if(a.isArray(e.entry)){for(var d=0;d<e.entry.length;d++){c["$resources"].push(this.convertEntry(e.entry[d]))}}else{if(typeof e.entry==="object"){c["$resources"].push(this.convertEntry(e.entry))}}return c},processFeed:function(c){var e=typeof c.getResponseHeader==="function"?c.getResponseHeader("Content-Type"):false;if(!c.responseText){return null}if((e==="application/json")||(!e&&this.isJsonEnabled())){var d=JSON.parse(c.responseText);if(d.hasOwnProperty("$resources")){return d}else{return{"$resources":[d]}}}else{var d=this.parseFeedXml(c.responseText);if(d.hasOwnProperty("feed")){return this.convertFeed(d.feed)}else{if(d.hasOwnProperty("entry")){return{"$resources":[this.convertEntry(d.entry)]}}else{return false}}}}})})(Sage)};