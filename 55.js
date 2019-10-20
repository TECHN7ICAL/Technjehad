(function(){var root=this;var previousUnderscore=root._;var ArrayProto=Array.prototype,ObjProto=Object.prototype,FuncProto=Function.prototype;var push=ArrayProto.push,slice=ArrayProto.slice,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty;var nativeIsArray=Array.isArray,nativeKeys=Object.keys,nativeBind=FuncProto.bind,nativeCreate=Object.create;var Ctor=function(){};var _=function(obj){if(obj instanceof _)return obj;if(!(this instanceof _))return new _(obj);this._wrapped=obj};if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports){exports=module.exports=_}
exports._=_}else{root._=_}
_.VERSION='1.8.3';var optimizeCb=function(func,context,argCount){if(context===void 0)return func;switch(argCount==null?3:argCount){case 1:return function(value){return func.call(context,value)};case 2:return function(value,other){return func.call(context,value,other)};case 3:return function(value,index,collection){return func.call(context,value,index,collection)};case 4:return function(accumulator,value,index,collection){return func.call(context,accumulator,value,index,collection)}}
return function(){return func.apply(context,arguments)}};var cb=function(value,context,argCount){if(value==null)return _.identity;if(_.isFunction(value))return optimizeCb(value,context,argCount);if(_.isObject(value))return _.matcher(value);return _.property(value)};_.iteratee=function(value,context){return cb(value,context,Infinity)};var createAssigner=function(keysFunc,undefinedOnly){return function(obj){var length=arguments.length;if(length<2||obj==null)return obj;for(var index=1;index<length;index++){var source=arguments[index],keys=keysFunc(source),l=keys.length;for(var i=0;i<l;i++){var key=keys[i];if(!undefinedOnly||obj[key]===void 0)obj[key]=source[key]}}
return obj}};var baseCreate=function(prototype){if(!_.isObject(prototype))return{};if(nativeCreate)return nativeCreate(prototype);Ctor.prototype=prototype;var result=new Ctor;Ctor.prototype=null;return result};var property=function(key){return function(obj){return obj==null?void 0:obj[key]}};var MAX_ARRAY_INDEX=Math.pow(2,53)-1;var getLength=property('length');var isArrayLike=function(collection){var length=getLength(collection);return typeof length=='number'&&length>=0&&length<=MAX_ARRAY_INDEX};_.each=_.forEach=function(obj,iteratee,context){iteratee=optimizeCb(iteratee,context);var i,length;if(isArrayLike(obj)){for(i=0,length=obj.length;i<length;i++){iteratee(obj[i],i,obj)}}else{var keys=_.keys(obj);for(i=0,length=keys.length;i<length;i++){iteratee(obj[keys[i]],keys[i],obj)}}
return obj};_.map=_.collect=function(obj,iteratee,context){iteratee=cb(iteratee,context);var keys=!isArrayLike(obj)&&_.keys(obj),length=(keys||obj).length,results=Array(length);for(var index=0;index<length;index++){var currentKey=keys?keys[index]:index;results[index]=iteratee(obj[currentKey],currentKey,obj)}
return results};function createReduce(dir){function iterator(obj,iteratee,memo,keys,index,length){for(;index>=0&&index<length;index+=dir){var currentKey=keys?keys[index]:index;memo=iteratee(memo,obj[currentKey],currentKey,obj)}
return memo}
return function(obj,iteratee,memo,context){iteratee=optimizeCb(iteratee,context,4);var keys=!isArrayLike(obj)&&_.keys(obj),length=(keys||obj).length,index=dir>0?0:length-1;if(arguments.length<3){memo=obj[keys?keys[index]:index];index+=dir}
return iterator(obj,iteratee,memo,keys,index,length)}}
_.reduce=_.foldl=_.inject=createReduce(1);_.reduceRight=_.foldr=createReduce(-1);_.find=_.detect=function(obj,predicate,context){var key;if(isArrayLike(obj)){key=_.findIndex(obj,predicate,context)}else{key=_.findKey(obj,predicate,context)}
if(key!==void 0&&key!==-1)return obj[key]};_.filter=_.select=function(obj,predicate,context){var results=[];predicate=cb(predicate,context);_.each(obj,function(value,index,list){if(predicate(value,index,list))results.push(value)});return results};_.reject=function(obj,predicate,context){return _.filter(obj,_.negate(cb(predicate)),context)};_.every=_.all=function(obj,predicate,context){predicate=cb(predicate,context);var keys=!isArrayLike(obj)&&_.keys(obj),length=(keys||obj).length;for(var index=0;index<length;index++){var currentKey=keys?keys[index]:index;if(!predicate(obj[currentKey],currentKey,obj))return!1}
return!0};_.some=_.any=function(obj,predicate,context){predicate=cb(predicate,context);var keys=!isArrayLike(obj)&&_.keys(obj),length=(keys||obj).length;for(var index=0;index<length;index++){var currentKey=keys?keys[index]:index;if(predicate(obj[currentKey],currentKey,obj))return!0}
return!1};_.contains=_.includes=_.include=function(obj,item,fromIndex,guard){if(!isArrayLike(obj))obj=_.values(obj);if(typeof fromIndex!='number'||guard)fromIndex=0;return _.indexOf(obj,item,fromIndex)>=0};_.invoke=function(obj,method){var args=slice.call(arguments,2);var isFunc=_.isFunction(method);return _.map(obj,function(value){var func=isFunc?method:value[method];return func==null?func:func.apply(value,args)})};_.pluck=function(obj,key){return _.map(obj,_.property(key))};_.where=function(obj,attrs){return _.filter(obj,_.matcher(attrs))};_.findWhere=function(obj,attrs){return _.find(obj,_.matcher(attrs))};_.max=function(obj,iteratee,context){var result=-Infinity,lastComputed=-Infinity,value,computed;if(iteratee==null&&obj!=null){obj=isArrayLike(obj)?obj:_.values(obj);for(var i=0,length=obj.length;i<length;i++){value=obj[i];if(value>result){result=value}}}else{iteratee=cb(iteratee,context);_.each(obj,function(value,index,list){computed=iteratee(value,index,list);if(computed>lastComputed||computed===-Infinity&&result===-Infinity){result=value;lastComputed=computed}})}
return result};_.min=function(obj,iteratee,context){var result=Infinity,lastComputed=Infinity,value,computed;if(iteratee==null&&obj!=null){obj=isArrayLike(obj)?obj:_.values(obj);for(var i=0,length=obj.length;i<length;i++){value=obj[i];if(value<result){result=value}}}else{iteratee=cb(iteratee,context);_.each(obj,function(value,index,list){computed=iteratee(value,index,list);if(computed<lastComputed||computed===Infinity&&result===Infinity){result=value;lastComputed=computed}})}
return result};_.shuffle=function(obj){var set=isArrayLike(obj)?obj:_.values(obj);var length=set.length;var shuffled=Array(length);for(var index=0,rand;index<length;index++){rand=_.random(0,index);if(rand!==index)shuffled[index]=shuffled[rand];shuffled[rand]=set[index]}
return shuffled};_.sample=function(obj,n,guard){if(n==null||guard){if(!isArrayLike(obj))obj=_.values(obj);return obj[_.random(obj.length-1)]}
return _.shuffle(obj).slice(0,Math.max(0,n))};_.sortBy=function(obj,iteratee,context){iteratee=cb(iteratee,context);return _.pluck(_.map(obj,function(value,index,list){return{value:value,index:index,criteria:iteratee(value,index,list)}}).sort(function(left,right){var a=left.criteria;var b=right.criteria;if(a!==b){if(a>b||a===void 0)return 1;if(a<b||b===void 0)return-1}
return left.index-right.index}),'value')};var group=function(behavior){return function(obj,iteratee,context){var result={};iteratee=cb(iteratee,context);_.each(obj,function(value,index){var key=iteratee(value,index,obj);behavior(result,value,key)});return result}};_.groupBy=group(function(result,value,key){if(_.has(result,key))result[key].push(value);else result[key]=[value]});_.indexBy=group(function(result,value,key){result[key]=value});_.countBy=group(function(result,value,key){if(_.has(result,key))result[key]++;else result[key]=1});_.toArray=function(obj){if(!obj)return[];if(_.isArray(obj))return slice.call(obj);if(isArrayLike(obj))return _.map(obj,_.identity);return _.values(obj)};_.size=function(obj){if(obj==null)return 0;return isArrayLike(obj)?obj.length:_.keys(obj).length};_.partition=function(obj,predicate,context){predicate=cb(predicate,context);var pass=[],fail=[];_.each(obj,function(value,key,obj){(predicate(value,key,obj)?pass:fail).push(value)});return[pass,fail]};_.first=_.head=_.take=function(array,n,guard){if(array==null)return void 0;if(n==null||guard)return array[0];return _.initial(array,array.length-n)};_.initial=function(array,n,guard){return slice.call(array,0,Math.max(0,array.length-(n==null||guard?1:n)))};_.last=function(array,n,guard){if(array==null)return void 0;if(n==null||guard)return array[array.length-1];return _.rest(array,Math.max(0,array.length-n))};_.rest=_.tail=_.drop=function(array,n,guard){return slice.call(array,n==null||guard?1:n)};_.compact=function(array){return _.filter(array,_.identity)};var flatten=function(input,shallow,strict,startIndex){var output=[],idx=0;for(var i=startIndex||0,length=getLength(input);i<length;i++){var value=input[i];if(isArrayLike(value)&&(_.isArray(value)||_.isArguments(value))){if(!shallow)value=flatten(value,shallow,strict);var j=0,len=value.length;output.length+=len;while(j<len){output[idx++]=value[j++]}}else if(!strict){output[idx++]=value}}
return output};_.flatten=function(array,shallow){return flatten(array,shallow,!1)};_.without=function(array){return _.difference(array,slice.call(arguments,1))};_.uniq=_.unique=function(array,isSorted,iteratee,context){if(!_.isBoolean(isSorted)){context=iteratee;iteratee=isSorted;isSorted=!1}
if(iteratee!=null)iteratee=cb(iteratee,context);var result=[];var seen=[];for(var i=0,length=getLength(array);i<length;i++){var value=array[i],computed=iteratee?iteratee(value,i,array):value;if(isSorted){if(!i||seen!==computed)result.push(value);seen=computed}else if(iteratee){if(!_.contains(seen,computed)){seen.push(computed);result.push(value)}}else if(!_.contains(result,value)){result.push(value)}}
return result};_.union=function(){return _.uniq(flatten(arguments,!0,!0))};_.intersection=function(array){var result=[];var argsLength=arguments.length;for(var i=0,length=getLength(array);i<length;i++){var item=array[i];if(_.contains(result,item))continue;for(var j=1;j<argsLength;j++){if(!_.contains(arguments[j],item))break}
if(j===argsLength)result.push(item)}
return result};_.difference=function(array){var rest=flatten(arguments,!0,!0,1);return _.filter(array,function(value){return!_.contains(rest,value)})};_.zip=function(){return _.unzip(arguments)};_.unzip=function(array){var length=array&&_.max(array,getLength).length||0;var result=Array(length);for(var index=0;index<length;index++){result[index]=_.pluck(array,index)}
return result};_.object=function(list,values){var result={};for(var i=0,length=getLength(list);i<length;i++){if(values){result[list[i]]=values[i]}else{result[list[i][0]]=list[i][1]}}
return result};function createPredicateIndexFinder(dir){return function(array,predicate,context){predicate=cb(predicate,context);var length=getLength(array);var index=dir>0?0:length-1;for(;index>=0&&index<length;index+=dir){if(predicate(array[index],index,array))return index}
return-1}}
_.findIndex=createPredicateIndexFinder(1);_.findLastIndex=createPredicateIndexFinder(-1);_.sortedIndex=function(array,obj,iteratee,context){iteratee=cb(iteratee,context,1);var value=iteratee(obj);var low=0,high=getLength(array);while(low<high){var mid=Math.floor((low+high)/2);if(iteratee(array[mid])<value)low=mid+1;else high=mid}
return low};function createIndexFinder(dir,predicateFind,sortedIndex){return function(array,item,idx){var i=0,length=getLength(array);if(typeof idx=='number'){if(dir>0){i=idx>=0?idx:Math.max(idx+length,i)}else{length=idx>=0?Math.min(idx+1,length):idx+length+1}}else if(sortedIndex&&idx&&length){idx=sortedIndex(array,item);return array[idx]===item?idx:-1}
if(item!==item){idx=predicateFind(slice.call(array,i,length),_.isNaN);return idx>=0?idx+i:-1}
for(idx=dir>0?i:length-1;idx>=0&&idx<length;idx+=dir){if(array[idx]===item)return idx}
return-1}}
_.indexOf=createIndexFinder(1,_.findIndex,_.sortedIndex);_.lastIndexOf=createIndexFinder(-1,_.findLastIndex);_.range=function(start,stop,step){if(stop==null){stop=start||0;start=0}
step=step||1;var length=Math.max(Math.ceil((stop-start)/step),0);var range=Array(length);for(var idx=0;idx<length;idx++,start+=step){range[idx]=start}
return range};var executeBound=function(sourceFunc,boundFunc,context,callingContext,args){if(!(callingContext instanceof boundFunc))return sourceFunc.apply(context,args);var self=baseCreate(sourceFunc.prototype);var result=sourceFunc.apply(self,args);if(_.isObject(result))return result;return self};_.bind=function(func,context){if(nativeBind&&func.bind===nativeBind)return nativeBind.apply(func,slice.call(arguments,1));if(!_.isFunction(func))throw new TypeError('Bind must be called on a function');var args=slice.call(arguments,2);var bound=function(){return executeBound(func,bound,context,this,args.concat(slice.call(arguments)))};return bound};_.partial=function(func){var boundArgs=slice.call(arguments,1);var bound=function(){var position=0,length=boundArgs.length;var args=Array(length);for(var i=0;i<length;i++){args[i]=boundArgs[i]===_?arguments[position++]:boundArgs[i]}
while(position<arguments.length)args.push(arguments[position++]);return executeBound(func,bound,this,this,args)};return bound};_.bindAll=function(obj){var i,length=arguments.length,key;if(length<=1)throw new Error('bindAll must be passed function names');for(i=1;i<length;i++){key=arguments[i];obj[key]=_.bind(obj[key],obj)}
return obj};_.memoize=function(func,hasher){var memoize=function(key){var cache=memoize.cache;var address=''+(hasher?hasher.apply(this,arguments):key);if(!_.has(cache,address))cache[address]=func.apply(this,arguments);return cache[address]};memoize.cache={};return memoize};_.delay=function(func,wait){var args=slice.call(arguments,2);return setTimeout(function(){return func.apply(null,args)},wait)};_.defer=_.partial(_.delay,_,1);_.throttle=function(func,wait,options){var context,args,result;var timeout=null;var previous=0;if(!options)options={};var later=function(){previous=options.leading===!1?0:_.now();timeout=null;result=func.apply(context,args);if(!timeout)context=args=null};return function(){var now=_.now();if(!previous&&options.leading===!1)previous=now;var remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0||remaining>wait){if(timeout){clearTimeout(timeout);timeout=null}
previous=now;result=func.apply(context,args);if(!timeout)context=args=null}else if(!timeout&&options.trailing!==!1){timeout=setTimeout(later,remaining)}
return result}};_.debounce=function(func,wait,immediate){var timeout,args,context,timestamp,result;var later=function(){var last=_.now()-timestamp;if(last<wait&&last>=0){timeout=setTimeout(later,wait-last)}else{timeout=null;if(!immediate){result=func.apply(context,args);if(!timeout)context=args=null}}};return function(){context=this;args=arguments;timestamp=_.now();var callNow=immediate&&!timeout;if(!timeout)timeout=setTimeout(later,wait);if(callNow){result=func.apply(context,args);context=args=null}
return result}};_.wrap=function(func,wrapper){return _.partial(wrapper,func)};_.negate=function(predicate){return function(){return!predicate.apply(this,arguments)}};_.compose=function(){var args=arguments;var start=args.length-1;return function(){var i=start;var result=args[start].apply(this,arguments);while(i--)result=args[i].call(this,result);return result}};_.after=function(times,func){return function(){if(--times<1){return func.apply(this,arguments)}}};_.before=function(times,func){var memo;return function(){if(--times>0){memo=func.apply(this,arguments)}
if(times<=1)func=null;return memo}};_.once=_.partial(_.before,2);var hasEnumBug=!{toString:null}.propertyIsEnumerable('toString');var nonEnumerableProps=['valueOf','isPrototypeOf','toString','propertyIsEnumerable','hasOwnProperty','toLocaleString'];function collectNonEnumProps(obj,keys){var nonEnumIdx=nonEnumerableProps.length;var constructor=obj.constructor;var proto=(_.isFunction(constructor)&&constructor.prototype)||ObjProto;var prop='constructor';if(_.has(obj,prop)&&!_.contains(keys,prop))keys.push(prop);while(nonEnumIdx--){prop=nonEnumerableProps[nonEnumIdx];if(prop in obj&&obj[prop]!==proto[prop]&&!_.contains(keys,prop)){keys.push(prop)}}}
_.keys=function(obj){if(!_.isObject(obj))return[];if(nativeKeys)return nativeKeys(obj);var keys=[];for(var key in obj)if(_.has(obj,key))keys.push(key);if(hasEnumBug)collectNonEnumProps(obj,keys);return keys};_.allKeys=function(obj){if(!_.isObject(obj))return[];var keys=[];for(var key in obj)keys.push(key);if(hasEnumBug)collectNonEnumProps(obj,keys);return keys};_.values=function(obj){var keys=_.keys(obj);var length=keys.length;var values=Array(length);for(var i=0;i<length;i++){values[i]=obj[keys[i]]}
return values};_.mapObject=function(obj,iteratee,context){iteratee=cb(iteratee,context);var keys=_.keys(obj),length=keys.length,results={},currentKey;for(var index=0;index<length;index++){currentKey=keys[index];results[currentKey]=iteratee(obj[currentKey],currentKey,obj)}
return results};_.pairs=function(obj){var keys=_.keys(obj);var length=keys.length;var pairs=Array(length);for(var i=0;i<length;i++){pairs[i]=[keys[i],obj[keys[i]]]}
return pairs};_.invert=function(obj){var result={};var keys=_.keys(obj);for(var i=0,length=keys.length;i<length;i++){result[obj[keys[i]]]=keys[i]}
return result};_.functions=_.methods=function(obj){var names=[];for(var key in obj){if(_.isFunction(obj[key]))names.push(key)}
return names.sort()};_.extend=createAssigner(_.allKeys);_.extendOwn=_.assign=createAssigner(_.keys);_.findKey=function(obj,predicate,context){predicate=cb(predicate,context);var keys=_.keys(obj),key;for(var i=0,length=keys.length;i<length;i++){key=keys[i];if(predicate(obj[key],key,obj))return key}};_.pick=function(object,oiteratee,context){var result={},obj=object,iteratee,keys;if(obj==null)return result;if(_.isFunction(oiteratee)){keys=_.allKeys(obj);iteratee=optimizeCb(oiteratee,context)}else{keys=flatten(arguments,!1,!1,1);iteratee=function(value,key,obj){return key in obj};obj=Object(obj)}
for(var i=0,length=keys.length;i<length;i++){var key=keys[i];var value=obj[key];if(iteratee(value,key,obj))result[key]=value}
return result};_.omit=function(obj,iteratee,context){if(_.isFunction(iteratee)){iteratee=_.negate(iteratee)}else{var keys=_.map(flatten(arguments,!1,!1,1),String);iteratee=function(value,key){return!_.contains(keys,key)}}
return _.pick(obj,iteratee,context)};_.defaults=createAssigner(_.allKeys,!0);_.create=function(prototype,props){var result=baseCreate(prototype);if(props)_.extendOwn(result,props);return result};_.clone=function(obj){if(!_.isObject(obj))return obj;return _.isArray(obj)?obj.slice():_.extend({},obj)};_.tap=function(obj,interceptor){interceptor(obj);return obj};_.isMatch=function(object,attrs){var keys=_.keys(attrs),length=keys.length;if(object==null)return!length;var obj=Object(object);for(var i=0;i<length;i++){var key=keys[i];if(attrs[key]!==obj[key]||!(key in obj))return!1}
return!0};var eq=function(a,b,aStack,bStack){if(a===b)return a!==0||1/a===1/b;if(a==null||b==null)return a===b;if(a instanceof _)a=a._wrapped;if(b instanceof _)b=b._wrapped;var className=toString.call(a);if(className!==toString.call(b))return!1;switch(className){case '[object RegExp]':case '[object String]':return''+a===''+b;case '[object Number]':if(+a!==+a)return+b!==+b;return+a===0?1/+a===1/b:+a===+b;case '[object Date]':case '[object Boolean]':return+a===+b}
var areArrays=className==='[object Array]';if(!areArrays){if(typeof a!='object'||typeof b!='object')return!1;var aCtor=a.constructor,bCtor=b.constructor;if(aCtor!==bCtor&&!(_.isFunction(aCtor)&&aCtor instanceof aCtor&&_.isFunction(bCtor)&&bCtor instanceof bCtor)&&('constructor' in a&&'constructor' in b)){return!1}}
aStack=aStack||[];bStack=bStack||[];var length=aStack.length;while(length--){if(aStack[length]===a)return bStack[length]===b}
aStack.push(a);bStack.push(b);if(areArrays){length=a.length;if(length!==b.length)return!1;while(length--){if(!eq(a[length],b[length],aStack,bStack))return!1}}else{var keys=_.keys(a),key;length=keys.length;if(_.keys(b).length!==length)return!1;while(length--){key=keys[length];if(!(_.has(b,key)&&eq(a[key],b[key],aStack,bStack)))return!1}}
aStack.pop();bStack.pop();return!0};_.isEqual=function(a,b){return eq(a,b)};_.isEmpty=function(obj){if(obj==null)return!0;if(isArrayLike(obj)&&(_.isArray(obj)||_.isString(obj)||_.isArguments(obj)))return obj.length===0;return _.keys(obj).length===0};_.isElement=function(obj){return!!(obj&&obj.nodeType===1)};_.isArray=nativeIsArray||function(obj){return toString.call(obj)==='[object Array]'};_.isObject=function(obj){var type=typeof obj;return type==='function'||type==='object'&&!!obj};_.each(['Arguments','Function','String','Number','Date','RegExp','Error'],function(name){_['is'+name]=function(obj){return toString.call(obj)==='[object '+name+']'}});if(!_.isArguments(arguments)){_.isArguments=function(obj){return _.has(obj,'callee')}}
if(typeof/./!='function'&&typeof Int8Array!='object'){_.isFunction=function(obj){return typeof obj=='function'||!1}}
_.isFinite=function(obj){return isFinite(obj)&&!isNaN(parseFloat(obj))};_.isNaN=function(obj){return _.isNumber(obj)&&obj!==+obj};_.isBoolean=function(obj){return obj===!0||obj===!1||toString.call(obj)==='[object Boolean]'};_.isNull=function(obj){return obj===null};_.isUndefined=function(obj){return obj===void 0};_.has=function(obj,key){return obj!=null&&hasOwnProperty.call(obj,key)};_.noConflict=function(){root._=previousUnderscore;return this};_.identity=function(value){return value};_.constant=function(value){return function(){return value}};_.noop=function(){};_.property=property;_.propertyOf=function(obj){return obj==null?function(){}:function(key){return obj[key]}};_.matcher=_.matches=function(attrs){attrs=_.extendOwn({},attrs);return function(obj){return _.isMatch(obj,attrs)}};_.times=function(n,iteratee,context){var accum=Array(Math.max(0,n));iteratee=optimizeCb(iteratee,context,1);for(var i=0;i<n;i++)accum[i]=iteratee(i);return accum};_.random=function(min,max){if(max==null){max=min;min=0}
return min+Math.floor(Math.random()*(max-min+1))};_.now=Date.now||function(){return new Date().getTime()};var escapeMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','`':'&#x60;'};var unescapeMap=_.invert(escapeMap);var createEscaper=function(map){var escaper=function(match){return map[match]};var source='(?:'+_.keys(map).join('|')+')';var testRegexp=RegExp(source);var replaceRegexp=RegExp(source,'g');return function(string){string=string==null?'':''+string;return testRegexp.test(string)?string.replace(replaceRegexp,escaper):string}};_.escape=createEscaper(escapeMap);_.unescape=createEscaper(unescapeMap);_.result=function(object,property,fallback){var value=object==null?void 0:object[property];if(value===void 0){value=fallback}
return _.isFunction(value)?value.call(object):value};var idCounter=0;_.uniqueId=function(prefix){var id=++idCounter+'';return prefix?prefix+id:id};_.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var noMatch=/(.)^/;var escapes={"'":"'",'\\':'\\','\r':'r','\n':'n','\u2028':'u2028','\u2029':'u2029'};var escaper=/\\|'|\r|\n|\u2028|\u2029/g;var escapeChar=function(match){return'\\'+escapes[match]};_.template=function(text,settings,oldSettings){if(!settings&&oldSettings)settings=oldSettings;settings=_.defaults({},settings,_.templateSettings);var matcher=RegExp([(settings.escape||noMatch).source,(settings.interpolate||noMatch).source,(settings.evaluate||noMatch).source].join('|')+'|$','g');var index=0;var source="__p+='";text.replace(matcher,function(match,escape,interpolate,evaluate,offset){source+=text.slice(index,offset).replace(escaper,escapeChar);index=offset+match.length;if(escape){source+="'+\n((__t=("+escape+"))==null?'':_.escape(__t))+\n'"}else if(interpolate){source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'"}else if(evaluate){source+="';\n"+evaluate+"\n__p+='"}
return match});source+="';\n";if(!settings.variable)source='with(obj||{}){\n'+source+'}\n';source="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+source+'return __p;\n';try{var render=new Function(settings.variable||'obj','_',source)}catch(e){e.source=source;throw e}
var template=function(data){return render.call(this,data,_)};var argument=settings.variable||'obj';template.source='function('+argument+'){\n'+source+'}';return template};_.chain=function(obj){var instance=_(obj);instance._chain=!0;return instance};var result=function(instance,obj){return instance._chain?_(obj).chain():obj};_.mixin=function(obj){_.each(_.functions(obj),function(name){var func=_[name]=obj[name];_.prototype[name]=function(){var args=[this._wrapped];push.apply(args,arguments);return result(this,func.apply(_,args))}})};_.mixin(_);_.each(['pop','push','reverse','shift','sort','splice','unshift'],function(name){var method=ArrayProto[name];_.prototype[name]=function(){var obj=this._wrapped;method.apply(obj,arguments);if((name==='shift'||name==='splice')&&obj.length===0)delete obj[0];return result(this,obj)}});_.each(['concat','join','slice'],function(name){var method=ArrayProto[name];_.prototype[name]=function(){return result(this,method.apply(this._wrapped,arguments))}});_.prototype.value=function(){return this._wrapped};_.prototype.valueOf=_.prototype.toJSON=_.prototype.value;_.prototype.toString=function(){return''+this._wrapped};if(typeof define==='function'&&define.amd){define('underscore',[],function(){return _})}}.call(this));(function($,_){var isNotEmptyString=function(str){if(_.isString(str)){return str.trim().length}
return 0};var init=function($mapWrapper){var maxZoom=32,zoom=parseInt($mapWrapper.data('map-zoom'))>0?parseInt($mapWrapper.data('map-zoom')):16;$mapCanvas=$mapWrapper.find('.fw-map-canvas'),mapCanvasOY=isNaN(parseInt($mapWrapper.data('map-height')))?parseInt($mapCanvas.width()*0.66):parseInt($mapWrapper.data('map-height')),locations=$mapWrapper.data('locations'),mapType=$mapWrapper.data('map-type'),disableScroll=($mapWrapper.data('disable-scrolling')?!0:!1),mapOptions={zoom:zoom,center:('undefined'!==locations&&locations.length)?calculateCenter(locations):new google.maps.LatLng(-34,150),mapTypeId:google.maps.MapTypeId[mapType],scrollwheel:disableScroll},markerBounds=new google.maps.LatLngBounds(),map=new google.maps.Map($mapCanvas.get(0),mapOptions);if('undefined'!==locations&&locations.length){locations.forEach(function(location){gMapsCoords=new google.maps.LatLng(location.coordinates.lat,location.coordinates.lng);var marker=new google.maps.Marker({position:gMapsCoords,map:map});markerBounds.extend(gMapsCoords);if(isNotEmptyString(location.description)||isNotEmptyString(location.title)||isNotEmptyString(location.url)||isNotEmptyString(location.thumb)){var template=_.template("<% function isNotEmptyString(str) { if (_.isString(str)) {	return str.trim().length;} return 0; }  %>"+"<div class='infowindow'>"+"<% if (isNotEmptyString(location.thumb)) { %>"+"<div class='infowindow-thump'>"+"<img src='<%= location.thumb %>' >"+"</div> "+"<% } %>"+"<div class='infowindow-content'>"+"<% if ( isNotEmptyString(location.url) || isNotEmptyString(location.title) ) { %>"+"<div class='infowindow-title'>"+"<a href='<%- location.url %>'><%- isNotEmptyString(location.title) ?  location.title : location.url  %></a>"+"</div>"+"<% } %>"+"<% if ( isNotEmptyString(location.description) ) { %>"+"<div class='infowindow-description'>"+"<%= location.description %>"+"</div>"+"<% } %>"+"</div>"+"</div>");var infowindow=new google.maps.InfoWindow({content:template({location:location})});google.maps.event.addListener(marker,'click',function(){infowindow.open(map,marker)})}})}
if(locations.length>1){map.fitBounds(markerBounds)}
var listener=google.maps.event.addListenerOnce(map,'zoom_changed',function(){if(map.getZoom()>maxZoom)map.setZoom(maxZoom);google.maps.event.removeListener(listener)});$mapCanvas.height(mapCanvasOY);$mapCanvas.data('map',map)};var calculateCenter=function(locations){var Lng,Hyp,Lat,total=locations.length,X=0,Y=0,Z=0;locations.forEach(function(location){var lat=location.coordinates.lat*Math.PI/180,lng=location.coordinates.lng*Math.PI/180,x=Math.cos(lat)*Math.cos(lng),y=Math.cos(lat)*Math.sin(lng),z=Math.sin(lat);X+=x;Y+=y;Z+=z});X/=total;Y/=total;Z/=total;Lng=Math.atan2(Y,X);Hyp=Math.sqrt(X*X+Y*Y);Lat=Math.atan2(Z,Hyp);return{lng:(Lng*180/Math.PI),lat:(Lat*180/Math.PI)}};$(document).ready(function(){$('.fw-map').each(function(){init($(this))})})}(jQuery,_));!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(b,d){var e,f,g,h=b.nodeName.toLowerCase();return"area"===h?(e=b.parentNode,f=e.name,!(!b.href||!f||"map"!==e.nodeName.toLowerCase())&&(g=a("img[usemap='#"+f+"']")[0],!!g&&c(g))):(/^(input|select|textarea|button|object)$/.test(h)?!b.disabled:"a"===h?b.href||d:d)&&c(b)}function c(b){return a.expr.filters.visible(b)&&!a(b).parents().addBack().filter(function(){return"hidden"===a.css(this,"visibility")}).length}a.ui=a.ui||{},a.extend(a.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),a.fn.extend({scrollParent:function(b){var c=this.css("position"),d="absolute"===c,e=b?/(auto|scroll|hidden)/:/(auto|scroll)/,f=this.parents().filter(function(){var b=a(this);return(!d||"static"!==b.css("position"))&&e.test(b.css("overflow")+b.css("overflow-y")+b.css("overflow-x"))}).eq(0);return"fixed"!==c&&f.length?f:a(this[0].ownerDocument||document)},uniqueId:function(){var a=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&a(this).removeAttr("id")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(c){return b(c,!isNaN(a.attr(c,"tabindex")))},tabbable:function(c){var d=a.attr(c,"tabindex"),e=isNaN(d);return(e||d>=0)&&b(c,!e)}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(b,c){function d(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.css(b,"padding"+this))||0,d&&(c-=parseFloat(a.css(b,"border"+this+"Width"))||0),f&&(c-=parseFloat(a.css(b,"margin"+this))||0)}),c}var e="Width"===c?["Left","Right"]:["Top","Bottom"],f=c.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+c]=function(b){return void 0===b?g["inner"+c].call(this):this.each(function(){a(this).css(f,d(this,b)+"px")})},a.fn["outer"+c]=function(b,e){return"number"!=typeof b?g["outer"+c].call(this,b):this.each(function(){a(this).css(f,d(this,b,!0,e)+"px")})}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(a.fn.removeData=function(b){return function(c){return arguments.length?b.call(this,a.camelCase(c)):b.call(this)}}(a.fn.removeData)),a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),a.fn.extend({focus:function(b){return function(c,d){return"number"==typeof c?this.each(function(){var b=this;setTimeout(function(){a(b).focus(),d&&d.call(b)},c)}):b.apply(this,arguments)}}(a.fn.focus),disableSelection:function(){var a="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(a+".ui-disableSelection",function(a){a.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(b){if(void 0!==b)return this.css("zIndex",b);if(this.length)for(var c,d,e=a(this[0]);e.length&&e[0]!==document;){if(c=e.css("position"),("absolute"===c||"relative"===c||"fixed"===c)&&(d=parseInt(e.css("zIndex"),10),!isNaN(d)&&0!==d))return d;e=e.parent()}return 0}}),a.ui.plugin={add:function(b,c,d){var e,f=a.ui[b].prototype;for(e in d)f.plugins[e]=f.plugins[e]||[],f.plugins[e].push([c,d[e]])},call:function(a,b,c,d){var e,f=a.plugins[b];if(f&&(d||a.element[0].parentNode&&11!==a.element[0].parentNode.nodeType))for(e=0;e<f.length;e++)a.options[f[e][0]]&&f[e][1].apply(a.element,c)}}});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){var b=0,c=Array.prototype.slice;return a.cleanData=function(b){return function(c){var d,e,f;for(f=0;null!=(e=c[f]);f++)try{d=a._data(e,"events"),d&&d.remove&&a(e).triggerHandler("remove")}catch(g){}b(c)}}(a.cleanData),a.widget=function(b,c,d){var e,f,g,h,i={},j=b.split(".")[0];return b=b.split(".")[1],e=j+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e.toLowerCase()]=function(b){return!!a.data(b,e)},a[j]=a[j]||{},f=a[j][b],g=a[j][b]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new g(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,d){return a.isFunction(d)?void(i[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},e=function(a){return c.prototype[b].apply(this,a)};return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=e,b=d.apply(this,arguments),this._super=c,this._superApply=f,b}}()):void(i[b]=d)}),g.prototype=a.widget.extend(h,{widgetEventPrefix:f?h.widgetEventPrefix||b:b},i,{constructor:g,namespace:j,widgetName:b,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g),g},a.widget.extend=function(b){for(var d,e,f=c.call(arguments,1),g=0,h=f.length;g<h;g++)for(d in f[g])e=f[g][d],f[g].hasOwnProperty(d)&&void 0!==e&&(a.isPlainObject(e)?b[d]=a.isPlainObject(b[d])?a.widget.extend({},b[d],e):a.widget.extend({},e):b[d]=e);return b},a.widget.bridge=function(b,d){var e=d.prototype.widgetFullName||b;a.fn[b]=function(f){var g="string"==typeof f,h=c.call(arguments,1),i=this;return g?this.each(function(){var c,d=a.data(this,e);return"instance"===f?(i=d,!1):d?a.isFunction(d[f])&&"_"!==f.charAt(0)?(c=d[f].apply(d,h),c!==d&&void 0!==c?(i=c&&c.jquery?i.pushStack(c.get()):c,!1):void 0):a.error("no such method '"+f+"' for "+b+" widget instance"):a.error("cannot call methods on "+b+" prior to initialization; attempted to call method '"+f+"'")}):(h.length&&(f=a.widget.extend.apply(null,[f].concat(h))),this.each(function(){var b=a.data(this,e);b?(b.option(f||{}),b._init&&b._init()):a.data(this,e,new d(f,this))})),i}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(c,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=b++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this.options=a.widget.extend({},this.options,this._getCreateOptions(),c),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(b,c){var d,e,f,g=b;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof b)if(g={},d=b.split("."),b=d.shift(),d.length){for(e=g[b]=a.widget.extend({},this.options[b]),f=0;f<d.length-1;f++)e[d[f]]=e[d[f]]||{},e=e[d[f]];if(b=d.pop(),1===arguments.length)return void 0===e[b]?null:e[b];e[b]=c}else{if(1===arguments.length)return void 0===this.options[b]?null:this.options[b];g[b]=c}return this._setOptions(g),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,"disabled"===a&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!b),b&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){if(b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled"))return("string"==typeof g?f[g]:g).apply(f,arguments)}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^([\w:-]*)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.delegate(k,j,h):c.bind(j,h)})},_off:function(b,c){c=(c||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,b.unbind(c).undelegate(c),this.bindings=a(this.bindings.not(b).get()),this.focusable=a(this.focusable.not(b).get()),this.hoverable=a(this.hoverable.not(b).get())},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}}),a.widget});!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],a):a(jQuery)}(function(a){return a.widget("ui.tabs",{version:"1.11.4",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var a=/#.*$/;return function(b){var c,d;b=b.cloneNode(!1),c=b.href.replace(a,""),d=location.href.replace(a,"");try{c=decodeURIComponent(c)}catch(e){}try{d=decodeURIComponent(d)}catch(e){}return b.hash.length>1&&c===d}}(),_create:function(){var b=this,c=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",c.collapsible),this._processTabs(),c.active=this._initialActive(),a.isArray(c.disabled)&&(c.disabled=a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"),function(a){return b.tabs.index(a)}))).sort()),this.options.active!==!1&&this.anchors.length?this.active=this._findActive(c.active):this.active=a(),this._refresh(),this.active.length&&this.load(c.active)},_initialActive:function(){var b=this.options.active,c=this.options.collapsible,d=location.hash.substring(1);return null===b&&(d&&this.tabs.each(function(c,e){if(a(e).attr("aria-controls")===d)return b=c,!1}),null===b&&(b=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),null!==b&&b!==-1||(b=!!this.tabs.length&&0)),b!==!1&&(b=this.tabs.index(this.tabs.eq(b)),b===-1&&(b=!c&&0)),!c&&b===!1&&this.anchors.length&&(b=0),b},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):a()}},_tabKeydown:function(b){var c=a(this.document[0].activeElement).closest("li"),d=this.tabs.index(c),e=!0;if(!this._handlePageNav(b)){switch(b.keyCode){case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:d++;break;case a.ui.keyCode.UP:case a.ui.keyCode.LEFT:e=!1,d--;break;case a.ui.keyCode.END:d=this.anchors.length-1;break;case a.ui.keyCode.HOME:d=0;break;case a.ui.keyCode.SPACE:return b.preventDefault(),clearTimeout(this.activating),void this._activate(d);case a.ui.keyCode.ENTER:return b.preventDefault(),clearTimeout(this.activating),void this._activate(d!==this.options.active&&d);default:return}b.preventDefault(),clearTimeout(this.activating),d=this._focusNextTab(d,e),b.ctrlKey||b.metaKey||(c.attr("aria-selected","false"),this.tabs.eq(d).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",d)},this.delay))}},_panelKeydown:function(b){this._handlePageNav(b)||b.ctrlKey&&b.keyCode===a.ui.keyCode.UP&&(b.preventDefault(),this.active.focus())},_handlePageNav:function(b){return b.altKey&&b.keyCode===a.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):b.altKey&&b.keyCode===a.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(b,c){function d(){return b>e&&(b=0),b<0&&(b=e),b}for(var e=this.tabs.length-1;a.inArray(d(),this.options.disabled)!==-1;)b=c?b+1:b-1;return b},_focusNextTab:function(a,b){return a=this._findNextTab(a,b),this.tabs.eq(a).focus(),a},_setOption:function(a,b){return"active"===a?void this._activate(b):"disabled"===a?void this._setupDisabled(b):(this._super(a,b),"collapsible"===a&&(this.element.toggleClass("ui-tabs-collapsible",b),b||this.options.active!==!1||this._activate(0)),"event"===a&&this._setupEvents(b),void("heightStyle"===a&&this._setupHeightStyle(b)))},_sanitizeSelector:function(a){return a?a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var b=this.options,c=this.tablist.children(":has(a[href])");b.disabled=a.map(c.filter(".ui-state-disabled"),function(a){return c.index(a)}),this._processTabs(),b.active!==!1&&this.anchors.length?this.active.length&&!a.contains(this.tablist[0],this.active[0])?this.tabs.length===b.disabled.length?(b.active=!1,this.active=a()):this._activate(this._findNextTab(Math.max(0,b.active-1),!1)):b.active=this.tabs.index(this.active):(b.active=!1,this.active=a()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var b=this,c=this.tabs,d=this.anchors,e=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(b){a(this).is(".ui-state-disabled")&&b.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){a(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return a("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=a(),this.anchors.each(function(c,d){var e,f,g,h=a(d).uniqueId().attr("id"),i=a(d).closest("li"),j=i.attr("aria-controls");b._isLocal(d)?(e=d.hash,g=e.substring(1),f=b.element.find(b._sanitizeSelector(e))):(g=i.attr("aria-controls")||a({}).uniqueId()[0].id,e="#"+g,f=b.element.find(e),f.length||(f=b._createPanel(g),f.insertAfter(b.panels[c-1]||b.tablist)),f.attr("aria-live","polite")),f.length&&(b.panels=b.panels.add(f)),j&&i.data("ui-tabs-aria-controls",j),i.attr({"aria-controls":g,"aria-labelledby":h}),f.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),c&&(this._off(c.not(this.tabs)),this._off(d.not(this.anchors)),this._off(e.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(b){return a("<div>").attr("id",b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(b){a.isArray(b)&&(b.length?b.length===this.anchors.length&&(b=!0):b=!1);for(var c,d=0;c=this.tabs[d];d++)b===!0||a.inArray(d,b)!==-1?a(c).addClass("ui-state-disabled").attr("aria-disabled","true"):a(c).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=b},_setupEvents:function(b){var c={};b&&a.each(b.split(" "),function(a,b){c[b]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(a){a.preventDefault()}}),this._on(this.anchors,c),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(b){var c,d=this.element.parent();"fill"===b?(c=d.height(),c-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var b=a(this),d=b.css("position");"absolute"!==d&&"fixed"!==d&&(c-=b.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){c-=a(this).outerHeight(!0)}),this.panels.each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")):"auto"===b&&(c=0,this.panels.each(function(){c=Math.max(c,a(this).height("").height())}).height(c))},_eventHandler:function(b){var c=this.options,d=this.active,e=a(b.currentTarget),f=e.closest("li"),g=f[0]===d[0],h=g&&c.collapsible,i=h?a():this._getPanelForTab(f),j=d.length?this._getPanelForTab(d):a(),k={oldTab:d,oldPanel:j,newTab:h?a():f,newPanel:i};b.preventDefault(),f.hasClass("ui-state-disabled")||f.hasClass("ui-tabs-loading")||this.running||g&&!c.collapsible||this._trigger("beforeActivate",b,k)===!1||(c.active=!h&&this.tabs.index(f),this.active=g?a():f,this.xhr&&this.xhr.abort(),j.length||i.length||a.error("jQuery UI Tabs: Mismatching fragment identifier."),i.length&&this.load(this.tabs.index(f),b),this._toggle(b,k))},_toggle:function(b,c){function d(){f.running=!1,f._trigger("activate",b,c)}function e(){c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),g.length&&f.options.show?f._show(g,f.options.show,d):(g.show(),d())}var f=this,g=c.newPanel,h=c.oldPanel;this.running=!0,h.length&&this.options.hide?this._hide(h,this.options.hide,function(){c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),e()}):(c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),h.hide(),e()),h.attr("aria-hidden","true"),c.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),g.length&&h.length?c.oldTab.attr("tabIndex",-1):g.length&&this.tabs.filter(function(){return 0===a(this).attr("tabIndex")}).attr("tabIndex",-1),g.attr("aria-hidden","false"),c.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(b){var c,d=this._findActive(b);d[0]!==this.active[0]&&(d.length||(d=this.active),c=d.find(".ui-tabs-anchor")[0],this._eventHandler({target:c,currentTarget:c,preventDefault:a.noop}))},_findActive:function(b){return b===!1?a():this.tabs.eq(b)},_getIndex:function(a){return"string"==typeof a&&(a=this.anchors.index(this.anchors.filter("[href$='"+a+"']"))),a},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){a.data(this,"ui-tabs-destroy")?a(this).remove():a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var b=a(this),c=b.data("ui-tabs-aria-controls");c?b.attr("aria-controls",c).removeData("ui-tabs-aria-controls"):b.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(b){var c=this.options.disabled;c!==!1&&(void 0===b?c=!1:(b=this._getIndex(b),c=a.isArray(c)?a.map(c,function(a){return a!==b?a:null}):a.map(this.tabs,function(a,c){return c!==b?c:null})),this._setupDisabled(c))},disable:function(b){var c=this.options.disabled;if(c!==!0){if(void 0===b)c=!0;else{if(b=this._getIndex(b),a.inArray(b,c)!==-1)return;c=a.isArray(c)?a.merge([b],c).sort():[b]}this._setupDisabled(c)}},load:function(b,c){b=this._getIndex(b);var d=this,e=this.tabs.eq(b),f=e.find(".ui-tabs-anchor"),g=this._getPanelForTab(e),h={tab:e,panel:g},i=function(a,b){"abort"===b&&d.panels.stop(!1,!0),e.removeClass("ui-tabs-loading"),g.removeAttr("aria-busy"),a===d.xhr&&delete d.xhr};this._isLocal(f[0])||(this.xhr=a.ajax(this._ajaxSettings(f,c,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(e.addClass("ui-tabs-loading"),g.attr("aria-busy","true"),this.xhr.done(function(a,b,e){setTimeout(function(){g.html(a),d._trigger("load",c,h),i(e,b)},1)}).fail(function(a,b){setTimeout(function(){i(a,b)},1)})))},_ajaxSettings:function(b,c,d){var e=this;return{url:b.attr("href"),beforeSend:function(b,f){return e._trigger("beforeLoad",c,a.extend({jqXHR:b,ajaxSettings:f},d))}}},_getPanelForTab:function(b){var c=a(b).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+c))}})});(function($){"use strict";$(document).ready(function($){$(".fw-tabs-container").tabs()})})(jQuery);if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery')}+function($){'use strict';var version=$.fn.jquery.split(' ')[0].split('.')
if((version[0]<2&&version[1]<9)||(version[0]==1&&version[1]==9&&version[2]<1)||(version[0]>2)){throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')}}(jQuery);+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return!1}
$.fn.emulateTransitionEnd=function(duration){var called=!1
var $el=this
$(this).one('bsTransitionEnd',function(){called=!0})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.3.6'
Alert.TRANSITION_DURATION=150
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.closest('.alert')}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=!1}
Button.VERSION='3.3.6'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state+='Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state])
if(state=='loadingText'){this.isLoading=!0
$el.addClass(d).attr(d,d)}else if(this.isLoading){this.isLoading=!1
$el.removeClass(d).removeAttr(d)}},this),0)}
Button.prototype.toggle=function(){var changed=!0
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked'))changed=!1
$parent.find('.active').removeClass('active')
this.$element.addClass('active')}else if($input.prop('type')=='checkbox'){if(($input.prop('checked'))!==this.$element.hasClass('active'))changed=!1
this.$element.toggleClass('active')}
$input.prop('checked',this.$element.hasClass('active'))
if(changed)$input.trigger('change')}else{this.$element.attr('aria-pressed',!this.$element.hasClass('active'))
this.$element.toggleClass('active')}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
Plugin.call($btn,'toggle')
if(!($(e.target).is('input[type="radio"]')||$(e.target).is('input[type="checkbox"]')))e.preventDefault()}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]',function(e){$(e.target).closest('.btn').toggleClass('focus',/^focus(in)?$/.test(e.type))})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=null
this.sliding=null
this.interval=null
this.$active=null
this.$items=null
this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.options.pause=='hover'&&!('ontouchstart' in document.documentElement)&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.3.6'
Carousel.TRANSITION_DURATION=600
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:!0,keyboard:!0}
Carousel.prototype.keydown=function(e){if(/input|textarea/i.test(e.target.tagName))return
switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=!1)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active)
var willWrap=(direction=='prev'&&activeIndex===0)||(direction=='next'&&activeIndex==(this.$items.length-1))
if(willWrap&&!this.options.wrap)return active
var delta=direction=='prev'?-1:1
var itemIndex=(activeIndex+delta)%this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',this.$items.eq(pos))}
Carousel.prototype.pause=function(e){e||(this.paused=!0)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(!0)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||this.getItemForDirection(type,$active)
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var that=this
if($next.hasClass('active'))return(this.sliding=!1)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=!0
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=!1
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=!1
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
var clickHandler=function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=!1
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document).on('click.bs.carousel.data-api','[data-slide]',clickHandler).on('click.bs.carousel.data-api','[data-slide-to]',clickHandler)
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.3.6'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:!0}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData
var actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',!0)
this.$trigger.removeClass('collapsed').attr('aria-expanded',!0)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',!1)
this.$trigger.addClass('collapsed').attr('aria-expanded',!1)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(target)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&/show|hide/.test(option))options.toggle=!1
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.3.6'
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this)
var $parent=getParent($this)
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
if(e&&e.type=='click'&&/input|textarea/i.test(e.target.tagName)&&$.contains($parent[0],e.target))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown',relatedTarget))})}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart' in document.documentElement&&!$parent.closest('.navbar-nav').length){$(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger($.Event('shown.bs.dropdown',relatedTarget))}
return!1}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive&&e.which!=27||isActive&&e.which==27){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.disabled):visible a'
var $items=$parent.find('.dropdown-menu'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','.dropdown-menu',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=!1
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.3.6'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:!0,keyboard:!0,show:!0}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=!0
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.$dialog.on('mousedown.dismiss.bs.modal',function(){that.$element.one('mouseup.dismiss.bs.modal',function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=!0})})
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
that.adjustDialog()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in')
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$dialog.one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=!1
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize=function(){if(this.isShown){$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this))}else{$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$(document.createElement('div')).addClass('modal-backdrop '+animate).appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=!1
return}
if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus():this.hide()},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.handleUpdate=function(){this.adjustDialog()}
Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:'',paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:''})}
Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:'',paddingRight:''})}
Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}
this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
this.originalBodyPad=document.body.style.paddingRight||''
if(this.bodyIsOverflowing)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right',this.originalBodyPad)}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var Tooltip=function(element,options){this.type=null
this.options=null
this.enabled=null
this.timeout=null
this.hoverState=null
this.$element=null
this.inState=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.3.6'
Tooltip.TRANSITION_DURATION=150
Tooltip.DEFAULTS={animation:!0,placement:'top',selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:!1,container:!1,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=!0
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):(this.options.viewport.selector||this.options.viewport))
this.inState={click:!1,hover:!1,focus:!1}
if(this.$element[0]instanceof document.constructor&&!this.options.selector){throw new Error('`selector` option must be specified when initializing '+this.type+' on the window.document object!')}
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusin'?'focus':'hover']=!0}
if(self.tip().hasClass('in')||self.hoverState=='in'){self.hoverState='in'
return}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.isInStateTrue=function(){for(var key in this.inState){if(this.inState[key])return!0}
return!1}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusout'?'focus':'hover']=!1}
if(self.isInStateTrue())return
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
this.$element.trigger('inserted.bs.'+this.type)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var viewportDim=this.getPosition(this.$viewport)
placement=placement=='bottom'&&pos.bottom+actualHeight>viewportDim.bottom?'top':placement=='top'&&pos.top-actualHeight<viewportDim.top?'bottom':placement=='right'&&pos.right+actualWidth>viewportDim.width?'left':placement=='left'&&pos.left-actualWidth<viewportDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){var prevHoverState=that.hoverState
that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null
if(prevHoverState=='out')that.leave(that)}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top+=marginTop
offset.left+=marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var isVertical=/top|bottom/.test(placement)
var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowOffsetPosition=isVertical?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)}
Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?'left':'top',50*(1-delta/dimension)+'%').css(isVertical?'top':'left','')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(callback){var that=this
var $tip=$(this.$tip)
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.removeAttr('aria-describedby').trigger('hidden.bs.'+that.type)
callback&&callback()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof $e.attr('data-original-title')!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
var elRect=el.getBoundingClientRect()
if(elRect.width==null){elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top})}
var elOffset=isBody?{top:0,left:0}:$element.offset()
var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()}
var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null
return $.extend({},elRect,scroll,outerDims,elOffset)}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.right){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){if(!this.$tip){this.$tip=$(this.options.template)
if(this.$tip.length!=1){throw new Error(this.type+' `template` option must consist of exactly 1 top-level element!')}}
return this.$tip}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable=function(){this.enabled=!0}
Tooltip.prototype.disable=function(){this.enabled=!1}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
if(e){self.inState.click=!self.inState.click
if(self.isInStateTrue())self.enter(self)
else self.leave(self)}else{self.tip().hasClass('in')?self.leave(self):self.enter(self)}}
Tooltip.prototype.destroy=function(){var that=this
clearTimeout(this.timeout)
this.hide(function(){that.$element.off('.'+that.type).removeData('bs.'+that.type)
if(that.$tip){that.$tip.detach()}
that.$tip=null
that.$arrow=null
that.$viewport=null})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.3.6'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').children().detach().end()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);+function($){'use strict';function ScrollSpy(element,options){this.$body=$(document.body)
this.$scrollElement=$(element).is(document.body)?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',$.proxy(this.process,this))
this.refresh()
this.process()}
ScrollSpy.VERSION='3.3.6'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var that=this
var offsetMethod='offset'
var offsetBase=0
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0])
that.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null
return this.clear()}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(offsets[i+1]===undefined||scrollTop<offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
this.clear()
var selector=this.selector+'[data-target="'+target+'"],'+this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.3.6'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&($active.length&&$active.hasClass('fade')||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',!1)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',!0)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu').length){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',!0)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$target=$(this.options.target).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=null
this.unpin=null
this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.3.6'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getState=function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var targetHeight=this.$target.height()
if(offsetTop!=null&&this.affixed=='top')return scrollTop<offsetTop?'top':!1
if(this.affixed=='bottom'){if(offsetTop!=null)return(scrollTop+this.unpin<=position.top)?!1:'bottom'
return(scrollTop+targetHeight<=scrollHeight-offsetBottom)?!1:'bottom'}
var initializing=this.affixed==null
var colliderTop=initializing?scrollTop:position.top
var colliderHeight=initializing?targetHeight:height
if(offsetTop!=null&&scrollTop<=offsetTop)return'top'
if(offsetBottom!=null&&(colliderTop+colliderHeight>=scrollHeight-offsetBottom))return'bottom'
return!1}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var height=this.$element.height()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
var scrollHeight=Math.max($(document).height(),$(document.body).height())
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom)
if(this.affixed!=affix){if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix','affixed')+'.bs.affix')}
if(affix=='bottom'){this.$element.offset({top:scrollHeight-height-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom!=null)data.offset.bottom=data.offsetBottom
if(data.offsetTop!=null)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);(function(root){var jstz=(function(){'use strict';var HEMISPHERE_SOUTH='s',get_date_offset=function(date){var offset=-date.getTimezoneOffset();return(offset!==null?offset:0)},get_date=function(year,month,date){var d=new Date();if(year!==undefined){d.setFullYear(year)}
d.setMonth(month);d.setDate(date);return d},get_january_offset=function(year){return get_date_offset(get_date(year,0,2))},get_june_offset=function(year){return get_date_offset(get_date(year,5,2))},date_is_dst=function(date){var is_southern=date.getMonth()>7,base_offset=is_southern?get_june_offset(date.getFullYear()):get_january_offset(date.getFullYear()),date_offset=get_date_offset(date),is_west=base_offset<0,dst_offset=base_offset-date_offset;if(!is_west&&!is_southern){return dst_offset<0}
return dst_offset!==0},lookup_key=function(){var january_offset=get_january_offset(),june_offset=get_june_offset(),diff=january_offset-june_offset;if(diff<0){return january_offset+",1"}else if(diff>0){return june_offset+",1,"+HEMISPHERE_SOUTH}
return january_offset+",0"},determine=function(){var key=lookup_key();return new jstz.TimeZone(jstz.olson.timezones[key])},dst_start_for=function(tz_name){var ru_pre_dst_change=new Date(2010,6,15,1,0,0,0),dst_starts={'America/Denver':new Date(2011,2,13,3,0,0,0),'America/Mazatlan':new Date(2011,3,3,3,0,0,0),'America/Chicago':new Date(2011,2,13,3,0,0,0),'America/Mexico_City':new Date(2011,3,3,3,0,0,0),'America/Asuncion':new Date(2012,9,7,3,0,0,0),'America/Santiago':new Date(2012,9,3,3,0,0,0),'America/Campo_Grande':new Date(2012,9,21,5,0,0,0),'America/Montevideo':new Date(2011,9,2,3,0,0,0),'America/Sao_Paulo':new Date(2011,9,16,5,0,0,0),'America/Los_Angeles':new Date(2011,2,13,8,0,0,0),'America/Santa_Isabel':new Date(2011,3,5,8,0,0,0),'America/Havana':new Date(2012,2,10,2,0,0,0),'America/New_York':new Date(2012,2,10,7,0,0,0),'Europe/Helsinki':new Date(2013,2,31,5,0,0,0),'Pacific/Auckland':new Date(2011,8,26,7,0,0,0),'America/Halifax':new Date(2011,2,13,6,0,0,0),'America/Goose_Bay':new Date(2011,2,13,2,1,0,0),'America/Miquelon':new Date(2011,2,13,5,0,0,0),'America/Godthab':new Date(2011,2,27,1,0,0,0),'Europe/Moscow':ru_pre_dst_change,'Asia/Amman':new Date(2013,2,29,1,0,0,0),'Asia/Beirut':new Date(2013,2,31,2,0,0,0),'Asia/Damascus':new Date(2013,3,6,2,0,0,0),'Asia/Jerusalem':new Date(2013,2,29,5,0,0,0),'Asia/Yekaterinburg':ru_pre_dst_change,'Asia/Omsk':ru_pre_dst_change,'Asia/Krasnoyarsk':ru_pre_dst_change,'Asia/Irkutsk':ru_pre_dst_change,'Asia/Yakutsk':ru_pre_dst_change,'Asia/Vladivostok':ru_pre_dst_change,'Asia/Baku':new Date(2013,2,31,4,0,0),'Asia/Yerevan':new Date(2013,2,31,3,0,0),'Asia/Kamchatka':ru_pre_dst_change,'Asia/Gaza':new Date(2010,2,27,4,0,0),'Africa/Cairo':new Date(2010,4,1,3,0,0),'Europe/Minsk':ru_pre_dst_change,'Pacific/Apia':new Date(2010,10,1,1,0,0,0),'Pacific/Fiji':new Date(2010,11,1,0,0,0),'Australia/Perth':new Date(2008,10,1,1,0,0,0)};return dst_starts[tz_name]};return{determine:determine,date_is_dst:date_is_dst,dst_start_for:dst_start_for}}());jstz.TimeZone=function(tz_name){'use strict';var AMBIGUITIES={'America/Denver':['America/Denver','America/Mazatlan'],'America/Chicago':['America/Chicago','America/Mexico_City'],'America/Santiago':['America/Santiago','America/Asuncion','America/Campo_Grande'],'America/Montevideo':['America/Montevideo','America/Sao_Paulo'],'Asia/Beirut':['Asia/Amman','Asia/Jerusalem','Asia/Beirut','Europe/Helsinki','Asia/Damascus'],'Pacific/Auckland':['Pacific/Auckland','Pacific/Fiji'],'America/Los_Angeles':['America/Los_Angeles','America/Santa_Isabel'],'America/New_York':['America/Havana','America/New_York'],'America/Halifax':['America/Goose_Bay','America/Halifax'],'America/Godthab':['America/Miquelon','America/Godthab'],'Asia/Dubai':['Europe/Moscow'],'Asia/Dhaka':['Asia/Yekaterinburg'],'Asia/Jakarta':['Asia/Omsk'],'Asia/Shanghai':['Asia/Krasnoyarsk','Australia/Perth'],'Asia/Tokyo':['Asia/Irkutsk'],'Australia/Brisbane':['Asia/Yakutsk'],'Pacific/Noumea':['Asia/Vladivostok'],'Pacific/Tarawa':['Asia/Kamchatka','Pacific/Fiji'],'Pacific/Tongatapu':['Pacific/Apia'],'Asia/Baghdad':['Europe/Minsk'],'Asia/Baku':['Asia/Yerevan','Asia/Baku'],'Africa/Johannesburg':['Asia/Gaza','Africa/Cairo']},timezone_name=tz_name,ambiguity_check=function(){var ambiguity_list=AMBIGUITIES[timezone_name],length=ambiguity_list.length,i=0,tz=ambiguity_list[0];for(;i<length;i+=1){tz=ambiguity_list[i];if(jstz.date_is_dst(jstz.dst_start_for(tz))){timezone_name=tz;return}}},is_ambiguous=function(){return typeof(AMBIGUITIES[timezone_name])!=='undefined'};if(is_ambiguous()){ambiguity_check()}
return{name:function(){return timezone_name}}};jstz.olson={};jstz.olson.timezones={'-720,0':'Pacific/Majuro','-660,0':'Pacific/Pago_Pago','-600,1':'America/Adak','-600,0':'Pacific/Honolulu','-570,0':'Pacific/Marquesas','-540,0':'Pacific/Gambier','-540,1':'America/Anchorage','-480,1':'America/Los_Angeles','-480,0':'Pacific/Pitcairn','-420,0':'America/Phoenix','-420,1':'America/Denver','-360,0':'America/Guatemala','-360,1':'America/Chicago','-360,1,s':'Pacific/Easter','-300,0':'America/Bogota','-300,1':'America/New_York','-270,0':'America/Caracas','-240,1':'America/Halifax','-240,0':'America/Santo_Domingo','-240,1,s':'America/Santiago','-210,1':'America/St_Johns','-180,1':'America/Godthab','-180,0':'America/Argentina/Buenos_Aires','-180,1,s':'America/Montevideo','-120,0':'America/Noronha','-120,1':'America/Noronha','-60,1':'Atlantic/Azores','-60,0':'Atlantic/Cape_Verde','0,0':'UTC','0,1':'Europe/London','60,1':'Europe/Berlin','60,0':'Africa/Lagos','60,1,s':'Africa/Windhoek','120,1':'Asia/Beirut','120,0':'Africa/Johannesburg','180,0':'Asia/Baghdad','180,1':'Europe/Moscow','210,1':'Asia/Tehran','240,0':'Asia/Dubai','240,1':'Asia/Baku','270,0':'Asia/Kabul','300,1':'Asia/Yekaterinburg','300,0':'Asia/Karachi','330,0':'Asia/Kolkata','345,0':'Asia/Kathmandu','360,0':'Asia/Dhaka','360,1':'Asia/Omsk','390,0':'Asia/Rangoon','420,1':'Asia/Krasnoyarsk','420,0':'Asia/Jakarta','480,0':'Asia/Shanghai','480,1':'Asia/Irkutsk','525,0':'Australia/Eucla','525,1,s':'Australia/Eucla','540,1':'Asia/Yakutsk','540,0':'Asia/Tokyo','570,0':'Australia/Darwin','570,1,s':'Australia/Adelaide','600,0':'Australia/Brisbane','600,1':'Asia/Vladivostok','600,1,s':'Australia/Sydney','630,1,s':'Australia/Lord_Howe','660,1':'Asia/Kamchatka','660,0':'Pacific/Noumea','690,0':'Pacific/Norfolk','720,1,s':'Pacific/Auckland','720,0':'Pacific/Tarawa','765,1,s':'Pacific/Chatham','780,0':'Pacific/Tongatapu','780,1,s':'Pacific/Apia','840,0':'Pacific/Kiritimati'};if(typeof exports!=='undefined'){exports.jstz=jstz}else{root.jstz=jstz}})(this);"use strict";Date.prototype.getWeek=function(iso8601){if(iso8601){var target=new Date(this.valueOf());var dayNr=(this.getDay()+6)%7;target.setDate(target.getDate()-dayNr+3);var firstThursday=target.valueOf();target.setMonth(0,1);if(target.getDay()!=4){target.setMonth(0,1+((4-target.getDay())+7)%7)}
return 1+Math.ceil((firstThursday-target)/604800000)}else{var onejan=new Date(this.getFullYear(),0,1);return Math.ceil((((this.getTime()-onejan.getTime())/86400000)+onejan.getDay()+1)/7)}};Date.prototype.getMonthFormatted=function(){var month=this.getMonth()+1;return month<10?'0'+month:month};Date.prototype.getDateFormatted=function(){var date=this.getDate();return date<10?'0'+date:date};if(!String.prototype.format){String.prototype.format=function(){var args=arguments;return this.replace(/{(\d+)}/g,function(match,number){return typeof args[number]!='undefined'?args[number]:match})}}
if(!String.prototype.formatNum){String.prototype.formatNum=function(decimal){var r=""+this;while(r.length<decimal)
r="0"+r;return r}}(function($){var defaults={tooltip_container:'body',width:'100%',view:'month',day:'now',time_start:'06:00',time_end:'22:00',time_split:'30',events_source:'',events_cache:!1,format12:!1,am_suffix:"AM",pm_suffix:"PM",tmpl_path:'tmpls/',tmpl_cache:!0,classes:{months:{inmonth:'cal-day-inmonth',outmonth:'cal-day-outmonth',saturday:'cal-day-weekend',sunday:'cal-day-weekend',holidays:'cal-day-holiday',today:'cal-day-today'},week:{workday:'cal-day-workday',saturday:'cal-day-weekend',sunday:'cal-day-weekend',holidays:'cal-day-holiday',today:'cal-day-today'}},modal:null,modal_type:"iframe",modal_title:null,views:{year:{slide_events:1,enable:1},month:{slide_events:1,enable:1},week:{enable:1},day:{enable:1}},merge_holidays:!1,display_week_numbers:!0,weekbox:!0,onAfterEventsLoad:function(events){},onBeforeEventsLoad:function(next){next()},onAfterViewLoad:function(view){},onAfterModalShown:function(events){},onAfterModalHidden:function(events){},events:[],templates:{year:'',month:'',week:'',day:''},stop_cycling:!1};var defaults_extended={first_day:2,week_numbers_iso_8601:!1,holidays:{'01-01':"New Year's Day",'01+3*1':"Birthday of Dr. Martin Luther King, Jr.",'02+3*1':"Washington's Birthday",'05-1*1':"Memorial Day",'04-07':"Independence Day",'09+1*1':"Labor Day",'10+2*1':"Columbus Day",'11-11':"Veterans Day",'11+4*4':"Thanksgiving Day",'25-12':"Christmas"}};var strings={error_noview:'Calendar: View {0} not found',error_dateformat:'Calendar: Wrong date format {0}. Should be either "now" or "yyyy-mm-dd"',error_loadurl:'Calendar: Event URL is not set',error_where:'Calendar: Wrong navigation direction {0}. Can be only "next" or "prev" or "today"',error_timedevide:'Calendar: Time split parameter should divide 60 without decimals. Something like 10, 15, 30',no_events_in_day:'No events in this day.',title_year:'{0}',title_month:'{0} {1}',title_week:'week {0} of {1}',title_day:'{0} {1} {2}, {3}',week:'Week {0}',all_day:'All day',time:'Time',events:'Events',before_time:'Ends before timeline',after_time:'Starts after timeline',m0:'January',m1:'February',m2:'March',m3:'April',m4:'May',m5:'June',m6:'July',m7:'August',m8:'September',m9:'October',m10:'November',m11:'December',ms0:'Jan',ms1:'Feb',ms2:'Mar',ms3:'Apr',ms4:'May',ms5:'Jun',ms6:'Jul',ms7:'Aug',ms8:'Sep',ms9:'Oct',ms10:'Nov',ms11:'Dec',d0:'Sunday',d1:'Monday',d2:'Tuesday',d3:'Wednesday',d4:'Thursday',d5:'Friday',d6:'Saturday'};var browser_timezone='';try{if($.type(window.jstz)=='object'&&$.type(jstz.determine)=='function'){browser_timezone=jstz.determine().name();if($.type(browser_timezone)!=='string'){browser_timezone=''}}}catch(e){}
function buildEventsUrl(events_url,data){var separator,key,url;url=events_url;separator=(events_url.indexOf('?')<0)?'?':'&';for(key in data){url+=separator+key+'='+encodeURIComponent(data[key]);separator='&'}
return url}
function getExtentedOption(cal,option_name){var fromOptions=(cal.options[option_name]!=null)?cal.options[option_name]:null;var fromLanguage=(cal.locale[option_name]!=null)?cal.locale[option_name]:null;if((option_name=='holidays')&&cal.options.merge_holidays){var holidays={};$.extend(!0,holidays,fromLanguage?fromLanguage:defaults_extended.holidays);if(fromOptions){$.extend(!0,holidays,fromOptions)}
return holidays}else{if(fromOptions!=null){return fromOptions}
if(fromLanguage!=null){return fromLanguage}
return defaults_extended[option_name]}}
function getHolidays(cal,year){var hash=[];var holidays_def=getExtentedOption(cal,'holidays');for(var k in holidays_def){hash.push(k+':'+holidays_def[k])}
hash.push(year);hash=hash.join('|');if(hash in getHolidays.cache){return getHolidays.cache[hash]}
var holidays=[];$.each(holidays_def,function(key,name){var firstDay=null,lastDay=null,failed=!1;$.each(key.split('>'),function(i,chunk){var m,date=null;if(m=/^(\d\d)-(\d\d)$/.exec(chunk)){date=new Date(year,parseInt(m[2],10)-1,parseInt(m[1],10))}else if(m=/^(\d\d)-(\d\d)-(\d\d\d\d)$/.exec(chunk)){if(parseInt(m[3],10)==year){date=new Date(year,parseInt(m[2],10)-1,parseInt(m[1],10))}}else if(m=/^easter(([+\-])(\d+))?$/.exec(chunk)){date=getEasterDate(year,m[1]?parseInt(m[1],10):0)}else if(m=/^(\d\d)([+\-])([1-5])\*([0-6])$/.exec(chunk)){var month=parseInt(m[1],10)-1;var direction=m[2];var offset=parseInt(m[3]);var weekday=parseInt(m[4]);switch(direction){case '+':var d=new Date(year,month,1-7);while(d.getDay()!=weekday){d=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1)}
date=new Date(d.getFullYear(),d.getMonth(),d.getDate()+7*offset);break;case '-':var d=new Date(year,month+1,0+7);while(d.getDay()!=weekday){d=new Date(d.getFullYear(),d.getMonth(),d.getDate()-1)}
date=new Date(d.getFullYear(),d.getMonth(),d.getDate()-7*offset);break}}
if(!date){warn('Unknown holiday: '+key);failed=!0;return!1}
switch(i){case 0:firstDay=date;break;case 1:if(date.getTime()<=firstDay.getTime()){warn('Unknown holiday: '+key);failed=!0;return!1}
lastDay=date;break;default:warn('Unknown holiday: '+key);failed=!0;return!1}});if(!failed){var days=[];if(lastDay){for(var date=new Date(firstDay.getTime());date.getTime()<=lastDay.getTime();date.setDate(date.getDate()+1)){days.push(new Date(date.getTime()))}}else{days.push(firstDay)}
holidays.push({name:name,days:days})}});getHolidays.cache[hash]=holidays;return getHolidays.cache[hash]}
getHolidays.cache={};function warn(message){if($.type(window.console)=='object'&&$.type(window.console.warn)=='function'){window.console.warn('[Bootstrap-Calendar] '+message)}}
function Calendar(params,context){this.options=$.extend(!0,{position:{start:new Date(),end:new Date()}},defaults,params);this.setLanguage(this.options.language);this.context=context;context.css('width',this.options.width).addClass('cal-context');this.view();return this}
Calendar.prototype.setOptions=function(object){$.extend(this.options,object);if('language' in object){this.setLanguage(object.language)}
if('modal' in object){this._update_modal()}}
Calendar.prototype.setLanguage=function(lang){if(window.calendar_languages&&(lang in window.calendar_languages)){this.locale=$.extend(!0,{},strings,calendar_languages[lang]);this.options.language=lang}else{this.locale=strings;delete this.options.language}}
Calendar.prototype._render=function(){this.context.html('');this._loadTemplate(this.options.view);this.stop_cycling=!1;var data={};data.cal=this;data.day=1;if(getExtentedOption(this,'first_day')==1){data.days_name=[this.locale.d1,this.locale.d2,this.locale.d3,this.locale.d4,this.locale.d5,this.locale.d6,this.locale.d0]}else{data.days_name=[this.locale.d0,this.locale.d1,this.locale.d2,this.locale.d3,this.locale.d4,this.locale.d5,this.locale.d6]}
var start=parseInt(this.options.position.start.getTime());var end=parseInt(this.options.position.end.getTime());data.events=this.getEventsBetween(start,end);switch(this.options.view){case 'month':break;case 'week':this._calculate_hour_minutes(data);break;case 'day':this._calculate_hour_minutes(data);break}
data.start=new Date(this.options.position.start.getTime());data.lang=this.locale;this.context.append(this.options.templates[this.options.view](data));this._update()};Calendar.prototype._format_hour=function(str_hour){var hour_split=str_hour.split(":");var hour=parseInt(hour_split[0]);var minutes=parseInt(hour_split[1]);var suffix='';if(this.options.format12){if(hour<12){suffix=this.options.am_suffix}else{suffix=this.options.pm_suffix}
hour=hour%12;if(hour==0){hour=12}}
return hour.toString().formatNum(2)+':'+minutes.toString().formatNum(2)+suffix};Calendar.prototype._format_time=function(datetime){return this._format_hour(datetime.getHours()+':'+datetime.getMinutes())};Calendar.prototype._calculate_hour_minutes=function(data){var $self=this;var time_split=parseInt(this.options.time_split);var time_split_count=60/time_split;var time_split_hour=Math.min(time_split_count,1);if(((time_split_count>=1)&&(time_split_count%1!=0))||((time_split_count<1)&&(1440/time_split%1!=0))){$.error(this.locale.error_timedevide)}
var time_start=this.options.time_start.split(":");var time_end=this.options.time_end.split(":");data.hours=(parseInt(time_end[0])-parseInt(time_start[0]))*time_split_hour;var lines=data.hours*time_split_count-parseInt(time_start[1])/time_split;var ms_per_line=(60000*time_split);var start=new Date(this.options.position.start.getTime());start.setHours(time_start[0]);start.setMinutes(time_start[1]);var end=new Date(this.options.position.end.getTime());end.setHours(time_end[0]);end.setMinutes(time_end[1]);data.all_day=[];data.by_hour=[];data.after_time=[];data.before_time=[];$.each(data.events,function(k,e){var s=new Date(parseInt(e.start));var f=new Date(parseInt(e.end));e.start_hour=$self._format_time(s);e.end_hour=$self._format_time(f);if(e.start<start.getTime()){warn(1);e.start_hour=s.getDate()+' '+$self.locale['ms'+s.getMonth()]+' '+e.start_hour}
if(e.end>end.getTime()){warn(1);e.end_hour=f.getDate()+' '+$self.locale['ms'+f.getMonth()]+' '+e.end_hour}
if(e.start<start.getTime()&&e.end>end.getTime()){data.all_day.push(e);return}
if(e.end<start.getTime()){data.before_time.push(e);return}
if(e.start>end.getTime()){data.after_time.push(e);return}
var event_start=start.getTime()-e.start;if(event_start>=0){e.top=0}else{e.top=Math.abs(event_start)/ms_per_line}
var lines_left=Math.abs(lines-e.top);var lines_in_event=(e.end-e.start)/ms_per_line;if(event_start>=0){lines_in_event=(e.end-start.getTime())/ms_per_line}
e.lines=lines_in_event;if(lines_in_event>lines_left){e.lines=lines_left}
data.by_hour.push(e)})};Calendar.prototype._hour_min=function(hour){var time_start=this.options.time_start.split(":");var time_split=parseInt(this.options.time_split);var in_hour=60/time_split;return(hour==0)?(in_hour-(parseInt(time_start[1])/time_split)):in_hour};Calendar.prototype._hour=function(hour,part){var time_start=this.options.time_start.split(":");var time_split=parseInt(this.options.time_split);var h=""+(parseInt(time_start[0])+hour*Math.max(time_split/60,1));var m=""+time_split*part;return this._format_hour(h.formatNum(2)+":"+m.formatNum(2))};Calendar.prototype._week=function(event){this._loadTemplate('week-days');var t={};var start=parseInt(this.options.position.start.getTime());var end=parseInt(this.options.position.end.getTime());var events=[];var self=this;var first_day=getExtentedOption(this,'first_day');$.each(this.getEventsBetween(start,end),function(k,event){event.start_day=new Date(parseInt(event.start)).getDay();if(first_day==1){event.start_day=(event.start_day+6)%7}
if((event.end-event.start)<=86400000){event.days=1}else{event.days=((event.end-event.start)/86400000)}
if(event.start<start){event.days=event.days-((start-event.start)/86400000);event.start_day=0}
event.days=Math.ceil(event.days);if(event.start_day+event.days>7){event.days=7-(event.start_day)}
events.push(event)});t.events=events;t.cal=this;return self.options.templates['week-days'](t)}
Calendar.prototype._month=function(month){this._loadTemplate('year-month');var t={cal:this};var newmonth=month+1;t.data_day=this.options.position.start.getFullYear()+'-'+(newmonth<10?'0'+newmonth:newmonth)+'-'+'01';t.month_name=this.locale['m'+month];var curdate=new Date(this.options.position.start.getFullYear(),month,1,0,0,0);t.start=parseInt(curdate.getTime());t.end=parseInt(new Date(this.options.position.start.getFullYear(),month+1,1,0,0,0).getTime());t.events=this.getEventsBetween(t.start,t.end);return this.options.templates['year-month'](t)}
Calendar.prototype._day=function(week,day){this._loadTemplate('month-day');var t={tooltip:'',cal:this};var cls=this.options.classes.months.outmonth;var firstday=this.options.position.start.getDay();if(getExtentedOption(this,'first_day')==2){firstday++}else{firstday=(firstday==0?7:firstday)}
day=(day-firstday)+1;var curdate=new Date(this.options.position.start.getFullYear(),this.options.position.start.getMonth(),day,0,0,0);if(day>0){cls=this.options.classes.months.inmonth}
var daysinmonth=(new Date(this.options.position.end.getTime()-1)).getDate();if((day+1)>daysinmonth){this.stop_cycling=!0}
if(day>daysinmonth){day=day-daysinmonth;cls=this.options.classes.months.outmonth}
cls=$.trim(cls+" "+this._getDayClass("months",curdate));if(day<=0){var daysinprevmonth=(new Date(this.options.position.start.getFullYear(),this.options.position.start.getMonth(),0)).getDate();day=daysinprevmonth-Math.abs(day);cls+=' cal-month-first-row'}
var holiday=this._getHoliday(curdate);if(holiday!==!1){t.tooltip=holiday}
t.data_day=curdate.getFullYear()+'-'+curdate.getMonthFormatted()+'-'+(day<10?'0'+day:day);t.cls=cls;t.day=day;t.start=parseInt(curdate.getTime());t.end=parseInt(t.start+86400000);t.events=this.getEventsBetween(t.start,t.end);return this.options.templates['month-day'](t)}
Calendar.prototype._getHoliday=function(date){var result=!1;$.each(getHolidays(this,date.getFullYear()),function(){var found=!1;$.each(this.days,function(){if(this.toDateString()==date.toDateString()){found=!0;return!1}});if(found){result=this.name;return!1}});return result};Calendar.prototype._getHolidayName=function(date){var holiday=this._getHoliday(date);return(holiday===!1)?"":holiday};Calendar.prototype._getDayClass=function(class_group,date){var self=this;var addClass=function(which,to){var cls;cls=(self.options.classes&&(class_group in self.options.classes)&&(which in self.options.classes[class_group]))?self.options.classes[class_group][which]:"";if((typeof(cls)=="string")&&cls.length){to.push(cls)}};var classes=[];if(date.toDateString()==(new Date()).toDateString()){addClass("today",classes)}
var holiday=this._getHoliday(date);if(holiday!==!1){addClass("holidays",classes)}
switch(date.getDay()){case 0:addClass("sunday",classes);break;case 6:addClass("saturday",classes);break}
addClass(date.toDateString(),classes);return classes.join(" ")};Calendar.prototype.view=function(view){if(view){if(!this.options.views[view].enable){return}
this.options.view=view}
this._init_position();this._loadEvents();this._render();this.options.onAfterViewLoad.call(this,this.options.view)};Calendar.prototype.navigate=function(where,next){var to=$.extend({},this.options.position);if(where=='next'){switch(this.options.view){case 'year':to.start.setFullYear(this.options.position.start.getFullYear()+1);break;case 'month':to.start.setMonth(this.options.position.start.getMonth()+1);break;case 'week':to.start.setDate(this.options.position.start.getDate()+7);break;case 'day':to.start.setDate(this.options.position.start.getDate()+1);break}}else if(where=='prev'){switch(this.options.view){case 'year':to.start.setFullYear(this.options.position.start.getFullYear()-1);break;case 'month':to.start.setMonth(this.options.position.start.getMonth()-1);break;case 'week':to.start.setDate(this.options.position.start.getDate()-7);break;case 'day':to.start.setDate(this.options.position.start.getDate()-1);break}}else if(where=='today'){to.start.setTime(new Date().getTime())}else{$.error(this.locale.error_where.format(where))}
this.options.day=to.start.getFullYear()+'-'+to.start.getMonthFormatted()+'-'+to.start.getDateFormatted();this.view();if(_.isFunction(next)){next()}};Calendar.prototype._init_position=function(){var year,month,day;if(this.options.day=='now'){var date=new Date();year=date.getFullYear();month=date.getMonth();day=date.getDate()}else if(this.options.day.match(/^\d{4}-\d{2}-\d{2}$/g)){var list=this.options.day.split('-');year=parseInt(list[0],10);month=parseInt(list[1],10)-1;day=parseInt(list[2],10)}else{$.error(this.locale.error_dateformat.format(this.options.day))}
switch(this.options.view){case 'year':this.options.position.start.setTime(new Date(year,0,1).getTime());this.options.position.end.setTime(new Date(year+1,0,1).getTime());break;case 'month':this.options.position.start.setTime(new Date(year,month,1).getTime());this.options.position.end.setTime(new Date(year,month+1,1).getTime());break;case 'day':this.options.position.start.setTime(new Date(year,month,day).getTime());this.options.position.end.setTime(new Date(year,month,day+1).getTime());break;case 'week':var curr=new Date(year,month,day);var first;if(getExtentedOption(this,'first_day')==1){first=curr.getDate()-((curr.getDay()+6)%7)}else{first=curr.getDate()-curr.getDay()}
this.options.position.start.setTime(new Date(year,month,first).getTime());this.options.position.end.setTime(new Date(year,month,first+7).getTime());break;default:$.error(this.locale.error_noview.format(this.options.view))}
return this};Calendar.prototype.getTitle=function(){var p=this.options.position.start;switch(this.options.view){case 'year':return this.locale.title_year.format(p.getFullYear());break;case 'month':return this.locale.title_month.format(this.locale['m'+p.getMonth()],p.getFullYear());break;case 'week':return this.locale.title_week.format(p.getWeek(getExtentedOption(this,'week_numbers_iso_8601')),p.getFullYear());break;case 'day':return this.locale.title_day.format(this.locale['d'+p.getDay()],p.getDate(),this.locale['m'+p.getMonth()],p.getFullYear());break}
return};Calendar.prototype.getYear=function(){var p=this.options.position.start;return p.getFullYear()};Calendar.prototype.getMonth=function(){var p=this.options.position.start;return this.locale['m'+p.getMonth()]};Calendar.prototype.getDay=function(){var p=this.options.position.start;return this.locale['d'+p.getDay()]};Calendar.prototype.isToday=function(){var now=new Date().getTime();return((now>this.options.position.start)&&(now<this.options.position.end))}
Calendar.prototype.getStartDate=function(){return this.options.position.start}
Calendar.prototype.getEndDate=function(){return this.options.position.end}
Calendar.prototype._loadEvents=function(){var self=this;var source=null;if('events_source' in this.options&&this.options.events_source!==''){source=this.options.events_source}else if('events_url' in this.options){source=this.options.events_url;warn('The events_url option is DEPRECATED and it will be REMOVED in near future. Please use events_source instead.')}
var loader;switch($.type(source)){case 'function':loader=function(){return source(self.options.position.start,self.options.position.end,browser_timezone)};break;case 'array':loader=function(){return[].concat(source)};break;case 'string':if(source.length){loader=function(){var events=[];var d_from=self.options.position.start;var d_to=self.options.position.end;var params={from:d_from.getTime(),to:d_to.getTime(),utc_offset_from:d_from.getTimezoneOffset(),utc_offset_to:d_to.getTimezoneOffset()};if(browser_timezone.length){params.browser_timezone=browser_timezone}
$.ajax({url:buildEventsUrl(source,params),dataType:'json',type:'GET',async:!1}).done(function(json){if(!json.success){$.error(json.error)}
if(json.result){events=json.result}});return events}}
break}
if(!loader){$.error(this.locale.error_loadurl)}
this.options.onBeforeEventsLoad.call(this,function(){if(!self.options.events.length||!self.options.events_cache){self.options.events=loader();self.options.events.sort(function(a,b){var delta;delta=a.start-b.start;if(delta==0){delta=a.end-b.end}
return delta})}
self.options.onAfterEventsLoad.call(self,self.options.events)})};Calendar.prototype._templatePath=function(name){if(typeof this.options.tmpl_path=='function'){return this.options.tmpl_path(name)}else{return this.options.tmpl_path+name+'.html'}};Calendar.prototype._loadTemplate=function(name){if(this.options.templates[name]){return}
var self=this;$.ajax({url:self._templatePath(name),dataType:'html',type:'GET',async:!1,cache:this.options.tmpl_cache}).done(function(html){self.options.templates[name]=_.template(html)})};Calendar.prototype._update=function(){var self=this;$('*[data-toggle="tooltip"]').tooltip({container:this.options.tooltip_container});$('*[data-cal-date]').click(function(){var view=$(this).data('cal-view');self.options.day=$(this).data('cal-date');self.view(view)});$('.cal-cell').dblclick(function(){var view=$('[data-cal-date]',this).data('cal-view');self.options.day=$('[data-cal-date]',this).data('cal-date');self.view(view)});this['_update_'+this.options.view]();this._update_modal()};Calendar.prototype._update_modal=function(){var self=this;$('a[data-event-id]',this.context).unbind('click');if(!self.options.modal){return}
var modal=$(self.options.modal);if(!modal.length){return}
var ifrm=null;if(self.options.modal_type=="iframe"){ifrm=$(document.createElement("iframe")).attr({width:"100%",frameborder:"0"})}
$('a[data-event-id]',this.context).on('click',function(event){event.preventDefault();event.stopPropagation();var url=$(this).attr('href');var id=$(this).data("event-id");var event=_.find(self.options.events,function(event){return event.id==id});if(self.options.modal_type=="iframe"){ifrm.attr('src',url);$('.modal-body',modal).html(ifrm)}
if(!modal.data('handled.bootstrap-calendar')||(modal.data('handled.bootstrap-calendar')&&modal.data('handled.event-id')!=event.id)){modal.off('show.bs.modal').off('shown.bs.modal').off('hidden.bs.modal').on('show.bs.modal',function(){var modal_body=$(this).find('.modal-body');switch(self.options.modal_type){case "iframe":var height=modal_body.height()-parseInt(modal_body.css('padding-top'),10)-parseInt(modal_body.css('padding-bottom'),10);$(this).find('iframe').height(Math.max(height,50));break;case "ajax":$.ajax({url:url,dataType:"html",async:!1,success:function(data){modal_body.html(data)}});break;case "template":self._loadTemplate("modal");modal_body.html(self.options.templates.modal({"event":event,"calendar":self}))
break}
if(_.isFunction(self.options.modal_title)){modal.find(".modal-title").html(self.options.modal_title(event))}}).on('shown.bs.modal',function(){self.options.onAfterModalShown.call(self,self.options.events)}).on('hidden.bs.modal',function(){self.options.onAfterModalHidden.call(self,self.options.events)}).data('handled.bootstrap-calendar',!0).data('handled.event-id',event.id)}
modal.modal('show')})};Calendar.prototype._update_day=function(){$('#cal-day-panel').height($('#cal-day-panel-hour').height())};Calendar.prototype._update_week=function(){};Calendar.prototype._update_year=function(){this._update_month_year()};Calendar.prototype._update_month=function(){this._update_month_year();var self=this;if(this.options.weekbox==!0){var week=$(document.createElement('div')).attr('id','cal-week-box');var start=this.options.position.start.getFullYear()+'-'+this.options.position.start.getMonthFormatted()+'-';self.context.find('.cal-month-box .cal-row-fluid').on('mouseenter',function(){var p=new Date(self.options.position.start);var child=$('.cal-cell1:first-child .cal-month-day',this);var day=(child.hasClass('cal-month-first-row')?1:$('[data-cal-date]',child).text());p.setDate(parseInt(day));day=(day<10?'0'+day:day);week.html(self.locale.week.format(self.options.display_week_numbers==!0?p.getWeek(getExtentedOption(self,'week_numbers_iso_8601')):''));week.attr('data-cal-week',start+day).show().appendTo(child)}).on('mouseleave',function(){week.hide()});week.click(function(){self.options.day=$(this).data('cal-week');self.view('week')})}
self.context.find('a.event').mouseenter(function(){$('a[data-event-id="'+$(this).data('event-id')+'"]').closest('.cal-cell1').addClass('day-highlight dh-'+$(this).data('event-class'))});self.context.find('a.event').mouseleave(function(){$('div.cal-cell1').removeClass('day-highlight dh-'+$(this).data('event-class'))})};Calendar.prototype._update_month_year=function(){if(!this.options.views[this.options.view].slide_events){return}
var self=this;var activecell=0;var downbox=$(document.createElement('div')).attr('id','cal-day-tick').html('<i class="icon-chevron-down glyphicon glyphicon-chevron-down"></i>');self.context.find('.cal-month-day, .cal-year-box .span3').on('mouseenter',function(){if($('.events-list',this).length==0){return}
if($(this).children('[data-cal-date]').text()==self.activecell){return}
downbox.show().appendTo(this)}).on('mouseleave',function(){downbox.hide()}).on('click',function(event){if($('.events-list',this).length==0){return}
if($(this).children('[data-cal-date]').text()==self.activecell){return}
showEventsList(event,downbox,slider,self)});var slider=$(document.createElement('div')).attr('id','cal-slide-box');slider.hide().click(function(event){event.stopPropagation()});this._loadTemplate('events-list');downbox.click(function(event){showEventsList(event,$(this),slider,self)})};Calendar.prototype.getEventsBetween=function(start,end){var events=[];$.each(this.options.events,function(){if(this.start==null){return!0}
var event_end=this.end||this.start;if((parseInt(this.start)<end)&&(parseInt(event_end)>=start)){events.push(this)}});return events};function showEventsList(event,that,slider,self){event.stopPropagation();var that=$(that);var cell=that.closest('.cal-cell');var row=cell.closest('.cal-before-eventlist');var tick_position=cell.data('cal-row');that.fadeOut('fast');slider.slideUp('fast',function(){var event_list=$('.events-list',cell);slider.html(self.options.templates['events-list']({cal:self,events:self.getEventsBetween(parseInt(event_list.data('cal-start')),parseInt(event_list.data('cal-end')))}));row.after(slider);self.activecell=$('[data-cal-date]',cell).text();$('#cal-slide-tick').addClass('tick'+tick_position).show();slider.slideDown('fast',function(){$('body').one('click',function(){slider.slideUp('fast');self.activecell=0})})});setTimeout(function(){$('a.event-item').mouseenter(function(){$('a[data-event-id="'+$(this).data('event-id')+'"]').closest('.cal-cell1').addClass('day-highlight dh-'+$(this).data('event-class'))});$('a.event-item').mouseleave(function(){$('div.cal-cell1').removeClass('day-highlight dh-'+$(this).data('event-class'))});self._update_modal()},400)}
function getEasterDate(year,offsetDays){var a=year%19;var b=Math.floor(year/100);var c=year%100;var d=Math.floor(b/4);var e=b%4;var f=Math.floor((b+8)/25);var g=Math.floor((b-f+1)/3);var h=(19*a+b-d-g+15)%30;var i=Math.floor(c/4);var k=c%4;var l=(32+2*e+2*i-h-k)%7;var m=Math.floor((a+11*h+22*l)/451);var n0=(h+l+7*m+114)
var n=Math.floor(n0/31)-1;var p=n0%31+1;return new Date(year,n,p+(offsetDays?offsetDays:0),0,0,0)}
$.fn.calendar=function(params){return new Calendar(params,this)}}(jQuery));(function($,_){"use strict";var init=function($calendarWrapper){var ajaxParams=$calendarWrapper.data('extends-ajax-params'),template=$calendarWrapper.data('template'),ajaxUrl=$calendarWrapper.data('ajax-url'),templatePath=$calendarWrapper.data('template-path'),firstDay=$calendarWrapper.data('first-day'),hasEventSources=$calendarWrapper.get(0).hasAttribute('data-event-source'),eventSource=[],gmtOffset=new Date().getTimezoneOffset()*60,avaibleClasses=['event-warning','event-success','event-info','event-inverse','event-special','event-important'];var prepareEventSources=function(events){events.forEach(function(element,index,events_array){{var e=new Date(parseInt(element.end+'000')),offset=gmtOffset;if(e.getUTCHours()==23&&e.getUTCMinutes()==59&&e.getUTCMinutes()==59&&gmtOffset<0){offset=0}}
events_array[index].start=(parseInt(element.start)+offset)*1000;events_array[index].end=(parseInt(element.end)+gmtOffset)*1000;if($.type(element.class)=='undefined'){var eventClass='';if($.type(element.id)=='number'){var key=element.id%(avaibleClasses.length);if(key>=avaibleClasses.length){key=0}
eventClass=avaibleClasses[key]}
events_array[index].class=eventClass}});return events}
if(hasEventSources){eventSource=prepareEventSources($calendarWrapper.data('event-source'));$calendarWrapper.data('event-source',eventSource)}
var ajaxRequestFunction=function(start_date,end_date){var events=[],params={from:(Math.floor(start_date.getTime()/1000)-86400),to:(Math.floor(end_date.getTime()/1000)+86400),action:'shortcode_calendar_get_events',template:template,'fw_load_shortcodes':!0};if(ajaxParams!==!1){params=_.extend(params,ajaxParams)}
$.ajax({url:ajaxUrl,data:params,dataType:'json',type:'POST',async:!1}).done(function(json){if(!json.success){console.log(json)}
if(json.data){events=prepareEventSources(json.data)}});return events};var options={language:fwShortcodeCalendarLocalize.locale,events_source:hasEventSources?eventSource:ajaxRequestFunction,view:template,tmpl_path:templatePath,first_day:firstDay,time_split:'30',tmpl_cache:!1,day:(function(){var today=new Date(),month=(today.getMonth()+1)<10?'0'+(today.getMonth()+1):(today.getMonth()+1),date=today.getDate()<10?'0'+today.getDate():today.getDate();return today.getFullYear()+'-'+month+'-'+date})(),onAfterViewLoad:function(view){$calendarWrapper.find('.page-header h3').text(this.getTitle());$calendarWrapper.find('.btn-group button').removeClass('active');{$('*[data-cal-date]').off('click');$('.cal-cell').off('dblclick');$('.cal-month-box .cal-row-fluid').off('mouseenter mouseleave')}
$calendarWrapper.find('.hidden-header').removeClass('hidden-header');if(view==='day'){$calendarWrapper.find('.cal-day-panel-class').css('height',$calendarWrapper.find('.cal-day-panel-hour-class').css('height'));{var $dayEventsBlocks=$calendarWrapper.find('.cal-day-panel-class .day-event'),rowWidth=$calendarWrapper.find('.cal-day-hour-part').width();$dayEventsBlocks.css('width',Math.floor((rowWidth-(rowWidth/100)*20)/$dayEventsBlocks.length));var width_content=$calendarWrapper.parent().outerWidth();if(width_content<701){$calendarWrapper.find('.day-event').css('max-width','100px')}}}}},calendar=$calendarWrapper.find('.fw-shortcode-calendar').calendar(options);$calendarWrapper.data('fw-shortcode-calendar.calendar',calendar);{$calendarWrapper.find('.btn-group button[data-calendar-nav]').each(function(){var $this=$(this);$this.click(function(){calendar.navigate($this.data('calendar-nav'))})})}}
$(document).ready(function(){$('.fw-shortcode-calendar-wrapper:not(fw-initialized)').each(function(){init($(this))}).addClass('fw-initialized')})}(jQuery,_));!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],a):a(jQuery)}(function(a){return a.widget("ui.accordion",{version:"1.11.4",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var b=this.options;this.prevShow=this.prevHide=a(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),b.collapsible||b.active!==!1&&null!=b.active||(b.active=0),this._processPanels(),b.active<0&&(b.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():a()}},_createIcons:function(){var b=this.options.icons;b&&(a("<span>").addClass("ui-accordion-header-icon ui-icon "+b.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var a;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),a=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&a.css("height","")},_setOption:function(a,b){return"active"===a?void this._activate(b):("event"===a&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(b)),this._super(a,b),"collapsible"!==a||b||this.options.active!==!1||this._activate(0),"icons"===a&&(this._destroyIcons(),b&&this._createIcons()),void("disabled"===a&&(this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!b))))},_keydown:function(b){if(!b.altKey&&!b.ctrlKey){var c=a.ui.keyCode,d=this.headers.length,e=this.headers.index(b.target),f=!1;switch(b.keyCode){case c.RIGHT:case c.DOWN:f=this.headers[(e+1)%d];break;case c.LEFT:case c.UP:f=this.headers[(e-1+d)%d];break;case c.SPACE:case c.ENTER:this._eventHandler(b);break;case c.HOME:f=this.headers[0];break;case c.END:f=this.headers[d-1]}f&&(a(b.target).attr("tabIndex",-1),a(f).attr("tabIndex",0),f.focus(),b.preventDefault())}},_panelKeyDown:function(b){b.keyCode===a.ui.keyCode.UP&&b.ctrlKey&&a(b.currentTarget).prev().focus()},refresh:function(){var b=this.options;this._processPanels(),b.active===!1&&b.collapsible===!0||!this.headers.length?(b.active=!1,this.active=a()):b.active===!1?this._activate(0):this.active.length&&!a.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(b.active=!1,this.active=a()):this._activate(Math.max(0,b.active-1)):b.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var a=this.headers,b=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),b&&(this._off(a.not(this.headers)),this._off(b.not(this.panels)))},_refresh:function(){var b,c=this.options,d=c.heightStyle,e=this.element.parent();this.active=this._findActive(c.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var b=a(this),c=b.uniqueId().attr("id"),d=b.next(),e=d.uniqueId().attr("id");b.attr("aria-controls",e),d.attr("aria-labelledby",c)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(c.event),"fill"===d?(b=e.height(),this.element.siblings(":visible").each(function(){var c=a(this),d=c.css("position");"absolute"!==d&&"fixed"!==d&&(b-=c.outerHeight(!0))}),this.headers.each(function(){b-=a(this).outerHeight(!0)}),this.headers.next().each(function(){a(this).height(Math.max(0,b-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")):"auto"===d&&(b=0,this.headers.next().each(function(){b=Math.max(b,a(this).css("height","").height())}).height(b))},_activate:function(b){var c=this._findActive(b)[0];c!==this.active[0]&&(c=c||this.active[0],this._eventHandler({target:c,currentTarget:c,preventDefault:a.noop}))},_findActive:function(b){return"number"==typeof b?this.headers.eq(b):a()},_setupEvents:function(b){var c={keydown:"_keydown"};b&&a.each(b.split(" "),function(a,b){c[b]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,c),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(b){var c=this.options,d=this.active,e=a(b.currentTarget),f=e[0]===d[0],g=f&&c.collapsible,h=g?a():e.next(),i=d.next(),j={oldHeader:d,oldPanel:i,newHeader:g?a():e,newPanel:h};b.preventDefault(),f&&!c.collapsible||this._trigger("beforeActivate",b,j)===!1||(c.active=!g&&this.headers.index(e),this.active=f?a():e,this._toggle(j),d.removeClass("ui-accordion-header-active ui-state-active"),c.icons&&d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header),f||(e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),c.icons&&e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader),e.next().addClass("ui-accordion-content-active")))},_toggle:function(b){var c=b.newPanel,d=this.prevShow.length?this.prevShow:b.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=c,this.prevHide=d,this.options.animate?this._animate(c,d,b):(d.hide(),c.show(),this._toggleComplete(b)),d.attr({"aria-hidden":"true"}),d.prev().attr({"aria-selected":"false","aria-expanded":"false"}),c.length&&d.length?d.prev().attr({tabIndex:-1,"aria-expanded":"false"}):c.length&&this.headers.filter(function(){return 0===parseInt(a(this).attr("tabIndex"),10)}).attr("tabIndex",-1),c.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(a,b,c){var d,e,f,g=this,h=0,i=a.css("box-sizing"),j=a.length&&(!b.length||a.index()<b.index()),k=this.options.animate||{},l=j&&k.down||k,m=function(){g._toggleComplete(c)};return"number"==typeof l&&(f=l),"string"==typeof l&&(e=l),e=e||l.easing||k.easing,f=f||l.duration||k.duration,b.length?a.length?(d=a.show().outerHeight(),b.animate(this.hideProps,{duration:f,easing:e,step:function(a,b){b.now=Math.round(a)}}),void a.hide().animate(this.showProps,{duration:f,easing:e,complete:m,step:function(a,c){c.now=Math.round(a),"height"!==c.prop?"content-box"===i&&(h+=c.now):"content"!==g.options.heightStyle&&(c.now=Math.round(d-b.outerHeight()-h),h=0)}})):b.animate(this.hideProps,f,e,m):a.animate(this.showProps,f,e,m)},_toggleComplete:function(a){var b=a.oldPanel;b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),b.length&&(b.parent()[0].className=b.parent()[0].className),this._trigger("activate",null,a)}})});(function($){"use strict";$(document).ready(function($){$(".fw-accordion").accordion({heightStyle:"content"})})})(jQuery)
