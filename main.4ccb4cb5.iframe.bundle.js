(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{28:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return confirmMachine})),__webpack_require__.d(__webpack_exports__,"a",(function(){return ConfirmDeleteButton}));__webpack_require__(139),__webpack_require__(208),__webpack_require__(59),__webpack_require__(78),__webpack_require__(24),__webpack_require__(92),__webpack_require__(44),__webpack_require__(37),__webpack_require__(52),__webpack_require__(81),__webpack_require__(54),__webpack_require__(114),__webpack_require__(648);var _xstate_react__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(657),xstate__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(658),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__=(__webpack_require__(5),__webpack_require__(26));function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=arr&&("undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"]);if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var confirmMachine=Object(xstate__WEBPACK_IMPORTED_MODULE_14__.a)({id:"confirm-delete-button",initial:"idle",states:{idle:{on:{CLICK:"confirming"}},confirming:{invoke:{src:"pageClickHandler"},on:{CLICK:"deleting",CANCEL:"idle"}},deleting:{invoke:{src:"onDelete",onDone:"idle",onError:"idle"}}}},{services:{pageClickHandler:function pageClickHandler(){return function(dispatch){function clickHandler(){dispatch({type:"CANCEL"})}return document.body.addEventListener("click",clickHandler),function(){document.body.removeEventListener("click",clickHandler)}}}}});function ConfirmDeleteButton(_ref){var onDelete=_ref.onDelete,_useMachine2=_slicedToArray(Object(_xstate_react__WEBPACK_IMPORTED_MODULE_13__.b)(confirmMachine,{services:{onDelete:onDelete}}),2),state=_useMachine2[0],dispatch=_useMachine2[1],classes=["storybook-button","storybook-button--medium"];return state.matches("idle")?classes.push("storybook-button--primary"):(classes.push("storybook-button--secondary"),classes.push("storybook-button--test")),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("button",{type:"button",onClick:function onClick(event){event.preventDefault(),event.stopPropagation(),dispatch({type:"CLICK"})},className:classes.join(" "),children:function(){switch(!0){case state.matches("confirming"):return"Confirm";case state.matches("deleting"):return"Deleting...";default:return"Delete"}}()})}ConfirmDeleteButton.displayName="ConfirmDeleteButton";try{ConfirmDeleteButton.displayName="ConfirmDeleteButton",ConfirmDeleteButton.__docgenInfo={description:"",displayName:"ConfirmDeleteButton",props:{onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"() => Promise<unknown>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/Button.tsx#ConfirmDeleteButton"]={docgenInfo:ConfirmDeleteButton.__docgenInfo,name:"ConfirmDeleteButton",path:"stories/Button.tsx#ConfirmDeleteButton"})}catch(__react_docgen_typescript_loader_error){}},330:function(module,exports,__webpack_require__){__webpack_require__(331),__webpack_require__(486),__webpack_require__(487),__webpack_require__(656),module.exports=__webpack_require__(642)},398:function(module,exports){},487:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(261)},642:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(261).configure)([__webpack_require__(643),__webpack_require__(644)],module,!1)}).call(this,__webpack_require__(203)(module))},643:function(module,exports){function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=function(){return[]},webpackEmptyContext.resolve=webpackEmptyContext,module.exports=webpackEmptyContext,webpackEmptyContext.id=643},644:function(module,exports,__webpack_require__){var map={"./Button.stories.tsx":645,"./Machines.stories.tsx":655};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=644},645:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Button",(function(){return Button})),__webpack_require__.d(__webpack_exports__,"ButtonWithEvents",(function(){return ButtonWithEvents})),__webpack_require__.d(__webpack_exports__,"ButtonWithRepeatEvents",(function(){return ButtonWithRepeatEvents})),__webpack_require__.d(__webpack_exports__,"AutomaticButton",(function(){return AutomaticButton}));__webpack_require__(83),__webpack_require__(24),__webpack_require__(43),__webpack_require__(646),__webpack_require__(207),__webpack_require__(36),__webpack_require__(107),__webpack_require__(59),__webpack_require__(321);var _Button__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(28),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(26);function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_exports__.default={title:"Example/ConfirmDeleteButton",component:_Button__WEBPACK_IMPORTED_MODULE_9__.a};var Template=function Template(_ref){_ref.onDelete;var args=_objectWithoutProperties(_ref,["onDelete"]);return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_9__.a,Object.assign({onDelete:function onDelete(){return new Promise((function(){}))}},args))};Template.displayName="Template";var Button=Template.bind({});Button.args={onDelete:function onDelete(){return new Promise((function(resolve){setTimeout((function(){resolve()}),2e3)}))}};var ButtonWithEvents=Template.bind({});ButtonWithEvents.parameters={xstate:_defineProperty({height:"1080px"},_Button__WEBPACK_IMPORTED_MODULE_9__.b.id,{events:[{type:"CLICK"}]})};var ButtonWithRepeatEvents=Template.bind({});ButtonWithRepeatEvents.parameters={xstate:_defineProperty({},_Button__WEBPACK_IMPORTED_MODULE_9__.b.id,{events:["CLICK","CLICK","done.invoke.onDelete"],delay:2500,shouldRepeatEvents:!0})};var AutomaticButton=Template.bind({});AutomaticButton.parameters={xstate:_defineProperty({},_Button__WEBPACK_IMPORTED_MODULE_9__.b.id,{events:function events(state){return new Promise((function(resolve){return setTimeout((function(){switch(!0){case state.matches("idle"):case state.matches("confirming"):return resolve("CLICK");case state.matches("deleting"):return resolve("done.invoke.onDelete")}}),2500)}))}})}},648:function(module,exports,__webpack_require__){var api=__webpack_require__(649),content=__webpack_require__(650);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},650:function(module,exports,__webpack_require__){(exports=__webpack_require__(651)(!1)).push([module.i,'.storybook-button {\n  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n  font-weight: 700;\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  line-height: 1;\n}\n.storybook-button--primary {\n  color: white;\n  background-color: #1ea7fd;\n}\n.storybook-button--secondary {\n  color: #333;\n  background-color: transparent;\n  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;\n}\n.storybook-button--small {\n  font-size: 12px;\n  padding: 10px 16px;\n}\n.storybook-button--medium {\n  font-size: 14px;\n  padding: 11px 20px;\n}\n.storybook-button--large {\n  font-size: 16px;\n  padding: 12px 24px;\n}\n',""]),module.exports=exports},655:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"DevToolsWithUseMachine",(function(){return Machines_stories_DevToolsWithUseMachine})),__webpack_require__.d(__webpack_exports__,"MachinePreview",(function(){return Machines_stories_MachinePreview})),__webpack_require__.d(__webpack_exports__,"StringEvent",(function(){return Machines_stories_StringEvent})),__webpack_require__.d(__webpack_exports__,"ObjectEvent",(function(){return Machines_stories_ObjectEvent})),__webpack_require__.d(__webpack_exports__,"EventsObjectArray",(function(){return Machines_stories_EventsObjectArray})),__webpack_require__.d(__webpack_exports__,"EventsStringArray",(function(){return Machines_stories_EventsStringArray})),__webpack_require__.d(__webpack_exports__,"RepeatedEventsArrayWithDelay",(function(){return Machines_stories_RepeatedEventsArrayWithDelay})),__webpack_require__.d(__webpack_exports__,"EventsFunction",(function(){return Machines_stories_EventsFunction})),__webpack_require__.d(__webpack_exports__,"EventsFunctionWithDelay",(function(){return Machines_stories_EventsFunctionWithDelay}));__webpack_require__(83),__webpack_require__(24),__webpack_require__(207);var react=__webpack_require__(5),Button=__webpack_require__(28),useMachine=__webpack_require__(657),interpreter=(__webpack_require__(43),__webpack_require__(53),__webpack_require__(55),__webpack_require__(208),__webpack_require__(59),__webpack_require__(78),__webpack_require__(92),__webpack_require__(44),__webpack_require__(37),__webpack_require__(52),__webpack_require__(81),__webpack_require__(54),__webpack_require__(114),__webpack_require__(660)),browser=__webpack_require__(661),react_dom=__webpack_require__(67);function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}var jsx_runtime=__webpack_require__(26);function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=arr&&("undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"]);if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function RenderMachine_unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return RenderMachine_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return RenderMachine_arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function RenderMachine_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function RenderMachine(_ref){var machine=_ref.machine,options=_ref.options,events=_ref.events,delay=_ref.delay,shouldRepeatEvents=_ref.shouldRepeatEvents,iframeRef=react.useRef(),service=_slicedToArray(Object(useMachine.b)(machine,Object.assign({},options,{devTools:!0})),3)[2];return react.useEffect((function(){events&&function eventsHandler(service,events){var delay=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,shouldRepeat=arguments.length>3?arguments[3]:void 0;function safeSend(event){event&&service.status===interpreter.b.Running&&service.send(event)}if(events)switch(_typeof(events)){case"function":return void service.onTransition((function(state){setTimeout((function(){Promise.resolve(events(state)).then(safeSend)}),delay)}));case"object":if(delay&&Array.isArray(events)){var popStack=_toConsumableArray(events);return void service.onTransition((function(){service.status===interpreter.b.Running&&setTimeout((function(){safeSend(popStack.shift()),!popStack.length&&shouldRepeat&&popStack.push.apply(popStack,_toConsumableArray(events))}),delay)}))}default:safeSend(events)}}(service,events,delay,shouldRepeatEvents)}),[]),Object(jsx_runtime.jsx)("iframe",{style:{width:"100%",height:"100vh",border:0},ref:function ref(iframe){iframe&&iframe.parentElement&&!iframeRef.current&&(iframeRef.current=iframe,iframe.parentElement.childNodes.forEach((function(node){node!==iframe&&Object(react_dom.unmountComponentAtNode)(node)})),interpreter.a.defaultOptions.devTools=!1,Object(browser.a)({iframe:iframe}),interpreter.a.defaultOptions.devTools=!0)}})}RenderMachine.displayName="RenderMachine";try{RenderMachine.displayName="RenderMachine",RenderMachine.__docgenInfo={description:"",displayName:"RenderMachine",props:{machine:{defaultValue:null,description:"",name:"machine",required:!0,type:{name:"StateMachine<TContext, any, TEvent, TTypestate>"}},options:{defaultValue:null,description:"",name:"options",required:!1,type:{name:"(Partial<InterpreterOptions> & Partial<UseMachineOptions<TContext, TEvent>> & Partial<MachineOptions<TContext, TEvent>>)"}},events:{defaultValue:null,description:"",name:"events",required:!1,type:{name:'string | EventObject | (TEvent | TEvent["type"])[] | ((state: State<TContext, TEvent, any, TTypestate>) => TEvent | ... 2 more ...) | undefined'}},delay:{defaultValue:null,description:"",name:"delay",required:!1,type:{name:"number"}},shouldRepeatEvents:{defaultValue:null,description:"",name:"shouldRepeatEvents",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/RenderMachine.tsx#RenderMachine"]={docgenInfo:RenderMachine.__docgenInfo,name:"RenderMachine",path:"src/RenderMachine.tsx#RenderMachine"})}catch(__react_docgen_typescript_loader_error){}__webpack_exports__.default={title:"Example/Machine Preview",parameters:{xstate:!1}};var Machines_stories_UseMachine=function UseMachine(){return Object(useMachine.b)(Button.b),Object(jsx_runtime.jsx)("div",{children:"Open the addon to see the xstate inspector, normally it'd be better to use RenderMachine component"})};Machines_stories_UseMachine.displayName="UseMachine";var Machines_stories_DevToolsWithUseMachine=function DevToolsWithUseMachine(){return Object(jsx_runtime.jsx)(Machines_stories_UseMachine,{})};Machines_stories_DevToolsWithUseMachine.displayName="DevToolsWithUseMachine",Machines_stories_DevToolsWithUseMachine.parameters={xstate:!0};var Machines_stories_MachinePreview=function MachinePreview(){return Object(jsx_runtime.jsx)(RenderMachine,{machine:Button.b})};Machines_stories_MachinePreview.displayName="MachinePreview";var Machines_stories_StringEvent=function StringEvent(){return Object(jsx_runtime.jsx)(RenderMachine,{machine:Button.b,events:"CLICK"})};Machines_stories_StringEvent.displayName="StringEvent";var Machines_stories_ObjectEvent=function ObjectEvent(){return Object(jsx_runtime.jsx)(RenderMachine,{machine:Button.b,events:{type:"CLICK"}})};Machines_stories_ObjectEvent.displayName="ObjectEvent";var Machines_stories_EventsObjectArray=function EventsObjectArray(){return Object(jsx_runtime.jsx)(RenderMachine,{machine:Button.b,options:{services:{onDelete:function onDelete(){return new Promise((function(){}))}}},events:[{type:"CLICK"},{type:"CLICK"}]})};Machines_stories_EventsObjectArray.displayName="EventsObjectArray";var Machines_stories_EventsStringArray=function EventsStringArray(){return Object(jsx_runtime.jsx)(RenderMachine,{machine:Button.b,options:{services:{onDelete:function onDelete(){return new Promise((function(){}))}}},events:["CLICK","CLICK"]})};Machines_stories_EventsStringArray.displayName="EventsStringArray";var Machines_stories_RepeatedEventsArrayWithDelay=function RepeatedEventsArrayWithDelay(){return Object(jsx_runtime.jsx)(RenderMachine,{machine:Button.b,options:{services:{onDelete:function onDelete(){return new Promise((function(){}))}}},events:["CLICK","CLICK","done.invoke.onDelete"],delay:2500,shouldRepeatEvents:!0})};Machines_stories_RepeatedEventsArrayWithDelay.displayName="RepeatedEventsArrayWithDelay";var Machines_stories_EventsFunction=function EventsFunction(){return Object(jsx_runtime.jsx)(RenderMachine,{machine:Button.b,options:{services:{onDelete:function onDelete(){return new Promise((function(){}))}}},events:function events(state){return new Promise((function(resolve){return setTimeout((function(){switch(!0){case state.matches("idle"):case state.matches("confirming"):return resolve("CLICK");case state.matches("deleting"):return resolve("done.invoke.onDelete")}}),2500)}))}})};Machines_stories_EventsFunction.displayName="EventsFunction";var Machines_stories_EventsFunctionWithDelay=function EventsFunctionWithDelay(){return Object(jsx_runtime.jsx)(RenderMachine,{machine:Button.b,options:{services:{onDelete:function onDelete(){return new Promise((function(){}))}}},events:function events(state){switch(!0){case state.matches("idle"):case state.matches("confirming"):return"CLICK";case state.matches("deleting"):return"done.invoke.onDelete"}},delay:2500})};Machines_stories_EventsFunctionWithDelay.displayName="EventsFunctionWithDelay"},656:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var preview_namespaceObject={};__webpack_require__.r(preview_namespaceObject),__webpack_require__.d(preview_namespaceObject,"parameters",(function(){return parameters}));__webpack_require__(36),__webpack_require__(59),__webpack_require__(82),__webpack_require__(639),__webpack_require__(53),__webpack_require__(55),__webpack_require__(640),__webpack_require__(641),__webpack_require__(321);var client_api=__webpack_require__(662),esm=__webpack_require__(4),parameters={xstate:!0};function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(preview_namespaceObject).forEach((function(key){var value=preview_namespaceObject[key];switch(key){case"args":case"argTypes":return esm.a.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(value));case"decorators":return value.forEach((function(decorator){return Object(client_api.b)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return Object(client_api.c)(loader,!1)}));case"parameters":return Object(client_api.d)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return Object(client_api.a)(enhancer)}));case"globals":case"globalTypes":var v={};return v[key]=value,Object(client_api.d)(v,!1);default:return console.log(key+" was not supported :( !")}}))}},[[330,1,2]]]);