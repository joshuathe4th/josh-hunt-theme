(()=>{"use strict";const t=window.wp.element,e=window.wp.blocks,o=window.wp.blockEditor;(0,e.registerBlockType)("my-gutenberg-block/scroll-text",{title:"Scroll Text",icon:"editor-textcolor",category:"common",supports:{color:{text:!0,background:!0,link:!0}},attributes:{text:{type:"string",source:"html",selector:"h1"}},edit:e=>{let{attributes:r,setAttributes:l,supports:c}=e;const{text:s}=r;return(0,t.createElement)("div",{class:"loop-container"},(0,t.createElement)(o.RichText,{tagName:"h1",value:s,class:"scroll-text",onChange:t=>{l({text:t})},placeholder:"Enter Heading Text"}))},save:e=>{let{attributes:o}=e;const{text:r}=o;return(0,t.createElement)("div",{class:"loop-container"},(0,t.createElement)("h1",{class:"scroll-text",placeholder:"Enter Heading Text"},r))}})})();