/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/custom-page-color.js":
/*!*************************************!*\
  !*** ./src/js/custom-page-color.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_coreData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/coreData */ "@wordpress/coreData");
/* harmony import */ var _wordpress_coreData__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_coreData__WEBPACK_IMPORTED_MODULE_5__);






const PageColor = _ref => {
  let {
    postType,
    postMeta,
    setPostMeta
  } = _ref;
  const colors = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)('core/block-editor').getSettings().colors;
  const [meta, setMeta] = (0,_wordpress_coreData__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'meta');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__.PluginDocumentSettingPanel, {
    name: "ColorField",
    title: "Custom Color",
    initialOpen: "true"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    colors: colors,
    value: postMeta._custom_color,
    onChange: value => setPostMeta({
      _custom_color: value
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.compose)([(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withSelect)(select => {
  return {
    postMeta: select('core/editor').getEditedPostAttribute('meta'),
    postType: select('core/editor').getCurrentPostType()
  };
}), (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withDispatch)(dispatch => {
  return {
    setPostMeta(newMeta) {
      dispatch('core/editor').editPost({
        meta: newMeta
      });
    }
  };
})])(PageColor));

/***/ }),

/***/ "./src/js/filter-animation-options.js":
/*!********************************************!*\
  !*** ./src/js/filter-animation-options.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
//import classnames from 'classnames';
//import NumberControl from 'components';

const {
  assign,
  merge
} = lodash;
const {
  __
} = wp.i18n;
const {
  addFilter,
  useState
} = wp.hooks;
const {
  createHigherOrderComponent
} = wp.compose;
const {
  Fragment
} = wp.element;
const {
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody,
  TextControl,
  SelectControl,
  RangeControl
} = wp.components;
var allowedBlocks = ['core/paragraph', 'core/heading', 'core/image', 'core/html', 'core/button', 'core/site-logo', 'core/group', 'core/post-title', 'core/post-featured-image', 'core/post-navigation-link', 'core/post-template'];

/**
 * Add Speed attribute
 *
 * @param  {Object} settings Original block settings
 * @param  {string} name     Block name
 * @return {Object}          Filtered block settings
 */
function huntsman_addAnimations(settings, name) {
  if (allowedBlocks.includes(name)) {
    return assign({}, settings, {
      attributes: merge(settings.attributes, {
        speed: {
          type: 'string',
          default: ''
        },
        entranceAnimation: {
          type: 'string',
          default: ''
        },
        entranceDelay: {
          type: 'number',
          default: ''
        },
        entranceStagger: {
          type: 'number',
          default: ''
        },
        entranceSpeed: {
          type: 'string',
          default: ''
        }
      })
    });
  }
  return settings;
}
addFilter('blocks.registerBlockType',
// Hook Name
'intro-to-filters/button-block/add-attributes',
// namespace plugin/component-name/what-filter-does
huntsman_addAnimations // function that does the filtering from above
);

/**
 * Add Animations Control
 */
const addInspectorControl = createHigherOrderComponent(BlockEdit => {
  return props => {
    const {
      attributes: {
        speed,
        entranceAnimation,
        entranceSpeed,
        entranceDelay,
        entranceStagger
      },
      setAttributes,
      name
    } = props;
    function handleChange(event) {
      console.log(event);
    }
    if (!allowedBlocks.includes(props.name)) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props);
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      title: __('Animation', 'intro-to-filters'),
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      label: "Scroll Speed",
      type: "number",
      placeholder: "0.5",
      value: speed,
      onChange: value => {
        setAttributes({
          speed: value
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      label: __('Entrance Animation', 'intro-to-filters'),
      value: entranceAnimation,
      options: [{
        label: __('None', 'intro-to-filters'),
        value: 'no-animation'
      }, {
        label: __('Move Up Letters', 'intro-to-filters'),
        value: 'move-down-letters'
      }],
      onChange: value => {
        setAttributes({
          entranceAnimation: value
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      label: __('Entrance Duration (seconds)', 'intro-to-filters'),
      type: "number",
      placeholder: "0.5",
      value: entranceSpeed,
      onChange: value => {
        setAttributes({
          entranceSpeed: value
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      label: __('Entrance Delay (seconds)', 'intro-to-filters'),
      type: "number",
      placeholder: "0.5",
      value: entranceDelay,
      onChange: value => {
        setAttributes({
          entranceDelay: value
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      label: __('Entrance Stagger (seconds)', 'intro-to-filters'),
      type: "number",
      placeholder: "0.5",
      value: entranceStagger,
      onChange: value => {
        setAttributes({
          entranceStagger: value
        });
      }
    }))));
  };
}, 'withInspectorControl');
addFilter('editor.BlockEdit', 'intro-to-filters/button-block/add-inspector-controls', addInspectorControl);

// Apply Our Set Values On Save
function wrapBlocksInAimationWrapper(element, blockType, attributes) {
  // skip if element is undefined
  if (!element) {
    return;
  }
  if (attributes.entranceAnimation === 'none') {
    attributes.entranceAnimation = null;
  }

  // only apply allowed blocks
  if (!allowedBlocks.includes(blockType.name)) {
    return element;
  }

  //if no animation or speed is set, return the element
  if (!attributes.entranceAnimation && !attributes.speed) {
    return element;
  }

  // return the element wrapped in a div
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    "data-scroll": true,
    className: attributes.entranceAnimation,
    "data-scroll-call": attributes.entranceAnimation,
    "data-scroll-speed": attributes.speed || null,
    "data-entrance-speed": attributes.entranceSpeed || null,
    "data-entrance-delay": attributes.entranceDelay || null,
    "data-entrance-stagger": attributes.entranceStagger || null
  }, element);
}
wp.hooks.addFilter('blocks.getSaveElement', 'my-plugin/wrap-cover-block-in-container', wrapBlocksInAimationWrapper);

/***/ }),

/***/ "./src/js/filter-block-link.js":
/*!*************************************!*\
  !*** ./src/js/filter-block-link.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
//import classnames from 'classnames';
//import NumberControl from 'components';

const {
  assign,
  merge
} = lodash;
const {
  __
} = wp.i18n;
const {
  addFilter,
  useState
} = wp.hooks;
const {
  createHigherOrderComponent
} = wp.compose;
const {
  Fragment
} = wp.element;
const {
  InspectorControls,
  InspectorAdvancedControls
} = wp.blockEditor;
const {
  PanelBody,
  TextControl,
  SelectControl,
  RangeControl
} = wp.components;
var disallowedBlocks = [];

/**
 * Add Speed attribute
 *
 * @param  {Object} settings Original block settings
 * @param  {string} name     Block name
 * @return {Object}          Filtered block settings
 */
function huntsman_addBlockLink(settings, name) {
  if (!disallowedBlocks.includes(name)) {
    return assign({}, settings, {
      attributes: merge(settings.attributes, {
        linkValue: {
          type: 'string',
          default: ''
        }
      })
    });
  }
  return settings;
}
addFilter('blocks.registerBlockType',
// Hook Name
'intro-to-filters/button-block/add-attributes',
// namespace plugin/component-name/what-filter-does
huntsman_addBlockLink // function that does the filtering from above
);

/**
 * Add Animations Control
 */
const addInspectorControl = createHigherOrderComponent(BlockEdit => {
  return props => {
    const {
      attributes: {
        linkValue
      },
      setAttributes,
      name
    } = props;
    function handleChange(event) {
      console.log(event);
    }
    if (disallowedBlocks.includes(props.name)) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props);
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorAdvancedControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      label: "Link",
      type: "string",
      placeholder: "https://www.link.com",
      value: linkValue,
      onChange: value => {
        setAttributes({
          linkValue: value
        });
      }
    })));
  };
}, 'withAdvancedInspectorControl');
addFilter('editor.BlockEdit', 'intro-to-filters/button-block/add-inspector-controls', addInspectorControl);

/***/ }),

/***/ "./src/scss/editor.scss":
/*!******************************!*\
  !*** ./src/scss/editor.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/coreData":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/editor.scss */ "./src/scss/editor.scss");
/* harmony import */ var _js_filter_animation_options_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/filter-animation-options.js */ "./src/js/filter-animation-options.js");
/* harmony import */ var _js_filter_block_link_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/filter-block-link.js */ "./src/js/filter-block-link.js");
/* harmony import */ var _js_custom_page_color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/custom-page-color.js */ "./src/js/custom-page-color.js");





//import '/build/block-scroll-text/index.js';
//import '/build/block-icon-filter/index.js'; 

// Register Next Button Style
/**
wp.blocks.registerBlockStyle( 'core/button', {
    name: 'next-button',
    label: 'Next Button'
} );
 */
})();

/******/ })()
;
//# sourceMappingURL=editor.js.map