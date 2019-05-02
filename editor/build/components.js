/*!
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SectionsEditor"] = factory();
	else
		root["SectionsEditor"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../editor-components/components/base/editor-element/editor-element.js":
/*!*******************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/base/editor-element/editor-element.js ***!
  \*******************************************************************************************************/
/*! exports provided: eventType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventType", function() { return eventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorElement; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");


const eventType = "ckEditorOperation";

function createEvent(detail) {
  return new CustomEvent(eventType, { detail });
}

class EditorProxy {
  /**
   * @param element
   */
  constructor(element) {
    this.element = element;
    this.operations = [];
  }

  /**
   * Insert a new section.
   *
   * @param section
   *   The section name to insert.
   * @param parent
   *   The parent element.
   * @param position
   *   The position. "end" to append it to the parent, "before" to insert it before the reference element.
   * @param reference
   *   Reference element when using "before" as a position value.
   * @param attributes
   *   A dictionary of attributes that will be applied to the new element.
   */
  insert(section, parent, position, reference = null, attributes = null) {
    this.element.dispatchEvent(
      createEvent({
        operation: "insert",
        section,
        parent,
        position,
        reference,
        attributes
      })
    );
  }

  /**
   * Move an element.
   *
   * @param parent
   *   The new parent element.
   * @param position
   *   The position. "end" to append it to the parent, "before" to insert it before the reference element.
   * @param target
   *   The element to be moved.
   * @param reference
   *   Reference element when using "before" as a position value.
   */
  move(parent, position, target, reference) {
    this.element.dispatchEvent(
      createEvent({
        operation: "move",
        parent,
        position,
        target,
        reference
      })
    );
  }

  /**
   * Replace an element with an a new section.
   *
   * @param section string
   *   The section name to replace the element with.
   * @param target
   *   The target dom element.
   */
  replace(section, target) {
    this.element.dispatchEvent(
      createEvent({
        operation: "replace",
        section,
        target
      })
    );
  }

  /**
   * Remove a given element.
   *
   * @param target
   *   The element to remove.
   */
  remove(target) {
    this.element.dispatchEvent(
      createEvent({
        operation: "remove",
        target
      })
    );
  }

  /**
   * Set attributes of an element.
   *
   * @param target
   *   The target element.
   * @param attr
   *   The dictionary of attributes to be set.
   */
  attributes(target, attr) {
    this.element.dispatchEvent(
      createEvent({
        operation: "attributes",
        target,
        attr
      })
    );
  }

  /**
   * Remove an attribute from an element.
   *
   * @param target
   *   The target element.
   * @param key
   *   The attribute key.
   */
  removeAttribute(target, key) {
    this.element.dispatchEvent(
      createEvent({
        operation: "removeAttribute",
        target,
        key
      })
    );
  }

  /**
   * Swap out an element with another one.
   *
   * @param element
   *   The new element to insert.
   * @param target
   *   The old element to remove.
   */
  swap(element, target) {
    this.element.dispatchEvent(
      createEvent({
        operation: "swap",
        element,
        target
      })
    );
  }
}

/**
 * Event type to communicate with an external user interface.
 */
class RequestInformationEvent extends CustomEvent {
  constructor(type, payload, callback) {
    super(`ck-editor:${type}`, {
      detail: payload,
      bubbles: true,
      composed: true
    });
    this.callback = callback;
  }

  /**
   * Respond to this event.
   *
   * @param detail
   */
  respond(detail) {
    this.callback(detail);
  }
}

/**
 * Base class for editor elements.
 *
 * Provides methods and properties for communicating with the CKEditor5 instance.
 */
class EditorElement extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {
  /**
   * @inheritDoc
   */
  constructor() {
    super();
    this.inEditor = false;
  }

  /**
   * @inheritDoc
   */
  connectedCallback() {
    this.inEditor = !!this.closest(".ck-editor");
    super.connectedCallback();
  }

  /**
   * Change the editors document model.
   *
   * Pass in a callback that will receive an EditorProxy object that
   * contains methods to modify the document.
   *
   * @param callback
   */
  modifyDocument(callback) {
    const editorProxy = new EditorProxy(this);
    callback(editorProxy);
    createEvent({
      operation: "batch",
      operations: editorProxy.operations
    });
  }

  /**
   * Request information from outside systems.
   *
   * @param type String
   *   The type of information required.
   * @param detail Object
   *   Arbitrary additional information.
   * @param callback
   *   Callback that is invoked when information is returned.
   */
  requestInformation(type, detail, callback) {
    this.dispatchEvent(new RequestInformationEvent(type, detail, callback));
  }
}


/***/ }),

/***/ "../../../../../editor-components/components/base/placeholder/index.js":
/*!*******************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/base/placeholder/index.js ***!
  \*******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./placeholder */ "../../../../../editor-components/components/base/placeholder/placeholder.js");



global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-placeholder", _placeholder__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/base/placeholder/placeholder.js":
/*!*************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/base/placeholder/placeholder.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Placeholder; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _raw_loader_placeholder_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./placeholder.css */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/placeholder.css");
/* harmony import */ var _raw_loader_placeholder_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_placeholder_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _raw_loader_icons_close_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! raw-loader!./icons/close.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/close.svg");
/* harmony import */ var _raw_loader_icons_close_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_close_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _raw_loader_icons_carousel_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! raw-loader!./icons/carousel.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/carousel.svg");
/* harmony import */ var _raw_loader_icons_carousel_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_carousel_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _raw_loader_icons_formatted_text_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! raw-loader!./icons/formatted-text.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/formatted-text.svg");
/* harmony import */ var _raw_loader_icons_formatted_text_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_formatted_text_svg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _raw_loader_icons_image_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! raw-loader!./icons/image.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/image.svg");
/* harmony import */ var _raw_loader_icons_image_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_image_svg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _raw_loader_icons_misc_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! raw-loader!./icons/misc.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/misc.svg");
/* harmony import */ var _raw_loader_icons_misc_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_misc_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _raw_loader_icons_text_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! raw-loader!./icons/text.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/text.svg");
/* harmony import */ var _raw_loader_icons_text_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_text_svg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _raw_loader_icons_text_media_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! raw-loader!./icons/text-media.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/text-media.svg");
/* harmony import */ var _raw_loader_icons_text_media_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_text_media_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _raw_loader_icons_video_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! raw-loader!./icons/video.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/video.svg");
/* harmony import */ var _raw_loader_icons_video_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_video_svg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _editor_element_editor_element__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");













const icons = {
  close: _raw_loader_icons_close_svg__WEBPACK_IMPORTED_MODULE_2___default.a,
  formatted_text: _raw_loader_icons_formatted_text_svg__WEBPACK_IMPORTED_MODULE_4___default.a,
  carousel: _raw_loader_icons_carousel_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
  image: _raw_loader_icons_image_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
  misc: _raw_loader_icons_misc_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
  text: _raw_loader_icons_text_svg__WEBPACK_IMPORTED_MODULE_7___default.a,
  text_media: _raw_loader_icons_text_media_svg__WEBPACK_IMPORTED_MODULE_8___default.a,
  video: _raw_loader_icons_video_svg__WEBPACK_IMPORTED_MODULE_9___default.a
};

function icon(section) {
  if (section.svgIcon) {
    return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])([section.svgIcon]);
  }
  if (icons[section.icon]) {
    return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])([icons[section.icon]]);
  }
  return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])([icons.misc]);
}

class Placeholder extends _editor_element_editor_element__WEBPACK_IMPORTED_MODULE_10__["default"] {
  static get properties() {
    return {
      collapsed: { type: Boolean },
      closed: { type: Boolean },
      isOpen: { type: Boolean },
      isExpanded: { type: Boolean },
      sections: { type: String },
      availableSections: { type: Array },
      labelOpen: { type: String },
      labelExpand: { type: String }
    };
  }

  constructor() {
    super();
    this.closed = false;
    this.collapsed = false;
    this.labelOpen = "Add";
    this.labelExpand = "Insert";
    this.sections = [];
    this.availableSections = [];
    this.isOpen = false;
    this.isExpanded = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.requestInformation("available-sections", {}, sections => {
      this.availableSections = sections;
    });
  }

  getSections() {
    return this.availableSections.filter(section =>
      this.sections.split(" ").includes(section.id)
    );
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_raw_loader_placeholder_css__WEBPACK_IMPORTED_MODULE_1___default.a}
      </style>
      ${!this.collapsed || this.isExpanded
        ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
            <div class="ck-placeholder__add-wrapper">
              ${this.closed
                ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                    <button
                      @click="${this.clickOpenHandler}"
                      type="button"
                      class="normalize-button ck-placeholder__add-button"
                    >
                      ${this.labelOpen}
                    </button>
                  `
                : null}
              ${!this.closed || this.isOpen
                ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                    <ul class="normalize-list ck-placeholder__sections-list">
                      ${this.getSections().map(
                        section => lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                          <li class="ck-placeholder__section-item">
                            <button
                              @click="${event =>
                                this.clickSectionHandler(event, section.id)}"
                              type="button"
                              class="normalize-button ck-placeholder__section-button"
                            >
                              <div class="ck-placeholder__icon-wrapper">
                                ${icon(section)}
                              </div>
                              ${section.label}
                            </button>
                          </li>
                        `
                      )}
                    </ul>
                    ${this.isOpen
                      ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                          <button
                            @click="${this.clickCloseHandler}"
                            type="button"
                            class="normalize-button ck-placeholder__close-button"
                          >
                            <div class="ck-placeholder__icon-wrapper">
                              ${icon({ icon: "close" })}
                            </div>
                            <span class="ck-placeholder__close-button-label"
                              >Close</span
                            >
                          </button>
                        `
                      : null}
                  `
                : ""}
            </div>
          `
        : lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
            <div class="ck-placeholder__insert-wrapper">
              <button
                @click="${this.clickExpandHandler}"
                type="button"
                class="normalize-button ck-placeholder__insert-button"
              >
                ${this.labelExpand}
              </button>
            </div>
          `}
    `;
  }

  clickOpenHandler() {
    this.isOpen = !this.isOpen;
  }

  clickExpandHandler() {
    this.isExpanded = !this.isExpanded;
  }

  clickCloseHandler() {
    this.isOpen = false;
  }

  clickSectionHandler(event, sectionId) {
    this.modifyDocument(editor => editor.replace(sectionId, this));
    this.isExpanded = false;
  }
}


/***/ }),

/***/ "../../../../../editor-components/components/button/button.js":
/*!**********************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/button/button.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");



const iconLink = lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"]`
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <path d="M7.8 24c0-3.42 2.78-6.2 6.2-6.2h8V14h-8C8.48 14 4 18.48 4 24s4.48 10 10 10h8v-3.8h-8c-3.42 0-6.2-2.78-6.2-6.2zm8.2 2h16v-4H16v4zm18-12h-8v3.8h8c3.42 0 6.2 2.78 6.2 6.2s-2.78 6.2-6.2 6.2h-8V34h8c5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
</svg>
`;

class Button extends _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static get properties() {
    return {
      target: { type: String, attribute: "link-target" }
    };
  }

  constructor() {
    super();
    this.target = null;
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <div class="button ${this.target ? "linked" : "not-linked"}">
        <div class="button__content">
          <slot></slot>
        </div>
        <button @click="${this.inEditor ? this.selectLink : () => {}}">
          ${iconLink}
        </button>
      </div>
    `;
  }

  selectLink() {
    this.requestInformation("select-link", { target: this.target }, target => {
      if (target !== null) {
        this.modifyDocument(editor =>
          editor.attributes(this, {
            "link-target": target
          })
        );
      } else {
        this.modifyDocument(editor =>
          editor.removeAttribute(this, "link-target")
        );
      }
    });
  }
}

Button.styles = lit_element__WEBPACK_IMPORTED_MODULE_0__["css"]`
  :host {
    --icon-size: 2em;
    --icon-color: black;
    --background-color: #ffbb15;
  }

  .button {
    display: flex;
  }

  .button__content {
    width: 100%;
  }

  .button button {
    width: var(--icon-size);
    border: none;
    background: none;
    flex-grow: 0;
    cursor: pointer;
    transition: transform 0.5s ease;
    outline: none;
  }

  .button svg {
    fill: var(--icon-color);
    width: var(--icon-size);
  }

  .button.not-linked svg {
    opacity: 0.5;
  }
`;


/***/ }),

/***/ "../../../../../editor-components/components/button/index.js":
/*!*********************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/button/index.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button */ "../../../../../editor-components/components/button/button.js");



global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-button", _button__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/container/container.js":
/*!****************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/container/container.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Container; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");



class Container extends _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static get properties() {
    return {
      sections: { type: String, attribute: "ck-contains" },
      numberOfChildren: { type: Number },
      max: { type: Number, attribute: "ck-max" },
      min: { type: Number, attribute: "ck-min" }
    };
  }

  constructor() {
    super();
    this.observer = null;
    this.observer = new MutationObserver(() => this.processChildren());
    this.observer.observe(this, {
      attributes: false,
      childList: true,
      subtree: false
    });
  }

  firstUpdated() {
    this.processChildren();
  }

  connectedCallback() {
    super.connectedCallback();
    this.processChildren();
  }

  processChildren() {
    this.numberOfChildren = Array.from(this.children).filter(
      child => child.nodeName !== "BR"
    ).length;

    if (!this.max) {
      this.max = 0;
    }

    if (!this.min) {
      this.min = 0;
    }

    if (this.numberOfChildren >= this.min) {
      Array.from(this.children).forEach((child, index) => {
        child.dispatchEvent(
          new CustomEvent("containerUpdate", {
            detail: {
              inContainer: true,
              containerSections: this.sections,
              containerIndex: index,
              containerMax: this.max,
              containerItems: this.numberOfChildren || 0
            }
          })
        );
      });
    } else {
      const element = this.sections.split(" ").pop();
      this.modifyDocument(editor => {
        for (let i = this.numberOfChildren; i < this.min; i += 1) {
          editor.insert(element, this, "end");
        }
      });
    }
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <div class="container"><slot></slot></div>
      ${
        this.inEditor && (this.numberOfChildren < this.max || this.max === 0)
          ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
              <ck-placeholder
                @ckEditorOperation="${this.appendHandler}"
                closed="true"
                sections="${this.sections}"
              >
              </ck-placeholder>
            `
          : null
      }
      </ck-placeholder>
    `;
  }

  appendHandler(event) {
    this.modifyDocument(editor =>
      editor.insert(event.detail.section, this, "end")
    );
  }
}


/***/ }),

/***/ "../../../../../editor-components/components/container/index.js":
/*!************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/container/index.js ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container */ "../../../../../editor-components/components/container/container.js");



global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-container", _container__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/gallery/gallery.js":
/*!************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/gallery/gallery.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gallery; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _raw_loader_gallery_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./gallery.css */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/gallery/gallery.css");
/* harmony import */ var _raw_loader_gallery_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_gallery_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _raw_loader_icons_leftArrow_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! raw-loader!./icons/leftArrow.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/gallery/icons/leftArrow.svg");
/* harmony import */ var _raw_loader_icons_leftArrow_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_leftArrow_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _raw_loader_icons_rightArrow_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! raw-loader!./icons/rightArrow.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/gallery/icons/rightArrow.svg");
/* harmony import */ var _raw_loader_icons_rightArrow_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_rightArrow_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _raw_loader_icons_trash_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! raw-loader!./icons/trash.svg */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/gallery/icons/trash.svg");
/* harmony import */ var _raw_loader_icons_trash_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_icons_trash_svg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../base/editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");








class Gallery extends _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_5__["default"] {
  static get properties() {
    return {
      items: Array,
      currentItem: { type: Number, attribute: "ck-current-item" },
      numberOfChildren: { type: Number },
      maxItems: { type: Number, attribute: "ck-max" },
      sections: { type: String, attribute: "ck-contains" }
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentItem = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    const slots = this.shadowRoot;
    slots.addEventListener("slotchange", () => {
      this.numberOfChildren = Array.from(this.children).filter(
        child => child.nodeName !== "BR"
      ).length;
      this.items = Array.from(this.children)
        .filter(child => child.nodeName !== "BR")
        .map((child, index) => ({
          title: index + 1,
          index
        }));
    });

    this.numberOfChildren = Array.from(this.children).filter(
      child => child.nodeName !== "BR"
    ).length;
    this.maxItems = this.maxItems || 0;
    this.items = Array.from(this.children)
      .filter(child => child.nodeName !== "BR")
      .map((child, index) => ({
        title: index + 1,
        index
      }));
    this.setGalleryItem(this.currentItem);
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_raw_loader_gallery_css__WEBPACK_IMPORTED_MODULE_1___default.a}
      </style>

      <div class="ck-gallery">
        <div
          class="ck-gallery__rail"
          style="transform: translateX(${this.currentItem * -100}%)"
        >
          <slot></slot>
          ${this.numberOfChildren < this.maxItems || this.maxItems === 0
            ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                <ck-placeholder
                  @ckEditorOperation="${this.appendHandler}"
                  sections=${this.sections}
                ></ck-placeholder>
              `
            : null}
        </div>

        <div class="ck-gallery__controls">
          <div class="ck-gallery__pager">
            <div class="ck-gallery__dots">
              ${this.items.map(item => this.button(item))}
              ${this.inEditor &&
              (this.numberOfChildren < this.maxItems || this.maxItems === 0)
                ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                    <span
                      @click="${() => this.addItem()}"
                      class="ck-gallery__add ${this.currentItem ===
                      this.numberOfChildren
                        ? "active"
                        : "inactive"}"
                    >
                      +
                    </span>
                  `
                : null}
            </div>
          </div>
          ${this.inEditor
            ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                <div class="ck-gallery__actions">
                  <span>Edit active element</span>
                  <div class="ck-gallery__icons">
                    <div
                      @click="${() => this.moveItem("left")}"
                      data-tooltip="Move element to the left"
                      class="ck-gallery__icon ck-gallery__icon--arrow-left ${this
                        .currentItem === 0 ||
                      this.currentItem === this.items.length
                        ? "disabled"
                        : ""}"
                    >
                      ${Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])([_raw_loader_icons_leftArrow_svg__WEBPACK_IMPORTED_MODULE_2___default.a])}
                    </div>
                    <div
                      @click="${() => this.moveItem("right")}"
                      data-tooltip="Move element to the right"
                      class="ck-gallery__icon ck-gallery__icon--arrow-right ${this
                        .currentItem >=
                      this.items.length - 1
                        ? "disabled"
                        : ""}"
                    >
                      ${Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])([_raw_loader_icons_rightArrow_svg__WEBPACK_IMPORTED_MODULE_3___default.a])}
                    </div>
                    <div
                      @click="${() => this.deleteItem()}"
                      data-tooltip="Delete slide"
                      class="ck-gallery__icon ck-gallery__icon--arrow-trash ${this
                        .items.length === 0 ||
                      this.currentItem === this.numberOfChildren
                        ? "disabled"
                        : ""}"
                    >
                      ${Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])([_raw_loader_icons_trash_svg__WEBPACK_IMPORTED_MODULE_4___default.a])}
                    </div>
                  </div>
                </div>
              `
            : null}
        </div>
      </div>
    `;
  }

  appendHandler(event) {
    this.modifyDocument(editor =>
      editor.insert(event.detail.section, this, "end")
    );
  }

  addItem() {
    this.currentItem = this.items.length;
  }

  deleteItem() {
    if (this.currentItem !== this.numberOfChildren) {
      this.modifyDocument(editor =>
        editor.remove(this.children[this.currentItem])
      );
    }
  }

  moveItem(position) {
    if (
      position === "left" &&
      this.currentItem > 0 &&
      this.currentItem < this.numberOfChildren
    ) {
      this.modifyDocument(editor =>
        editor.move(this, "before", this.currentItem, this.currentItem - 1)
      );
      this.currentItem -= 1;
    }
    if (position === "right" && this.currentItem < this.numberOfChildren - 1) {
      if (this.currentItem < this.numberOfChildren - 2) {
        this.modifyDocument(editor =>
          editor.move(this, "before", this.currentItem, this.currentItem + 2)
        );
      } else {
        this.modifyDocument(editor =>
          editor.move(this, "end", this.currentItem)
        );
      }
      this.currentItem += 1;
    }
  }

  button(item) {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <span
        @click="${() => this.setGalleryItem(item.index)}"
        class="ck-gallery__dot-item ${this.currentItem === item.index
          ? "active"
          : ""}"
        >${item.title}</span
      >
    `;
  }

  setGalleryItem(index) {
    if (this.children.length <= index || !this.children[index]) {
      return;
    }

    // Update image slide
    this.currentItem = index;
  }
}


/***/ }),

/***/ "../../../../../editor-components/components/gallery/index.js":
/*!**********************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/gallery/index.js ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery */ "../../../../../editor-components/components/gallery/gallery.js");



global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-gallery", _gallery__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/media/index.js":
/*!********************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/media/index.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _media__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./media */ "../../../../../editor-components/components/media/media.js");



global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-media", _media__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/media/media.js":
/*!********************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/media/media.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Media; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _raw_loader_media_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./media.css */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/media/media.css");
/* harmony import */ var _raw_loader_media_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_media_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");




const iconSelect = lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"]`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
`;

const iconUpload = lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"]`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
`;

const iconEdit = lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"]`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
`;

const mediaLoader = lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
  <div class="ck-media__loader">
    <div class="ck-media__spinner">
      <div class="ck-media__bounce ck-media__bounce--1"></div>
      <div class="ck-media__bounce ck-media__bounce--2"></div>
      <div class="ck-media__bounce ck-media__bounce--3"></div>
    </div>
  </div>
`;

class Media extends _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static get properties() {
    return {
      loaderIsVisible: Boolean,
      mediaType: { attribute: "data-media-type", type: String },
      mediaUuid: { attribute: "data-media-uuid", type: String },
      mediaDisplay: { attribute: "data-media-display", type: String },
      enableUpload: { attribute: "ck-upload", type: Boolean },
      enableEdit: { attribute: "ck-edit", type: Boolean },
      buttonPosition: { attribute: "ck-button-position", type: String },
      preview: String
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  renderPreview() {
    this.loaderIsVisible = true;
    this.requestInformation(
      "media-preview",
      {
        type: this.mediaType,
        uuid: this.mediaUuid,
        display: this.mediaDisplay
      },
      preview => {
        this.preview = preview;
        this.loaderIsVisible = false;
      }
    );
  }

  updated(properties) {
    this.previewPane = this.shadowRoot.querySelector(".ck-media__preview");
    if (properties.has("mediaUuid") && this.mediaUuid) {
      this.renderPreview();
    }

    if (properties.has("preview") && this.preview) {
      this.previewPane.innerHTML = this.preview;
    }
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_raw_loader_media_css__WEBPACK_IMPORTED_MODULE_1___default.a}
      </style>
      <div class="ck-media">
        <div
          class="ck-media__preview ${this.preview ? "visible" : "hidden"}"
        ></div>
        <div
          class="ck-media__placeholder ${this.preview ? "hidden" : "visible"}"
        ></div>
        ${this.loaderIsVisible ? mediaLoader : null}
        ${this.inEditor
          ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
              <div
                class="ck-media__buttons ${this.buttonPosition ||
                  "bottom-right"}"
              >
                <button class="select" @click=${this.selectHandler}>
                  ${iconSelect}
                </button>
                ${this.enableUpload
                  ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                      <button class="upload" @click=${this.uploadHandler}>
                        ${iconUpload}
                      </button>
                    `
                  : null}
                ${this.enableEdit
                  ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                      <button class="edit" @click=${this.editHandler}>
                        ${iconEdit}
                      </button>
                    `
                  : null}
              </div>
            `
          : null}
      </div>
    `;
  }

  selectHandler() {
    this.requestInformation(
      "media-select",
      {
        type: this.mediaType,
        uuid: this.mediaUuid
      },
      uuid => {
        this.modifyDocument(editor => {
          editor.attributes(this, {
            "data-media-uuid": uuid
          });
        });
      }
    );
  }

  uploadHandler() {
    this.requestInformation(
      "media-upload",
      {
        type: this.mediaType,
        uuid: this.mediaUuid
      },
      uuid => {
        this.mediaUuid = uuid;
      }
    );
  }

  editHandler() {
    this.requestInformation(
      "media-edit",
      {
        type: this.mediaType,
        uuid: this.mediaUuid
      },
      () => {
        this.renderPreview();
      }
    );
  }
}


/***/ }),

/***/ "../../../../../editor-components/components/media_conflict/index.js":
/*!*****************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/media_conflict/index.js ***!
  \*****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _media_conflict__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./media_conflict */ "../../../../../editor-components/components/media_conflict/media_conflict.js");
/* harmony import */ var _media_conflict_option_media_conflict_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./media_conflict_option/media_conflict_option */ "../../../../../editor-components/components/media_conflict/media_conflict_option/media_conflict_option.js");




global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-conflict-media", _media_conflict__WEBPACK_IMPORTED_MODULE_1__["default"]);
global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-conflict-media-option", _media_conflict_option_media_conflict_option__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/media_conflict/media_conflict.css":
/*!***************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/media_conflict/media_conflict.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n}\n\n.media-conflict {\n  position: relative;\n  overflow: hidden;\n  background: rgba(0, 0, 0, 0.5);\n}\n\n.media-conflict ::slotted(ck-conflict-media-option) {\n  line-height: 0;\n  display: block;\n  pointer-events: none;\n}\n\n.media-conflict ::slotted(ck-conflict-media-option:first-child) {\n  position: absolute;\n  left: 0;\n  top: 0;\n  overflow: hidden;\n  z-index: 2;\n  height: 100%;\n  border-right: 3px solid rgb(255, 255, 255);\n}\n\n.media-conflict ::slotted(ck-conflict-media-option:last-child) {\n  float: right;\n  width: 100%;\n}\n"

/***/ }),

/***/ "../../../../../editor-components/components/media_conflict/media_conflict.js":
/*!**************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/media_conflict/media_conflict.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaConflict; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _media_conflict_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./media_conflict.css */ "../../../../../editor-components/components/media_conflict/media_conflict.css");
/* harmony import */ var _media_conflict_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_media_conflict_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");




class MediaConflict extends _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static get properties() {
    return {
      from: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const children = Array.from(this.children);
    children.forEach(item => {
      item.addEventListener(
        "optionSelected",
        this.selectOptionHandler.bind(this)
      );
    });

    this.children.item(0).setAttribute("position", "left");
    this.children.item(1).setAttribute("position", "right");
    this.touchStart = false;

    this.addEventListener("mousedown", this.touchStartHandler, false);
    this.addEventListener("mouseup", this.touchEndHandler, false);
    this.addEventListener("mouseover", this.touchEndHandler, false);
    this.addEventListener("mousemove", this.eventHandler, false);
    this.addEventListener("touchmove", this.eventHandler, false);
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_media_conflict_css__WEBPACK_IMPORTED_MODULE_1___default.a}
      </style>
      <div class="media-conflict">
        <div class="media-conflict-switcher"></div>
        <slot></slot>
      </div>
    `;
  }

  selectOptionHandler(event) {
    this.modifyDocument(editor => editor.swap(event.detail, this));
  }

  touchStartHandler(e) {
    this.touchStart = true;
    this.eventHandler(e);
  }

  touchEndHandler() {
    this.touchStart = false;
  }

  eventHandler(e) {
    if (!this.touchStart) {
      return;
    }
    const { target } = e;
    let x = 0;
    let totalOffsetX = 0;
    const container = target;
    if (container.tagName !== "CK-CONFLICT-MEDIA") {
      return;
    }

    let currentElement = container;

    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    } while ((currentElement = currentElement.offsetParent));

    x = e.pageX - totalOffsetX;

    if (e.type === "touchmove") {
      x = e.touches[0].pageX - totalOffsetX;
    }

    container.getElementsByTagName(
      "ck-conflict-media-option"
    )[0].style.width = `${x}px`;
  }
}

MediaConflict.labels = {
  left: "Left version",
  right: "Right version",
  source: "Source version",
  empty: "Clear"
};


/***/ }),

/***/ "../../../../../editor-components/components/media_conflict/media_conflict_option/media_conflict_option.css":
/*!********************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/media_conflict/media_conflict_option/media_conflict_option.css ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\nbutton {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 3;\n  display: block;\n  pointer-events: auto;\n  border: none;\n  color: white;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: inherit;\n  background: rgba(0, 0, 0, 0.5);\n  padding: 10px 20px;\n  width: 150px;\n}\n\nbutton.left {\n  left: 0;\n}\n\n.media-conflict-option {\n  height: 100%;\n}\n"

/***/ }),

/***/ "../../../../../editor-components/components/media_conflict/media_conflict_option/media_conflict_option.js":
/*!*******************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/media_conflict/media_conflict_option/media_conflict_option.js ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaConflictOption; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _media_conflict_option_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./media_conflict_option.css */ "../../../../../editor-components/components/media_conflict/media_conflict_option/media_conflict_option.css");
/* harmony import */ var _media_conflict_option_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_media_conflict_option_css__WEBPACK_IMPORTED_MODULE_1__);



class MediaConflictOption extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {
  static get properties() {
    return {
      from: { type: String },
      position: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_media_conflict_option_css__WEBPACK_IMPORTED_MODULE_1___default.a}
      </style>
      <div class="media-conflict-option">
        <button class="${this.position}" @click=${this.optionSelected}>
          ${this.from}
        </button>
        <slot></slot>
      </div>
    `;
  }

  firstUpdated() {
    if (this.position === "left") {
      this.style.width = "50%";
      setTimeout(() => {
        this.shadowRoot.querySelector(
          ".media-conflict-option"
        ).style.minWidth = `${this.offsetWidth*2}px`;
      }, 100);
    }
  }

  optionSelected() {
    this.dispatchEvent(
      new CustomEvent("optionSelected", {
        detail: this.children.item(0)
      })
    );
  }
}

MediaConflictOption.labels = {
  left: "Left version",
  right: "Right version",
  source: "Source version",
  empty: "Clear"
};


/***/ }),

/***/ "../../../../../editor-components/components/section/index.js":
/*!**********************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/section/index.js ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./section */ "../../../../../editor-components/components/section/section.js");



global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-section", _section__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/section/section.js":
/*!************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/section/section.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Section; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html */ "../../../../../editor-components/node_modules/lit-html/lit-html.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");





const iconUp = lit_html__WEBPACK_IMPORTED_MODULE_1__["svg"]`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="baseline-arrow_back-24px" transform="translate(24) rotate(90)">
    <path id="Path_91" data-name="Path 91" d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z" fill="#fff"/>
  </g>
</svg>
`;

const iconDown = lit_html__WEBPACK_IMPORTED_MODULE_1__["svg"]`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="baseline-arrow_forward-24px_1_" data-name="baseline-arrow_forward-24px (1)" transform="translate(24) rotate(90)">
    <path id="Path_93" data-name="Path 93" d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" fill="#fff"/>
  </g>
</svg>
`;

const iconDelete = lit_html__WEBPACK_IMPORTED_MODULE_1__["svg"]`
<svg id="icon_delete" data-name="icon delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path id="Path_84" data-name="Path 84" d="M5.889,17.222A1.783,1.783,0,0,0,7.667,19h7.111a1.783,1.783,0,0,0,1.778-1.778V6.556H5.889ZM7.667,8.333h7.111v8.889H7.667Zm6.667-4.444L13.444,3H9l-.889.889H5V5.667H17.444V3.889Z" transform="translate(1 1)" fill="#fff"/>
</svg>
`;

const iconConfigure = lit_html__WEBPACK_IMPORTED_MODULE_1__["svg"]`
<svg id="icon_more_vertical" data-name="icon more vertical" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path id="Path_103" data-name="Path 103" d="M12,8a2,2,0,1,0-2-2A2.006,2.006,0,0,0,12,8Zm0,2a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,10Zm0,6a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,16Z" fill="#fff"/>
</svg>
`;

/**
 * Root element for section templates.
 *
 * Handles container movement and element diffing.
 */
class Section extends _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_3__["default"] {
  static get properties() {
    return {
      // Diffing specific attributes.
      added: { type: Boolean },
      removed: { type: Boolean },

      // Container management.
      inContainer: { type: Boolean },
      containerIndex: { type: Number },
      containerMax: { type: Number },
      containerItems: { type: Number },
      containerSections: { type: String },
      isHovered: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.added = false;
    this.removed = false;

    this.inContainer = false;
    this.containerIndex = 0;
    this.containerItems = 0;
    this.containerSections = false;

    this.addEventListener("containerUpdate", event => {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      this.containerUpdate(event);
    });

    // TODO: Decide if hovered state should be displayed for multiple elements at once.
    // this.addEventListener("mouseover", event => {
    //   this.isHovered = true;
    //   event.stopImmediatePropagation();
    //   event.stopPropagation();
    //   event.preventDefault();
    // });
    //
    // this.addEventListener("mouseout", event => {
    //   this.isHovered = false;
    // });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  handleAccept() {
    if (this.added) {
      this.modifyDocument(editor => editor.removeAttribute(this, "added"));
    } else {
      this.modifyDocument(editor => editor.remove(this));
    }
  }

  handleDecline() {
    if (this.removed) {
      this.modifyDocument(editor => editor.removeAttribute(this, "removed"));
    } else {
      this.modifyDocument(editor => editor.remove(this));
    }
  }

  get containerFirst() {
    return this.containerIndex === 0;
  }

  get containerLast() {
    return this.containerIndex === this.containerItems - 1;
  }

  containerUpdate({
    detail: {
      inContainer,
      containerSections,
      containerIndex,
      containerMax,
      containerItems
    }
  }) {
    this.inContainer = inContainer;
    this.containerSections = containerSections;
    this.containerIndex = containerIndex;
    this.containerMax = containerMax;
    this.containerItems = containerItems;
  }

  upHandler() {
    if (!this.containerFirst) {
      const diff =
        global__WEBPACK_IMPORTED_MODULE_2___default.a.window.scrollY +
        this.parentElement.children[this.containerIndex - 1].offsetTop -
        this.offsetTop;
      global__WEBPACK_IMPORTED_MODULE_2___default.a.scrollTo(0, diff);
      this.modifyDocument(editor =>
        editor.move(
          this.parentElement,
          "before",
          this.containerIndex,
          this.containerIndex - 1
        )
      );
    }
  }

  downHandler() {
    if (!this.containerLast) {
      const diff =
        global__WEBPACK_IMPORTED_MODULE_2___default.a.scrollY +
        (this.containerIndex < this.containerItems - 2
          ? this.parentElement.children[this.containerIndex + 2].offsetTop -
            this.parentElement.children[this.containerIndex + 1].offsetTop
          : this.parentElement.children[this.containerIndex + 1].offsetHeight);
      global__WEBPACK_IMPORTED_MODULE_2___default.a.scrollTo(0, diff);
      this.modifyDocument(editor =>
        editor.move(
          this.parentElement,
          "after",
          this.containerIndex,
          this.containerIndex + 1
        )
      );
    }
  }

  removeHandler() {
    this.modifyDocument(editor => editor.remove(this));
  }

  insertHandler(event) {
    this.modifyDocument(editor =>
      editor.insert(
        event.detail.section,
        this.parentElement,
        "before",
        this.containerIndex
      )
    );
  }

  render() {
    const upButton = lit_html__WEBPACK_IMPORTED_MODULE_1__["html"]`
      <button
        class="up${this.containerFirst ? " disabled" : ""}"
        @click="${() => this.upHandler()}"
      >
        ${iconUp}
      </button>
    `;

    const downButton = lit_html__WEBPACK_IMPORTED_MODULE_1__["html"]`
      <button
        class="up${this.containerLast ? " disabled" : ""}"
        @click="${() => this.downHandler()}"
      >
        ${iconDown}
      </button>
    `;

    return lit_html__WEBPACK_IMPORTED_MODULE_1__["html"]`
      <div class="${this.isHovered ? "hovered" : ""}">
        ${this.inContainer
          ? lit_html__WEBPACK_IMPORTED_MODULE_1__["html"]`
              ${this.containerItems < this.containerMax ||
              this.containerMax === 0
                ? lit_html__WEBPACK_IMPORTED_MODULE_1__["html"]`
                    <ck-placeholder
                      collapsed="true"
                      @ckEditorOperation="${event => this.insertHandler(event)}"
                      sections="${this.containerSections}"
                    ></ck-placeholder>
                  `
                : null}
              ${this.added || this.removed
                ? null
                : lit_html__WEBPACK_IMPORTED_MODULE_1__["html"]`
                    <div class="controls">
                      ${this.containerFirst ? null : upButton}
                      ${this.containerLast ? null : downButton}
                      <button
                        class="remove"
                        @click="${() => this.removeHandler()}"
                      >
                        ${iconDelete}
                      </button>
                      <button class="configure disabled">
                        ${iconConfigure}
                      </button>
                    </div>
                  `}
            `
          : null}
        <div class="${this.inContainer ? "item" : ""}">
          ${this.added || this.removed
            ? lit_html__WEBPACK_IMPORTED_MODULE_1__["html"]`
                <div class="overlay ${this.added ? "added" : "removed"}">
                  <slot></slot>
                  <div class="overlay__background">
                    <div class="actions">
                      <button
                        class="accept"
                        @click=${this.handleAccept.bind(this)}
                      >
                        Accept
                      </button>
                      <button
                        class="decline"
                        @click=${this.handleDecline.bind(this)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              `
            : lit_html__WEBPACK_IMPORTED_MODULE_1__["html"]`
                <slot></slot>
              `}
        </div>
      </div>
    `;
  }
}

Section.styles = lit_element__WEBPACK_IMPORTED_MODULE_0__["css"]`
  :host {
    --button-size: 3em;
    --button-background-color: black;
    --button-foreground-color: white;
    --outline-color: #004adc;
    --color-light-green: rgba(91, 200, 156, 0.3);
    --color-light-red: rgba(215, 34, 34, 0.3);
    --color-green: #5bc89c;
    --color-red: #d72222;
    --highlight-padding: 0px;

    position: relative;
    display: block;
  }

  .overlay {
    position: relative;
  }

  .overlay.removed {
  }

  .overlay__background {
    position: absolute;
    border: 2px solid var(--color-green);
    top: calc(var(--highlight-padding) * -1);
    left: calc(var(--highlight-padding) * -1);
    bottom: calc(var(--highlight-padding) * -1);
    right: calc(var(--highlight-padding) * -1);
    background: var(--color-light-green);
    z-index: 5;
  }

  .removed .overlay__background {
    background: var(--color-light-red);
    border: 2px solid var(--color-red);
  }

  .actions {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    height: 20px;
    margin: auto;
  }

  .overlay:hover .actions {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.35s linear, opacity 0.35s;
  }

  button {
    border: none;
    color: white;
    cursor: pointer;
    font-family: inherit;
    padding: 5px 10px;
  }

  button.accept {
    background-color: var(--color-green);
    margin-right: 20px;
  }

  button.decline {
    background-color: var(--color-red);
  }

  .controls {
    z-index: 1;
    position: absolute;
    right: 0;
    display: flex;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* TODO: Decide if we need a hovered class or :hover is enough. */
  :hover .item {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--outline-color);
  }

  /* TODO: Decide if we need a hovered class or :hover is enough. */
  :hover .controls {
    opacity: 1;
  }

  .controls button {
    border: none;
    background: var(--button-background-color);
    width: var(--button-size);
    height: var(--button-size);
    padding: 2px;
    display: flex;
    cursor: pointer;
  }

  svg {
    width: 100%;
  }

  svg * {
    fill: var(--button-foreground-color);
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: auto;
  }
`;


/***/ }),

/***/ "../../../../../editor-components/components/tabs/icons/pencil.svg":
/*!***************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/tabs/icons/pencil.svg ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <path\n      d=\"M3,17.25V21H6.75L17.81,9.94,14.06,6.19ZM20.71,7.04a1,1,0,0,0,0-1.41L18.37,3.29a1,1,0,0,0-1.41,0L15.13,5.12l3.75,3.75,1.83-1.83Z\"/>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/components/tabs/index.js":
/*!*******************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/tabs/index.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs */ "../../../../../editor-components/components/tabs/tabs.js");



global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-tabs", _tabs__WEBPACK_IMPORTED_MODULE_1__["default"]);
global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-tabs-modal", _tabs__WEBPACK_IMPORTED_MODULE_1__["Modal"]);


/***/ }),

/***/ "../../../../../editor-components/components/tabs/tabs.js":
/*!******************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/tabs/tabs.js ***!
  \******************************************************************************/
/*! exports provided: default, Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html */ "../../../../../editor-components/node_modules/lit-html/lit-html.js");
/* harmony import */ var _raw_loader_tabs_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! raw-loader!./tabs.css */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/tabs/tabs.css");
/* harmony import */ var _raw_loader_tabs_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_tabs_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _raw_loader_modal_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! raw-loader!./modal.css */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/tabs/modal.css");
/* harmony import */ var _raw_loader_modal_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_modal_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons_pencil_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/pencil.svg */ "../../../../../editor-components/components/tabs/icons/pencil.svg");
/* harmony import */ var _icons_pencil_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_icons_pencil_svg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../base/editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");







class Tabs extends _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_5__["default"] {
  static get properties() {
    return {
      sections: { type: String, attribute: "ck-contains" },
      items: Array,
      numberOfChildren: Number,
      currentTab: Number,
      modalIsOpen: Boolean
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentTab = 0;
    this.modalIsOpen = false;
    this.section = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.ownerDocument.body.querySelector("#ck-tabs-modal")) {
      this.modal = this.ownerDocument.body.querySelector("#ck-tabs-modal");
    } else {
      this.modal = this.ownerDocument.createElement("div");
      this.modal.setAttribute("id", "ck-tabs-modal");
      this.ownerDocument.body.appendChild(this.modal);
    }

    const observer = new MutationObserver(() => this.processItems());
    observer.observe(this, {
      attributes: true,
      childList: true,
      subtree: true
    });

    this.processItems();

    this.numberOfChildren = Array.from(this.children).filter(
      node => node.nodeName !== "BR"
    ).length;
    if (this.numberOfChildren > 0) {
      this.currentTab = 0;
    }
  }

  processItems() {
    this.items = Array.from(this.children)
      .filter(child => child.nodeName !== "BR")
      .map((child, index) => {
        return {
          title:
            (child.dataset.titleAttribute
              ? child.getAttribute(child.dataset.titleAttribute)
              : null) ||
            child.dataset.tabTitle ||
            "Untitled Tab",
          default: child.dataset.defaultTab,
          index
        };
      });
    this.setTabsItem(this.currentTab);
    this.numberOfChildren = Array.from(this.children).filter(
      node => node.nodeName !== "BR"
    ).length;
  }

  openModal() {
    this.modalIsOpen = true;
    Object(lit_html__WEBPACK_IMPORTED_MODULE_1__["render"])(this.renderModal(), this.modal);
  }

  closeModal() {
    this.modalIsOpen = false;
    Object(lit_html__WEBPACK_IMPORTED_MODULE_1__["render"])(this.renderModal(), this.modal);
  }

  renderModal() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <ck-tabs-modal
        @eventCloseModal="${() => {
          this.closeModal();
        }}"
        @eventSaveModal="${e => {
          this.updateItem(e.detail);
        }}"
        @deleteTab="${() => this.deleteItem()}"
        currentTitle="${this.items[this.currentTab].title}"
        currentDefault="${this.items[this.currentTab].default}"
        currentIndex="${this.currentTab}"
        data-visible="${this.modalIsOpen ? "true" : "false"}"
      >
      </ck-tabs-modal>
    `;
  }

  appendHandler(event) {
    this.modifyDocument(editor =>
      editor.insert(event.detail.section, this, "end")
    );
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ::slotted(*) {
          display: none !important;
        }
        ::slotted(:nth-child(${this.currentTab + 1})) {
          display: block !important;
        }
        ${_raw_loader_tabs_css__WEBPACK_IMPORTED_MODULE_2___default.a}
      </style>
      <div class="ck-tabs">
        <div class="ck-tabs__header">
          <ul class="ck-tabs__header-tab-list">
            ${this.items.map(item => this.tabTitle(item))}
            ${this.inEditor
              ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                  <li
                    @click="${() => this.addItem()}"
                    class="ck-tabs__header-tab-add"
                  ></li>
                `
              : null}
          </ul>
        </div>
        <div class="ck-tabs__content">
          <slot></slot>
          ${this.inEditor && this.currentTab === this.numberOfChildren
            ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                <ck-placeholder
                  @ckEditorOperation="${this.appendHandler}"
                  sections="${this.sections}"
                >
                </ck-placeholder>
              `
            : null}
        </div>
      </div>
    `;
  }

  tabTitle(item) {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <li
        @click="${() => this.setTabsItem(item.index)}"
        class="ck-tabs__header-tab-item ${this.currentTab === item.index
          ? "active"
          : ""}
        ${item.default === "true" ? "default" : ""}"
      >
        ${item.title}
        ${this.inEditor
          ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
              <span
                @click="${() => this.openModal(item)}"
                class="ck-tabs__header-icon"
              >
                ${Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])([_icons_pencil_svg__WEBPACK_IMPORTED_MODULE_4___default.a])}
              </span>
            `
          : null}
      </li>
    `;
  }

  deleteItem() {
    if (this.items.length >= 2) {
      this.modifyDocument(editor =>
        editor.remove(this.children[this.currentTab])
      );
      if (this.currentTab === this.items.length - 1) {
        this.currentTab -= 1;
      }
    }
  }

  setTabsItem(index) {
    if (this.children.length <= index || !this.children[index]) {
      return;
    }
    this.currentTab = index;
  }

  addItem() {
    this.currentTab = this.items.length;
  }

  updateItem(item) {
    this.modifyDocument(editor =>
      editor.attributes(this.children[item.index], {
        "data-tab-title": item.title,
        "data-default-tab": item.default
      })
    );
    if (item.default) {
      Array.from(this.children)
        .filter(
          child =>
            child.dataset.defaultTab === "true" &&
            child !== this.children[item.index]
        )
        .forEach(child =>
          this.modifyDocument(editor =>
            editor.attributes(child, { "data-default-tab": "false" })
          )
        );
    }
  }
}

class Modal extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {
  static get properties() {
    return {
      isVisible: { type: Boolean, reflect: true },
      inputText: String,
      items: Array,
      isDefault: Boolean,
      currentDefault: String,
      currentIndex: String,
      currentTitle: String
    };
  }

  constructor() {
    super();
    this.isVisible = false;
    this.inputText = "";
    this.isDefault = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const self = this;
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === "attributes") {
          if (self.dataset.visible === "true") {
            self.isVisible = true;
            self.isDefault = self.currentDefault === "true";
            self.inputText = self.currentTitle;
          }
        }
      });
    });

    observer.observe(self, {
      attributes: true,
      childList: true,
      subtree: false
    });

    self.isDefault = self.currentDefault === "true";
    self.isVisible = self.dataset.visible === "true";
  }

  closeModal() {
    this.dispatchEvent(new Event("eventCloseModal"));
    this.isVisible = false;
  }

  handleInput(e) {
    this.inputText = e.target.value;
  }

  saveModal() {
    const response = {
      index: this.currentIndex,
      title: this.inputText,
      default: this.isDefault
    };
    this.dispatchEvent(new CustomEvent("eventSaveModal", { detail: response }));
    this.closeModal();
  }

  handleSwitch(e) {
    this.isDefault = e.target.checked;
  }

  deleteTab() {
    this.dispatchEvent(
      new CustomEvent("deleteTab", { detail: this.currentTab })
    );
    this.closeModal();
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_raw_loader_modal_css__WEBPACK_IMPORTED_MODULE_3___default.a}
      </style>
      <div class="modal ${this.isVisible ? "visible" : ""}">
        <div class="modal__item">
          <h3 class="modal__title">Edit tab</h3>
          <div class="modal__content">
            <label class="modal__label" for="${this.currentIndex}">
              Variation name
            </label>
            <input
              class="modal__input"
              id="${this.currentIndex}"
              @input=${this.handleInput}
              .value=${this.currentTitle}
            />
            <div class="modal__toggle">
              <label class="switch">
                <input
                  type="checkbox"
                  .checked="${this.isDefault}"
                  @input="${e => this.handleSwitch(e)}"
                />
                <span class="slider"></span>
              </label>
              <span class="modal__toggle-label">Set as default</span>
            </div>
          </div>
          <div class="modal__actions">
            <div class="modal__action-wrap-delete">
              <span
                class="modal__action modal__action--delete"
                @click="${() => this.deleteTab()}"
              >
                Delete
              </span>
            </div>
            <span class="modal__action" @click="${() => this.closeModal()}">
              Cancel
            </span>
            <span
              class="modal__action modal__action--primary"
              @click="${() => this.saveModal()}"
            >
              save
            </span>
          </div>
        </div>
      </div>
    `;
  }
}


/***/ }),

/***/ "../../../../../editor-components/components/text_conflict/index.js":
/*!****************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/text_conflict/index.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _text_conflict__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text_conflict */ "../../../../../editor-components/components/text_conflict/text_conflict.js");
/* harmony import */ var _text_conflict_option_text_conflict_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text_conflict_option/text_conflict_option */ "../../../../../editor-components/components/text_conflict/text_conflict_option/text_conflict_option.js");




global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-conflict-text", _text_conflict__WEBPACK_IMPORTED_MODULE_1__["default"]);
global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-conflict-option", _text_conflict_option_text_conflict_option__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/text_conflict/text_conflict.css":
/*!*************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/text_conflict/text_conflict.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  --color-red: #ff0000;\n  --color-grey-light: #ccc;\n}\n.text-conflict {\n  position: relative;\n}\nspan {\n  cursor: pointer;\n}\nspan.resolve {\n  text-decoration: underline;\n  text-decoration-color: var(--color-red);\n}\n.text-conflict__options {\n  visibility: hidden;\n  z-index: 5;\n  opacity: 0;\n  max-width: 400px;\n  background: white;\n  box-shadow: 0px 0px 5px var(--color-grey-light);\n  border-radius: 3px;\n  position: absolute;\n  top: 0;\n}\n.visible {\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1);\n  transition: visibility 0s linear 0s,opacity .35s 0s,transform .35s;\n}\n"

/***/ }),

/***/ "../../../../../editor-components/components/text_conflict/text_conflict.js":
/*!************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/text_conflict/text_conflict.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextConflict; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _text_conflict_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text_conflict.css */ "../../../../../editor-components/components/text_conflict/text_conflict.css");
/* harmony import */ var _text_conflict_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_text_conflict_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/editor-element/editor-element */ "../../../../../editor-components/components/base/editor-element/editor-element.js");




class TextConflict extends _base_editor_element_editor_element__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static get properties() {
    return {
      label: { type: String },
      resolved: { type: Boolean },
      isResolving: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.label = TextConflict.label;
    this.resolved = false;
    this.isResolving = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const children = Array.from(this.children);

    children.forEach(item =>
      item.addEventListener(
        "optionSelected",
        this.selectOptionHandler.bind(this)
      )
    );

    // Click outside handler.
    document.addEventListener("click", e => {
      if (!this.contains(e.target) && this.isResolving) {
        this.isResolving = false;
      }
    });
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_text_conflict_css__WEBPACK_IMPORTED_MODULE_1___default.a}
      </style>
      <div class="text-conflict">
        <span
          class="text-conflict__label ${!this.resolved ? "resolve" : ""}"
          @click=${this.clickResolvingHandler}
          >${this.label}</span
        >
        <div
          class="text-conflict__options ${this.isResolving ? "visible" : ""}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }

  clickResolvingHandler() {
    this.isResolving = true;
  }

  selectOptionHandler(event) {
    this.resolved = true;
    this.isResolving = false;
    this.modifyDocument(editor => editor.swap(event.detail, this));
  }
}

TextConflict.label = "Conflict needs resolving";


/***/ }),

/***/ "../../../../../editor-components/components/text_conflict/text_conflict_option/text_conflict_option.css":
/*!*****************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/text_conflict/text_conflict_option/text_conflict_option.css ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  --color-grey-light: #ccc;\n  --color-grey-dark: #515151;\n}\n.option {\n  display: flex;\n  border-bottom: 1px solid var(--color-grey-light);\n  cursor: pointer;\n  align-items: center;\n}\n\n.option:hover {\n  background-color: #f6f6f6;\n  transition: background-color .35s linear 0s;\n}\n\n.option > span {\n  padding: 5px;\n  display: inline-block;\n}\n\n.option > span.option__label {\n  width: 150px;\n  color: var(--color-grey-dark);\n  padding: 25px 10px;\n  font-size: 14px;\n}\n.option > span.option__content {\n  padding: 0 20px;\n  text-align: left;\n}\n"

/***/ }),

/***/ "../../../../../editor-components/components/text_conflict/text_conflict_option/text_conflict_option.js":
/*!****************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/text_conflict/text_conflict_option/text_conflict_option.js ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextConflictOption; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _text_conflict_option_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text_conflict_option.css */ "../../../../../editor-components/components/text_conflict/text_conflict_option/text_conflict_option.css");
/* harmony import */ var _text_conflict_option_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_text_conflict_option_css__WEBPACK_IMPORTED_MODULE_1__);



class TextConflictOption extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {
  static get properties() {
    return {
      from: { type: String },
      content: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // TODO: Keep span markup, but drop block elements.
    this.content = this.innerText;
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_text_conflict_option_css__WEBPACK_IMPORTED_MODULE_1___default.a}
      </style>
      <div class="option" @click="${this.optionSelected}">
        <span class="option__label"
          >${TextConflictOption.labels[this.from]}</span
        >
        <span class="option__content">${this.content}</span>
      </div>
    `;
  }

  optionSelected() {
    this.dispatchEvent(
      new CustomEvent("optionSelected", {
        detail: this.children.item(0)
      })
    );
  }
}

TextConflictOption.labels = {
  left: "Left version",
  right: "Right version",
  source: "Source version",
  empty: "Clear"
};



/***/ }),

/***/ "../../../../../editor-components/components/textfield/index.js":
/*!************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/textfield/index.js ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global */ "../../../../../editor-components/node_modules/global/window.js");
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _textfield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./textfield */ "../../../../../editor-components/components/textfield/textfield.js");



global__WEBPACK_IMPORTED_MODULE_0___default.a.customElements.define("ck-textfield", _textfield__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../../../../../editor-components/components/textfield/textfield.js":
/*!****************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/components/textfield/textfield.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextField; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../../../../../editor-components/node_modules/lit-element/lit-element.js");
/* harmony import */ var _raw_loader_textfield_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./textfield.css */ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/textfield/textfield.css");
/* harmony import */ var _raw_loader_textfield_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_raw_loader_textfield_css__WEBPACK_IMPORTED_MODULE_1__);



class TextField extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {
  static get properties() {
    return {
      pattern: { attribute: "ck-pattern", type: String },
      hasPatternError: { type: Boolean },
      errorMessage: { attribute: "ck-error-message", type: String },
      minLength: { attribute: "ck-min", type: Number },
      maxLength: { attribute: "ck-max", type: Number },
      hasLengthError: { type: Boolean },
      hasHelper: { type: Boolean },
      helper: { attribute: "ck-message-helper", type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();


    this.querySelectorAll(["[contenteditable]"]).forEach(el => {
      const observer = new MutationObserver(this.validate);
      observer.observe(el, {
        childList: true,
        subtree: true,
        characterData: true
      });

      el.addEventListener("focus", this.setHelper.bind(this));
      el.addEventListener("blur", () => {
        this.validate();
        this.hasHelper = false;
      });

      if (this.maxLength && !this.minLength) {
        el.addEventListener("input", this.handleMax.bind(this));
      }
      if (this.maxLength && this.minLength) {
        el.addEventListener("input", this.rangeValidation.bind(this));
      }
    });

    // textfield errors immediately highlighted
    if (TextField.initializeWithErrors) this.validate();
  }

  handleMax() {
    this.helper = `${this.maxLength -
      this.innerText.length} letters remaining.`;
    this.setHelper();
    this.maxValidation();
  }

  validate() {
    if (!this.innerText) return;
    // MAX
    if (this.hasAttribute("ck-max")) this.maxValidation();
    // MIN
    if (this.hasAttribute("ck-min")) this.minValidation();
    // Range
    if (this.hasAttribute("ck-max") && this.hasAttribute("ck-min"))
      this.rangeValidation();
    // Pattern
    if (this.hasAttribute("ck-pattern")) this.patternValidation();
  }

  maxValidation() {
    if (this.innerText.length > this.maxLength && !this.minLength) {
      if (!this.errorMessage) {
        this.errorMessage = `Please enter no more than 
          ${this.maxLength} letters.`;
      }
      this.hasLengthError = true;
    } else {
      this.hasLengthError = false;
    }
    this.setHelper();
  }

  minValidation() {
    if (this.innerText.length < this.minLength) {
      if (!this.errorMessage) {
        this.errorMessage = `Please enter at least 
          ${this.minLength} letters.`;
      }
      this.hasLengthError = true;
    } else {
      this.hasLengthError = false;
    }
  }

  rangeValidation() {
    if (
      this.innerText.length > this.minLength &&
      this.innerText.length < this.maxLength
    ) {
      this.hasLengthError = false;
    } else {
      if (!this.errorMessage) {
        this.errorMessage = `Please enter ${this.minLength} to ${
          this.maxLength
        } letters.`;
      }
      this.hasLengthError = true;
    }
  }

  patternValidation() {
    const pattern = new RegExp(this.pattern);
    if (pattern.test(this.innerText)) {
      this.hasPatternError = false;
    } else {
      this.hasPatternError = true;
    }
  }

  setHelper() {
    if (this.helper) {
      if (!this.hasPatternError && !this.hasLengthError) {
        this.hasHelper = true;
      } else {
        this.hasHelper = false;
      }
    }
  }

  render() {
    return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
      <style>
        ${_raw_loader_textfield_css__WEBPACK_IMPORTED_MODULE_1___default.a}
      </style>

      <div
        class="ck-textfield ${this.hasPatternError || this.hasLengthError
          ? "error"
          : ""}"
      >
        ${this.hasHelper
          ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
              <div class="ck-tooltip ck-tooltip--helper">${this.helper}</div>
            `
          : null}
        ${this.hasLengthError
          ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
              <div class="ck-tooltip ck-tooltip--error">
                ${this.errorMessage ? this.errorMessage : "Length error"}
              </div>
            `
          : null}
        ${this.hasPatternError
          ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
              <div class="ck-tooltip ck-tooltip--error">
                ${this.errorMessage ? this.errorMessage : "Pattern error"}
              </div>
            `
          : null}
        <div
          class="${this.hasPatternError || this.hasLengthError
            ? "is-valid"
            : "is-invalid"}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

// Static flag if textfield errors should be highlighted immediately.
// If set to false, errors are highlighted after focus is lost for the first time.
TextField.initializeWithErrors = false;


/***/ }),

/***/ "../../../../../editor-components/node_modules/global/window.js":
/*!************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/global/window.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../smart-be/packages/drupal/ckeditor5_sections/editor/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-element/lib/css-tag.js":
/*!**********************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-element/lib/css-tag.js ***!
  \**********************************************************************************************/
/*! exports provided: supportsAdoptingStyleSheets, CSSResult, unsafeCSS, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsAdoptingStyleSheets", function() { return supportsAdoptingStyleSheets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSResult", function() { return CSSResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsafeCSS", function() { return unsafeCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
            // is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
/**
 * Wrap a value for interpolation in a css tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => {
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's `style` property to
 * set element styles. For security reasons, only literal string values may be
 * used. To incorporate non-literal values `unsafeCSS` may be used inside a
 * template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};
//# sourceMappingURL=css-tag.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-element/lib/decorators.js":
/*!*************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-element/lib/decorators.js ***!
  \*************************************************************************************************/
/*! exports provided: customElement, property, query, queryAll, eventOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customElement", function() { return customElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "property", function() { return property; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryAll", function() { return queryAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventOptions", function() { return eventOptions; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
    window.customElements.define(tagName, clazz);
    // Cast as any because TS doesn't recognize the return type as being a
    // subtype of the decorated class when clazz is typed as
    // `Constructor<HTMLElement>` for some reason.
    // `Constructor<HTMLElement>` is helpful to make sure the decorator is
    // applied to elements however.
    // tslint:disable-next-line:no-any
    return clazz;
};
const standardCustomElement = (tagName, descriptor) => {
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        // This callback is called once the class is otherwise fully defined
        finisher(clazz) {
            window.customElements.define(tagName, clazz);
        }
    };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * @param tagName the name of the custom element to define
 */
const customElement = (tagName) => (classOrDescriptor) => (typeof classOrDescriptor === 'function') ?
    legacyCustomElement(tagName, classOrDescriptor) :
    standardCustomElement(tagName, classOrDescriptor);
const standardProperty = (options, element) => {
    // When decorating an accessor, pass it through and add property metadata.
    // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
    // stomp over the user's accessor.
    if (element.kind === 'method' && element.descriptor &&
        !('value' in element.descriptor)) {
        return Object.assign({}, element, { finisher(clazz) {
                clazz.createProperty(element.key, options);
            } });
    }
    else {
        // createProperty() takes care of defining the property, but we still
        // must return some kind of descriptor, so return a descriptor for an
        // unused prototype field. The finisher calls createProperty().
        return {
            kind: 'field',
            key: Symbol(),
            placement: 'own',
            descriptor: {},
            // When @babel/plugin-proposal-decorators implements initializers,
            // do this instead of the initializer below. See:
            // https://github.com/babel/babel/issues/9260 extras: [
            //   {
            //     kind: 'initializer',
            //     placement: 'own',
            //     initializer: descriptor.initializer,
            //   }
            // ],
            // tslint:disable-next-line:no-any decorator
            initializer() {
                if (typeof element.initializer === 'function') {
                    this[element.key] = element.initializer.call(this);
                }
            },
            finisher(clazz) {
                clazz.createProperty(element.key, options);
            }
        };
    }
};
const legacyProperty = (options, proto, name) => {
    proto.constructor
        .createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A `PropertyDeclaration` may optionally be
 * supplied to configure property features.
 *
 * @ExportDecoratedItems
 */
function property(options) {
    // tslint:disable-next-line:no-any decorator
    return (protoOrDescriptor, name) => (name !== undefined) ?
        legacyProperty(options, protoOrDescriptor, name) :
        standardProperty(options, protoOrDescriptor);
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 */
const query = _query((target, selector) => target.querySelector(selector));
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 */
const queryAll = _query((target, selector) => target.querySelectorAll(selector));
const legacyQuery = (descriptor, proto, name) => {
    Object.defineProperty(proto, name, descriptor);
};
const standardQuery = (descriptor, element) => ({
    kind: 'method',
    placement: 'prototype',
    key: element.key,
    descriptor,
});
/**
 * Base-implementation of `@query` and `@queryAll` decorators.
 *
 * @param queryFn exectute a `selector` (ie, querySelector or querySelectorAll)
 * against `target`.
 * @suppress {visibility} The descriptor accesses an internal field on the
 * element.
 */
function _query(queryFn) {
    return (selector) => (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            get() {
                return queryFn(this.renderRoot, selector);
            },
            enumerable: true,
            configurable: true,
        };
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
const standardEventOptions = (options, element) => {
    return Object.assign({}, element, { finisher(clazz) {
            Object.assign(clazz.prototype[element.key], options);
        } });
};
const legacyEventOptions = 
// tslint:disable-next-line:no-any legacy decorator
(options, proto, name) => {
    Object.assign(proto[name], options);
};
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifis event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 *
 *     class MyElement {
 *
 *       clicked = false;
 *
 *       render() {
 *         return html`<div @click=${this._onClick}`><button></button></div>`;
 *       }
 *
 *       @eventOptions({capture: true})
 *       _onClick(e) {
 *         this.clicked = true;
 *       }
 *     }
 */
const eventOptions = (options) => 
// Return value typed as any to prevent TypeScript from complaining that
// standard decorator function signature does not match TypeScript decorator
// signature
// TODO(kschaaf): unclear why it was only failing on this decorator and not
// the others
((protoOrDescriptor, name) => (name !== undefined) ?
    legacyEventOptions(options, protoOrDescriptor, name) :
    standardEventOptions(options, protoOrDescriptor));
//# sourceMappingURL=decorators.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-element/lib/updating-element.js":
/*!*******************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-element/lib/updating-element.js ***!
  \*******************************************************************************************************/
/*! exports provided: defaultConverter, notEqual, UpdatingElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultConverter", function() { return defaultConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notEqual", function() { return notEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatingElement", function() { return UpdatingElement; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const microtaskPromise = Promise.resolve(true);
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const STATE_HAS_CONNECTED = 1 << 5;
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this._updateState = 0;
        this._instanceProperties = undefined;
        this._updatePromise = microtaskPromise;
        this._hasConnectedResolver = undefined;
        /**
         * Map with keys for any properties that have changed since the last
         * update cycle with previous values.
         */
        this._changedProperties = new Map();
        /**
         * Map with keys of properties that should be reflected when updated.
         */
        this._reflectingProperties = undefined;
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        Object.defineProperty(this.prototype, name, {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                // tslint:disable-next-line:no-any no symbol in index
                return this[key];
            },
            set(value) {
                // tslint:disable-next-line:no-any no symbol in index
                const oldValue = this[name];
                // tslint:disable-next-line:no-any no symbol in index
                this[key] = value;
                this.requestUpdate(name, oldValue);
            },
            configurable: true,
            enumerable: true
        });
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) &&
            this.finalized) {
            return;
        }
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (typeof superCtor.finalize === 'function') {
            superCtor.finalize();
        }
        this.finalized = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._saveInstanceProperties();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        this._updateState = this._updateState | STATE_HAS_CONNECTED;
        // Ensure connection triggers an update. Updates cannot complete before
        // connection and if one is pending connection the `_hasConnectionResolver`
        // will exist. If so, resolve it to complete the update, otherwise
        // requestUpdate.
        if (this._hasConnectedResolver) {
            this._hasConnectedResolver();
            this._hasConnectedResolver = undefined;
        }
        else {
            this.requestUpdate();
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor._classProperties.get(propName) || defaultPropertyDeclaration;
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        let shouldRequestUpdate = true;
        // if we have a property key, perform property update steps.
        if (name !== undefined && !this._changedProperties.has(name)) {
            const ctor = this.constructor;
            const options = ctor._classProperties.get(name) || defaultPropertyDeclaration;
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                // track old value when changing.
                this._changedProperties.set(name, oldValue);
                // add to reflecting properties set
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
                // abort the request if the property should not be considered changed.
            }
            else {
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._enqueueUpdate();
        }
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        // Mark state updating...
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        let resolve;
        const previousUpdatePromise = this._updatePromise;
        this._updatePromise = new Promise((res) => resolve = res);
        // Ensure any previous update has resolved before updating.
        // This `await` also ensures that property changes are batched.
        await previousUpdatePromise;
        // Make sure the element has connected before updating.
        if (!this._hasConnected) {
            await new Promise((res) => this._hasConnectedResolver = res);
        }
        // Allow `performUpdate` to be asynchronous to enable scheduling of updates.
        const result = this.performUpdate();
        // Note, this is to avoid delaying an additional microtask unless we need
        // to.
        if (result != null &&
            typeof result.then === 'function') {
            await result;
        }
        resolve(!this._hasRequestedUpdate);
    }
    get _hasConnected() {
        return (this._updateState & STATE_HAS_CONNECTED);
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update.
     *
     * You can override this method to change the timing of updates. For instance,
     * to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        if (this.shouldUpdate(this._changedProperties)) {
            const changedProperties = this._changedProperties;
            this.update(changedProperties);
            this._markUpdated();
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
        else {
            this._markUpdated();
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. This getter can be implemented to
     * await additional state. For example, it is sometimes useful to await a
     * rendered element before fulfilling this Promise. To do this, first await
     * `super.updateComplete` then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement.finalized = true;
//# sourceMappingURL=updating-element.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-element/lit-element.js":
/*!**********************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-element/lit-element.js ***!
  \**********************************************************************************************/
/*! exports provided: defaultConverter, notEqual, UpdatingElement, customElement, property, query, queryAll, eventOptions, html, svg, TemplateResult, SVGTemplateResult, supportsAdoptingStyleSheets, CSSResult, unsafeCSS, css, LitElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LitElement", function() { return LitElement; });
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-html */ "../../../../../editor-components/node_modules/lit-html/lit-html.js");
/* harmony import */ var lit_html_lib_shady_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/lib/shady-render */ "../../../../../editor-components/node_modules/lit-html/lib/shady-render.js");
/* harmony import */ var _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/updating-element.js */ "../../../../../editor-components/node_modules/lit-element/lib/updating-element.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultConverter", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__["defaultConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notEqual", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__["notEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UpdatingElement", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__["UpdatingElement"]; });

/* harmony import */ var _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/decorators.js */ "../../../../../editor-components/node_modules/lit-element/lib/decorators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customElement", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["customElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "property", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["property"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "query", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["query"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryAll", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["queryAll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventOptions", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["eventOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__["svg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__["TemplateResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__["SVGTemplateResult"]; });

/* harmony import */ var _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/css-tag.js */ "../../../../../editor-components/node_modules/lit-element/lib/css-tag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "supportsAdoptingStyleSheets", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["supportsAdoptingStyleSheets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSResult", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["CSSResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unsafeCSS", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["unsafeCSS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "css", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["css"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.0.1');
/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */
function arrayFlat(styles, result = []) {
    for (let i = 0, length = styles.length; i < length; i++) {
        const value = styles[i];
        if (Array.isArray(value)) {
            arrayFlat(value, result);
        }
        else {
            result.push(value);
        }
    }
    return result;
}
/** Deeply flattens styles array. Uses native flat if available. */
const flattenStyles = (styles) => styles.flat ? styles.flat(Infinity) : arrayFlat(styles);
class LitElement extends _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__["UpdatingElement"] {
    /** @nocollapse */
    static finalize() {
        super.finalize();
        // Prepare styling that is stamped at first render time. Styling
        // is built from user provided `styles` or is inherited from the superclass.
        this._styles =
            this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ?
                this._getUniqueStyles() :
                this._styles || [];
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Take care not to call `this.styles` multiple times since this generates
        // new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.styles;
        const styles = [];
        if (Array.isArray(userStyles)) {
            const flatStyles = flattenStyles(userStyles);
            // As a performance optimization to avoid duplicated styling that can
            // occur especially when composing via subclassing, de-duplicate styles
            // preserving the last item in the list. The last item is kept to
            // try to preserve cascade order with the assumption that it's most
            // important that last added styles override previous styles.
            const styleSet = flatStyles.reduceRight((set, s) => {
                set.add(s);
                // on IE set.add does not return the set.
                return set;
            }, new Set());
            // Array.from does not work on Set in IE
            styleSet.forEach((v) => styles.unshift(v));
        }
        else if (userStyles) {
            styles.push(userStyles);
        }
        return styles;
    }
    /**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */
    initialize() {
        super.initialize();
        this.renderRoot = this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
    }
    /**
     * Applies styling to the element shadowRoot using the `static get styles`
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (_lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["supportsAdoptingStyleSheets"]) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        super.update(changedProperties);
        const templateResult = this.render();
        if (templateResult instanceof lit_html__WEBPACK_IMPORTED_MODULE_0__["TemplateResult"]) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render() {
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 */
LitElement.finalized = true;
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 * @nocollapse
 */
LitElement.render = lit_html_lib_shady_render__WEBPACK_IMPORTED_MODULE_1__["render"];
//# sourceMappingURL=lit-element.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/default-template-processor.js":
/*!**************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/default-template-processor.js ***!
  \**************************************************************************************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return DefaultTemplateProcessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return defaultTemplateProcessor; });
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts.js */ "../../../../../editor-components/node_modules/lit-html/lib/parts.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const comitter = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["PropertyCommitter"](element, name.slice(1), strings);
            return comitter.parts;
        }
        if (prefix === '@') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["EventPart"](element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["BooleanAttributePart"](element, name.slice(1), strings)];
        }
        const comitter = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["AttributeCommitter"](element, name, strings);
        return comitter.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new _parts_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"](options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/directive.js":
/*!*********************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/directive.js ***!
  \*********************************************************************************************/
/*! exports provided: directive, isDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return directive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return isDirective; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive so that lit-html will call the function
 * during template rendering, rather than passing as a value.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object
 *
 * @example
 *
 * ```
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 * ```
 */
// tslint:disable-next-line:no-any
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/dom.js":
/*!***************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/dom.js ***!
  \***************************************************************************************/
/*! exports provided: isCEPolyfill, reparentNodes, removeNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCEPolyfill", function() { return isCEPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return reparentNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return removeNodes; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), into another container (could be the same container), before
 * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
 * container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    let node = start;
    while (node !== end) {
        const n = node.nextSibling;
        container.insertBefore(node, before);
        node = n;
    }
};
/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */
const removeNodes = (container, startNode, endNode = null) => {
    let node = startNode;
    while (node !== endNode) {
        const n = node.nextSibling;
        container.removeChild(node);
        node = n;
    }
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/modify-template.js":
/*!***************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/modify-template.js ***!
  \***************************************************************************************************/
/*! exports provided: removeNodesFromTemplate, insertNodeIntoTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNodesFromTemplate", function() { return removeNodesFromTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertNodeIntoTemplate", function() { return insertNodeIntoTemplate; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "../../../../../editor-components/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module shady-render
 */

const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (Object(_template_js__WEBPACK_IMPORTED_MODULE_0__["isTemplatePartActive"])(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}
//# sourceMappingURL=modify-template.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/part.js":
/*!****************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/part.js ***!
  \****************************************************************************************/
/*! exports provided: noChange, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return noChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return nothing; });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/parts.js":
/*!*****************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/parts.js ***!
  \*****************************************************************************************/
/*! exports provided: isPrimitive, AttributeCommitter, AttributePart, NodePart, BooleanAttributePart, PropertyCommitter, PropertyPart, EventPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return isPrimitive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return AttributeCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return AttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return NodePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return BooleanAttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return PropertyCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return PropertyPart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return EventPart; });
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directive.js */ "../../../../../editor-components/node_modules/lit-html/lib/directive.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "../../../../../editor-components/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _part_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./part.js */ "../../../../../editor-components/node_modules/lit-html/lib/part.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-instance.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-result.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ "../../../../../editor-components/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */






const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (v != null &&
                    (Array.isArray(v) ||
                        // tslint:disable-next-line:no-any
                        typeof v !== 'string' && v[Symbol.iterator])) {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
                else {
                    text += typeof v === 'string' ? v : String(v);
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
class AttributePart {
    constructor(comitter) {
        this.value = undefined;
        this.committer = comitter;
    }
    setValue(value) {
        if (value !== _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"] && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.value)) {
            const directive = this.value;
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        this.committer.commit();
    }
}
class NodePart {
    constructor(options) {
        this.value = undefined;
        this._pendingValue = undefined;
        this.options = options;
    }
    /**
     * Inserts this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
     * its next sibling must be static, unchanging nodes such as those that appear
     * in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part._insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        part._insert(this.endNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Appends this part after `ref`
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref._insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this._pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this._pendingValue)) {
            const directive = this._pendingValue;
            this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        const value = this._pendingValue;
        if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this._commitText(value);
            }
        }
        else if (value instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_4__["TemplateResult"]) {
            this._commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this._commitNode(value);
        }
        else if (Array.isArray(value) ||
            // tslint:disable-next-line:no-any
            value[Symbol.iterator]) {
            this._commitIterable(value);
        }
        else if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"]) {
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"];
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this._commitText(value);
        }
    }
    _insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    _commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this._insert(value);
        this.value = value;
    }
    _commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = value;
        }
        else {
            this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
        }
        this.value = value;
    }
    _commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"] &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"](template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this._commitNode(fragment);
            this.value = instance;
        }
    }
    _commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_1__["removeNodes"])(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this._pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this._pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this._pendingValue)) {
            const directive = this._pendingValue;
            this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this._pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const value = !!this._pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
        }
        this.value = value;
        this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // tslint:disable-next-line:no-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
try {
    const options = {
        get capture() {
            eventOptionsSupported = true;
            return false;
        }
    };
    // tslint:disable-next-line:no-any
    window.addEventListener('test', options, options);
    // tslint:disable-next-line:no-any
    window.removeEventListener('test', options, options);
}
catch (_e) {
}
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this._pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this._boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this._pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this._pendingValue)) {
            const directive = this._pendingValue;
            this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this._pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const newListener = this._pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
        }
        if (shouldAddListener) {
            this._options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
        }
        this.value = newListener;
        this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/render.js":
/*!******************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/render.js ***!
  \******************************************************************************************/
/*! exports provided: parts, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../../../../../editor-components/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts.js */ "../../../../../editor-components/node_modules/lit-html/lib/parts.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-factory.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-factory.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */



const parts = new WeakMap();
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(container, container.firstChild);
        parts.set(container, part = new _parts_js__WEBPACK_IMPORTED_MODULE_1__["NodePart"](Object.assign({ templateFactory: _template_factory_js__WEBPACK_IMPORTED_MODULE_2__["templateFactory"] }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/shady-render.js":
/*!************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/shady-render.js ***!
  \************************************************************************************************/
/*! exports provided: html, svg, TemplateResult, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../../../../../editor-components/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _modify_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modify-template.js */ "../../../../../editor-components/node_modules/lit-html/lib/modify-template.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ "../../../../../editor-components/node_modules/lit-html/lib/render.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-factory.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-factory.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-instance.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template-result.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./template.js */ "../../../../../editor-components/node_modules/lit-html/lib/template.js");
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lit-html.js */ "../../../../../editor-components/node_modules/lit-html/lit-html.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_7__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_7__["svg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_7__["TemplateResult"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Module to add shady DOM/shady CSS polyfill support to lit-html template
 * rendering. See the [[render]] method for details.
 *
 * @module shady-render
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */








// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected.` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_6__["marker"]);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new _template_js__WEBPACK_IMPORTED_MODULE_6__["Template"](result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["removeNodesFromTemplate"])(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (renderedDOM, template, scopeName) => {
    shadyRenderSet.add(scopeName);
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    // If there are no styles, skip unnecessary work
    if (styles.length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < styles.length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["insertNodeIntoTemplate"])(template, condensedStyle, template.element.content.firstChild);
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
    if (window.ShadyCSS.nativeShadow) {
        // When in native Shadow DOM, re-add styling to rendered content using
        // the style ShadyCSS produced.
        const style = template.element.content.querySelector('style');
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else {
        // When not in native Shadow DOM, at this point ShadyCSS will have
        // removed the style from the lit template and parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["removeNodesFromTemplate"])(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render = (result, container, options) => {
    const scopeName = options.scopeName;
    const hasRendered = _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].has(container);
    const needsScoping = container instanceof ShadowRoot &&
        compatibleShadyCSSVersion && result instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_5__["TemplateResult"];
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    Object(_render_js__WEBPACK_IMPORTED_MODULE_2__["render"])(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].get(renderContainer);
        _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].delete(renderContainer);
        if (part.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_4__["TemplateInstance"]) {
            prepareTemplateStyles(renderContainer, part.value.template, scopeName);
        }
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(container, container.firstChild);
        container.appendChild(renderContainer);
        _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};
//# sourceMappingURL=shady-render.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/template-factory.js":
/*!****************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/template-factory.js ***!
  \****************************************************************************************************/
/*! exports provided: templateFactory, templateCaches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return templateFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return templateCaches; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "../../../../../editor-components/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_0__["marker"]);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new _template_js__WEBPACK_IMPORTED_MODULE_0__["Template"](result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/template-instance.js":
/*!*****************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/template-instance.js ***!
  \*****************************************************************************************************/
/*! exports provided: TemplateInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return TemplateInstance; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../../../../../editor-components/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "../../../../../editor-components/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this._parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this._parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this._parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // When using the Custom Elements polyfill, clone the node, rather than
        // importing it, to keep the fragment in the template's document. This
        // leaves the fragment inert so custom elements won't upgrade and
        // potentially modify their contents by creating a polyfilled ShadowRoot
        // while we traverse the tree.
        const fragment = _dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"] ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const parts = this.template.parts;
        let partIndex = 0;
        let nodeIndex = 0;
        const _prepareInstance = (fragment) => {
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
            // null
            const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            let node = walker.nextNode();
            // Loop through all the nodes and parts of a template
            while (partIndex < parts.length && node !== null) {
                const part = parts[partIndex];
                // Consecutive Parts may have the same node index, in the case of
                // multiple bound attributes on an element. So each iteration we either
                // increment the nodeIndex, if we aren't on a node with a part, or the
                // partIndex if we are. By not incrementing the nodeIndex when we find a
                // part, we allow for the next part to be associated with the current
                // node if neccessasry.
                if (!Object(_template_js__WEBPACK_IMPORTED_MODULE_1__["isTemplatePartActive"])(part)) {
                    this._parts.push(undefined);
                    partIndex++;
                }
                else if (nodeIndex === part.index) {
                    if (part.type === 'node') {
                        const part = this.processor.handleTextExpression(this.options);
                        part.insertAfterNode(node.previousSibling);
                        this._parts.push(part);
                    }
                    else {
                        this._parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
                    }
                    partIndex++;
                }
                else {
                    nodeIndex++;
                    if (node.nodeName === 'TEMPLATE') {
                        _prepareInstance(node.content);
                    }
                    node = walker.nextNode();
                }
            }
        };
        _prepareInstance(fragment);
        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"]) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/template-result.js":
/*!***************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/template-result.js ***!
  \***************************************************************************************************/
/*! exports provided: TemplateResult, SVGTemplateResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return TemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return SVGTemplateResult; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../../../../../editor-components/node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "../../../../../editor-components/node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const endIndex = this.strings.length - 1;
        let html = '';
        for (let i = 0; i < endIndex; i++) {
            const s = this.strings[i];
            // This exec() call does two things:
            // 1) Appends a suffix to the bound attribute name to opt out of special
            // attribute value parsing that IE11 and Edge do, like for style and
            // many SVG attributes. The Template class also appends the same suffix
            // when looking up attributes to create Parts.
            // 2) Adds an unquoted-attribute-safe marker for the first expression in
            // an attribute. Subsequent attribute expressions will use node markers,
            // and this is safe since attributes with multiple expressions are
            // guaranteed to be quoted.
            const match = _template_js__WEBPACK_IMPORTED_MODULE_1__["lastAttributeNameRegex"].exec(s);
            if (match) {
                // We're starting a new bound attribute.
                // Add the safe attribute suffix, and use unquoted-attribute-safe
                // marker.
                html += s.substr(0, match.index) + match[1] + match[2] +
                    _template_js__WEBPACK_IMPORTED_MODULE_1__["boundAttributeSuffix"] + match[3] + _template_js__WEBPACK_IMPORTED_MODULE_1__["marker"];
            }
            else {
                // We're either in a bound node, or trailing bound attribute.
                // Either way, nodeMarker is safe to use.
                html += s + _template_js__WEBPACK_IMPORTED_MODULE_1__["nodeMarker"];
            }
        }
        return html + this.strings[endIndex];
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTMl in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["reparentNodes"])(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lib/template.js":
/*!********************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lib/template.js ***!
  \********************************************************************************************/
/*! exports provided: marker, nodeMarker, markerRegex, boundAttributeSuffix, Template, isTemplatePartActive, createMarker, lastAttributeNameRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marker", function() { return marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeMarker", function() { return nodeMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markerRegex", function() { return markerRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundAttributeSuffix", function() { return boundAttributeSuffix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return Template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return isTemplatePartActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return createMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastAttributeNameRegex", function() { return lastAttributeNameRegex; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        let index = -1;
        let partIndex = 0;
        const nodesToRemove = [];
        const _prepareTemplate = (template) => {
            const content = template.content;
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
            // null
            const walker = document.createTreeWalker(content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            // Keeps track of the last index associated with a part. We try to delete
            // unnecessary nodes, but we never want to associate two different parts
            // to the same index. They must have a constant node between.
            let lastPartIndex = 0;
            while (walker.nextNode()) {
                index++;
                const node = walker.currentNode;
                if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                    if (node.hasAttributes()) {
                        const attributes = node.attributes;
                        // Per
                        // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                        // attributes are not guaranteed to be returned in document order.
                        // In particular, Edge/IE can return them out of order, so we cannot
                        // assume a correspondance between part index and attribute index.
                        let count = 0;
                        for (let i = 0; i < attributes.length; i++) {
                            if (attributes[i].value.indexOf(marker) >= 0) {
                                count++;
                            }
                        }
                        while (count-- > 0) {
                            // Get the template literal section leading up to the first
                            // expression in this attribute
                            const stringForPart = result.strings[partIndex];
                            // Find the attribute name
                            const name = lastAttributeNameRegex.exec(stringForPart)[2];
                            // Find the corresponding attribute
                            // All bound attributes have had a suffix added in
                            // TemplateResult#getHTML to opt out of special attribute
                            // handling. To look up the attribute value we also need to add
                            // the suffix.
                            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                            const attributeValue = node.getAttribute(attributeLookupName);
                            const strings = attributeValue.split(markerRegex);
                            this.parts.push({ type: 'attribute', index, name, strings });
                            node.removeAttribute(attributeLookupName);
                            partIndex += strings.length - 1;
                        }
                    }
                    if (node.tagName === 'TEMPLATE') {
                        _prepareTemplate(node);
                    }
                }
                else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                    const data = node.data;
                    if (data.indexOf(marker) >= 0) {
                        const parent = node.parentNode;
                        const strings = data.split(markerRegex);
                        const lastIndex = strings.length - 1;
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for node parts
                        for (let i = 0; i < lastIndex; i++) {
                            parent.insertBefore((strings[i] === '') ? createMarker() :
                                document.createTextNode(strings[i]), node);
                            this.parts.push({ type: 'node', index: ++index });
                        }
                        // If there's no text, we must insert a comment to mark our place.
                        // Else, we can trust it will stick around after cloning.
                        if (strings[lastIndex] === '') {
                            parent.insertBefore(createMarker(), node);
                            nodesToRemove.push(node);
                        }
                        else {
                            node.data = strings[lastIndex];
                        }
                        // We have a part for each match found
                        partIndex += lastIndex;
                    }
                }
                else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                    if (node.data === marker) {
                        const parent = node.parentNode;
                        // Add a new marker node to be the startNode of the Part if any of
                        // the following are true:
                        //  * We don't have a previousSibling
                        //  * The previousSibling is already the start of a previous part
                        if (node.previousSibling === null || index === lastPartIndex) {
                            index++;
                            parent.insertBefore(createMarker(), node);
                        }
                        lastPartIndex = index;
                        this.parts.push({ type: 'node', index });
                        // If we don't have a nextSibling, keep this node so we have an end.
                        // Else, we can remove it to save future costs.
                        if (node.nextSibling === null) {
                            node.data = '';
                        }
                        else {
                            nodesToRemove.push(node);
                            index--;
                        }
                        partIndex++;
                    }
                    else {
                        let i = -1;
                        while ((i = node.data.indexOf(marker, i + 1)) !==
                            -1) {
                            // Comment node has a binding marker inside, make an inactive part
                            // The binding won't work, but subsequent bindings will
                            // TODO (justinfagnani): consider whether it's even worth it to
                            // make bindings in comments work
                            this.parts.push({ type: 'node', index: -1 });
                        }
                    }
                }
            }
        };
        _prepareTemplate(element);
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/lit-html/lit-html.js":
/*!****************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/lit-html/lit-html.js ***!
  \****************************************************************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor, directive, isDirective, removeNodes, reparentNodes, noChange, nothing, AttributeCommitter, AttributePart, BooleanAttributePart, EventPart, isPrimitive, NodePart, PropertyCommitter, PropertyPart, parts, render, templateCaches, templateFactory, TemplateInstance, SVGTemplateResult, TemplateResult, createMarker, isTemplatePartActive, Template, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony import */ var _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/default-template-processor.js */ "../../../../../editor-components/node_modules/lit-html/lib/default-template-processor.js");
/* harmony import */ var _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/template-result.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-result.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["DefaultTemplateProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]; });

/* harmony import */ var _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directive.js */ "../../../../../editor-components/node_modules/lit-html/lib/directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["directive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["isDirective"]; });

/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom.js */ "../../../../../editor-components/node_modules/lit-html/lib/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["removeNodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["reparentNodes"]; });

/* harmony import */ var _lib_part_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/part.js */ "../../../../../editor-components/node_modules/lit-html/lib/part.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["noChange"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["nothing"]; });

/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/parts.js */ "../../../../../editor-components/node_modules/lit-html/lib/parts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributeCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["BooleanAttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["EventPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["isPrimitive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["NodePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyPart"]; });

/* harmony import */ var _lib_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/render.js */ "../../../../../editor-components/node_modules/lit-html/lib/render.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["parts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["render"]; });

/* harmony import */ var _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/template-factory.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateCaches"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateFactory"]; });

/* harmony import */ var _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/template-instance.js */ "../../../../../editor-components/node_modules/lit-html/lib/template-instance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__["TemplateInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"]; });

/* harmony import */ var _lib_template_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/template.js */ "../../../../../editor-components/node_modules/lit-html/lib/template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["createMarker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["isTemplatePartActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["Template"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */




// TODO(justinfagnani): remove line when we get NodePart moving methods








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"](strings, values, 'html', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"](strings, values, 'svg', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
//# sourceMappingURL=lit-html.js.map

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/carousel.svg":
/*!****************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/icons/carousel.svg ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 18.862 15.09\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g fill=\"currentColor\">\n    <path d=\"m1.572 1.257h.943v12.575h-.943z\"/>\n    <path d=\"m16.347 1.257h.943v12.575h-.943z\"/>\n    <path d=\"m17.919 2.515h.943v10.06h-.943z\"/>\n    <path d=\"m0 2.515h.943v10.06h-.943z\"/>\n    <path d=\"m10 6v15.09h12.575v-15.09zm11 13.518h-9.428v-11.946h9.428z\" transform=\"translate(-6.856 -6)\"/>\n  </g>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/close.svg":
/*!*************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/icons/close.svg ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n  <path fill=\"currentColor\"\n        d=\"M21,6.611,19.389,5,13,11.389,6.611,5,5,6.611,11.389,13,5,19.389,6.611,21,13,14.611,19.389,21,21,19.389,14.611,13Z\"\n        transform=\"translate(-1 -1)\"/>\n  <path d=\"M0,0H24V24H0Z\" fill=\"none\"/>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/formatted-text.svg":
/*!**********************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/icons/formatted-text.svg ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 26 20\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g fill=\"currentColor\">\n    <path d=\"m295.991 66.055v-.88h-3.785v.88h1.452v14.814h-1.452v.88h3.785v-.88h-1.452v-14.814z\"\n          transform=\"translate(-269.117 -65.175)\"/>\n    <path\n        d=\"m.163 100.069 4.43-10a1.728 1.728 0 0 1 1.634-1.108h.163a1.7 1.7 0 0 1 1.616 1.108l4.43 10a1.363 1.363 0 0 1 .145.563 1.325 1.325 0 0 1 -1.326 1.344 1.423 1.423 0 0 1 -1.344-.962l-.853-2h-5.59l-.89 2.088a1.373 1.373 0 0 1 -1.289.871 1.286 1.286 0 0 1 -1.289-1.305 1.483 1.483 0 0 1 .163-.599zm7.862-3.522-1.761-4.195-1.764 4.195z\"\n        transform=\"translate(0 -87.078)\"/>\n    <path\n        d=\"m176.011 134.837v-.037c0-2.124 1.616-3.1 3.922-3.1a6.915 6.915 0 0 1 2.379.4v-.163c0-1.144-.708-1.779-2.088-1.779a6.328 6.328 0 0 0 -1.907.272 1.168 1.168 0 0 1 -.4.073 1.124 1.124 0 0 1 -1.144-1.126 1.144 1.144 0 0 1 .744-1.071 8.474 8.474 0 0 1 3.105-.508 4.494 4.494 0 0 1 3.287 1.089 4.242 4.242 0 0 1 1.053 3.1v4.43a1.325 1.325 0 0 1 -1.344 1.326 1.236 1.236 0 0 1 -1.325-1.144v-.018a3.742 3.742 0 0 1 -2.941 1.235c-1.834-.001-3.341-1.054-3.341-2.979zm6.337-.636v-.49a4.28 4.28 0 0 0 -1.761-.363c-1.18 0-1.906.472-1.906 1.344v.036c0 .744.617 1.18 1.507 1.18 1.288 0 2.16-.708 2.16-1.708z\"\n        transform=\"translate(-162.103 -122.844)\"/>\n  </g>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/image.svg":
/*!*************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/icons/image.svg ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 17.304 13.724\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path\n      d=\"m17.005 6h-16.705a.3.3 0 0 0 -.3.3v13.125a.3.3 0 0 0 .3.3h16.705a.3.3 0 0 0 .3-.3v-13.125a.3.3 0 0 0 -.3-.3zm-12.232 3.282a1.661 1.661 0 1 1 -1.661 1.661 1.663 1.663 0 0 1 1.661-1.661zm10.96 5.572a.3.3 0 0 1 -.422.018l-3.36-3.08-2.739 3 1.434 1.434a.3.3 0 1 1 -.422.422l-3.072-3.074-4.866 4.285a.3.3 0 1 1 -.394-.448l5.077-4.47a.3.3 0 0 1 .408.013l1.414 1.416 2.922-3.2a.3.3 0 0 1 .207-.1.307.307 0 0 1 .215.078l3.58 3.282a.3.3 0 0 1 .018.423z\"\n      fill=\"currentColor\" transform=\"translate(0 -6)\"/>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/misc.svg":
/*!************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/icons/misc.svg ***!
  \************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g fill=\"currentColor\">\n    <path\n        d=\"m158.2 149.935h-.733a.6.6 0 0 1 -.5-.392 5.813 5.813 0 0 0 -.244-.583.6.6 0 0 1 .078-.631l.522-.522a.939.939 0 0 0 0-1.326l-.847-.847a.937.937 0 0 0 -1.326 0l-.522.522a.535.535 0 0 1 -.373.134.6.6 0 0 1 -.258-.055 5.836 5.836 0 0 0 -.584-.244.6.6 0 0 1 -.392-.5v-.733a.939.939 0 0 0 -.937-.937h-1.2a.939.939 0 0 0 -.937.937v.733a.6.6 0 0 1 -.392.5 5.833 5.833 0 0 0 -.583.244.6.6 0 0 1 -.257.055.536.536 0 0 1 -.374-.134l-.521-.521a.938.938 0 0 0 -1.326 0l-.848.847a.937.937 0 0 0 0 1.326l.522.522a.6.6 0 0 1 .079.631 5.8 5.8 0 0 0 -.243.582.6.6 0 0 1 -.5.392h-.733a.939.939 0 0 0 -.937.937v1.2a.939.939 0 0 0 .937.937h.733a.6.6 0 0 1 .5.392 5.8 5.8 0 0 0 .244.582.6.6 0 0 1 -.079.631l-.522.522a.939.939 0 0 0 0 1.326l.848.848a.937.937 0 0 0 1.326 0l.522-.522a.536.536 0 0 1 .374-.134.594.594 0 0 1 .257.055 5.817 5.817 0 0 0 .583.244.6.6 0 0 1 .392.5v.733a.938.938 0 0 0 .937.937h1.2a.938.938 0 0 0 .937-.937v-.733a.6.6 0 0 1 .392-.5 5.834 5.834 0 0 0 .583-.244.6.6 0 0 1 .257-.055.536.536 0 0 1 .374.134l.522.522a.937.937 0 0 0 1.326 0l.847-.848a.939.939 0 0 0 0-1.326l-.521-.522a.6.6 0 0 1 -.079-.631 5.808 5.808 0 0 0 .244-.583.6.6 0 0 1 .5-.392h.733a.939.939 0 0 0 .937-.937v-1.2a.939.939 0 0 0 -.938-.936zm-3.971 1.536a2.747 2.747 0 1 1 -2.747-2.747 2.75 2.75 0 0 1 2.752 2.748z\"\n        transform=\"translate(-139.142 -139.128)\"/>\n    <path\n        d=\"m6.871 5.006a.153.153 0 0 1 .1-.092h.367a.626.626 0 0 0 .625-.625v-.6a.626.626 0 0 0 -.625-.625h-.362a.152.152 0 0 1 -.1-.092 3.031 3.031 0 0 0 -.129-.307.149.149 0 0 1 .009-.137l.261-.261a.626.626 0 0 0 0-.884l-.427-.422a.625.625 0 0 0 -.884 0l-.261.261a.121.121 0 0 1 -.076.021.144.144 0 0 1 -.061-.012 3.033 3.033 0 0 0 -.308-.131.153.153 0 0 1 -.091-.1v-.369a.626.626 0 0 0 -.625-.625h-.6a.626.626 0 0 0 -.624.625v.369a.152.152 0 0 1 -.092.1 3.043 3.043 0 0 0 -.307.129.146.146 0 0 1 -.061.012.121.121 0 0 1 -.076-.021l-.261-.259a.625.625 0 0 0 -.884 0l-.423.423a.626.626 0 0 0 0 .884l.261.261a.149.149 0 0 1 .009.137 3.043 3.043 0 0 0 -.129.307.153.153 0 0 1 -.1.092h-.372a.626.626 0 0 0 -.625.626v.6a.626.626 0 0 0 .625.625h.367a.153.153 0 0 1 .1.092 3.022 3.022 0 0 0 .129.307.149.149 0 0 1 -.009.137l-.261.261a.625.625 0 0 0 0 .884l.423.423a.625.625 0 0 0 .884 0l.261-.261a.121.121 0 0 1 .081-.022.145.145 0 0 1 .061.012 3.04 3.04 0 0 0 .307.128.153.153 0 0 1 .092.1v.367a.626.626 0 0 0 .625.625h.6a.626.626 0 0 0 .625-.625v-.362a.152.152 0 0 1 .09-.105 3.041 3.041 0 0 0 .307-.129.145.145 0 0 1 .061-.012.121.121 0 0 1 .076.021l.261.261a.625.625 0 0 0 .884 0l.424-.418a.626.626 0 0 0 0-.884l-.261-.261a.149.149 0 0 1 -.009-.137 3.079 3.079 0 0 0 .128-.312zm-1.671-1.016a1.217 1.217 0 1 1 -1.216-1.218 1.219 1.219 0 0 1 1.216 1.218z\"\n        transform=\"translate(0 -.006)\"/>\n  </g>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/text-media.svg":
/*!******************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/icons/text-media.svg ***!
  \******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 20.26 16.073\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g fill=\"currentColor\">\n    <path\n        d=\"m9.229 136.932-2.307-2.307-2.336 2.335 1.814 1.813h1.181v.659h-1.319a.33.33 0 0 1 -.233-.1l-3.063-3.063-2.966 2.97v.852a.989.989 0 0 0 .989.989h7.251a.989.989 0 0 0 .989-.989zm0 0\"\n        transform=\"translate(0 -131.852)\"/>\n    <path d=\"m176.659 64.33a.33.33 0 1 1 -.33-.33.33.33 0 0 1 .33.33zm0 0\" transform=\"translate(-172.374 -62.682)\"/>\n    <path\n        d=\"m9.229.989a.989.989 0 0 0 -.989-.989h-7.251a.989.989 0 0 0 -.989.989v5.466l2.733-2.733a.33.33 0 0 1 .466 0l.921.921 2.568-2.569a.33.33 0 0 1 .466 0l2.075 2.074zm-5.274 1.648a.989.989 0 1 1 .989-.989.989.989 0 0 1 -.989.989zm0 0\"/>\n    <path d=\"m11.109.102h9.151v1.141h-9.151z\"/>\n    <path d=\"m0 11.51h20.26v1.141h-20.26z\"/>\n    <path d=\"m11.109 3.525h9.151v1.141h-9.151z\"/>\n    <path d=\"m0 14.932h12.275v1.141h-12.275z\"/>\n    <path d=\"m11.109 6.947h9.151v1.141h-9.151z\"/>\n  </g>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/text.svg":
/*!************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/icons/text.svg ***!
  \************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 20 18\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path\n      d=\"m91.93 13.877a2.346 2.346 0 0 1 -1.262-.334 1.217 1.217 0 0 1 -.561-.647 6.709 6.709 0 0 1 -.151-1.856v-4.253h3.928v-2.6h-3.928v-4.187h-2.363a6.615 6.615 0 0 1 -.583 2.115 4.6 4.6 0 0 1 -1.11 1.424 4.974 4.974 0 0 1 -1.673.906v2.342h1.833v5.813a4.847 4.847 0 0 0 .237 1.737 3 3 0 0 0 .853 1.133 4.394 4.394 0 0 0 1.489.809 6.34 6.34 0 0 0 2.007.292 7.809 7.809 0 0 0 1.867-.205 9.536 9.536 0 0 0 1.921-.7v-2.61a4.5 4.5 0 0 1 -2.504.821z\"\n      fill=\"currentColor\" transform=\"translate(-84.226)\"/>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/icons/video.svg":
/*!*************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/icons/video.svg ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 19.45 13\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path\n      d=\"m-130.878 73.4a.585.585 0 0 0 -.21-.042.5.5 0 0 0 -.378.16l-3.382 3.374v-1.385a2.328 2.328 0 0 0 -.709-1.708 2.328 2.328 0 0 0 -1.708-.709h-10.318a2.329 2.329 0 0 0 -1.708.709 2.329 2.329 0 0 0 -.709 1.708v5.909a2.328 2.328 0 0 0 .709 1.708 2.328 2.328 0 0 0 1.708.709h10.318a2.328 2.328 0 0 0 1.708-.709 2.328 2.328 0 0 0 .709-1.708v-1.394l3.382 3.382a.5.5 0 0 0 .378.159.586.586 0 0 0 .21-.042.5.5 0 0 0 .327-.5v-9.121a.5.5 0 0 0 -.327-.5z\"\n      fill=\"currentColor\" transform=\"translate(150 -73.09)\"/>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/base/placeholder/placeholder.css":
/*!*************************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/base/placeholder/placeholder.css ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-grey-light: #B8B8B8;\n  --align-buttons: left;\n  display: block;\n  font-family: var(--font-family, sans-serif);\n  --transition: 0.3s ease;\n}\n\nbutton {\n  background: rgba(0, 0, 0, 0);\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: inherit;\n  padding: 0;\n}\n\nul {\n  list-style-type: none;\n  width: 100%;\n}\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n}\n\n.ck-placeholder__insert-wrapper {\n  border-bottom: 1px dashed var(--color-black, #222330);\n  font-size: 12px;\n  line-height: 1;\n  margin: 1em 0 2em;\n  text-align: center;\n  opacity: 0;\n  transition: opacity var(--transition);\n}\n\n.ck-placeholder__insert-wrapper:hover,\n.ck-placeholder__insert-wrapper:focus {\n  opacity: 1;\n}\n\n.ck-placeholder__insert-button {\n  background: #fff;\n  color: var(--color-black, #222330);\n  display: inline-block;\n  font-size: 12px;\n  line-height: 1;\n  font-weight: bold;\n  letter-spacing: 0.03em;\n  margin: 0;\n  padding: 0 1em;\n  position: relative;\n  top: 0.5em;\n}\n\n.ck-placeholder__insert-button:hover,\n.ck-placeholder__insert-button:focus {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__add-wrapper {\n  border: 1px dashed var(--color-black, #222330);\n  box-sizing: border-box;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  font-size: 14px;\n  min-height: 80px;\n  padding: 0.5em 1.8em 0.6em;\n  height: 100%;\n  transition: border var(--transition);\n}\n\n.ck-placeholder__add-wrapper:hover {\n  border-color: #909197;\n}\n\n.ck-placeholder__add-button {\n  color: var(--color-black, #222330);\n  font-weight: bold;\n  margin-right: 40px;\n  text-transform: uppercase;\n}\n\n.ck-placeholder__add-button:hover,\n.ck-placeholder__add-button:focus {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__sections-list {\n  text-align: var(--align-buttons);\n}\n\n.ck-placeholder__section-item {\n  color: var(--color-black, #222330);\n  display: inline-block;\n  font-size: 12px;\n  margin-right: 20px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.ck-placeholder__icon-wrapper {\n  color: var(--color-grey-light, #B8B8B8);\n  margin-bottom: 8px;\n  width: 18px;\n}\n\n.ck-placeholder__section-button {\n  align-items: center;\n  display: flex;\n  flex-flow: column wrap;\n  text-transform: uppercase;\n}\n\n.ck-placeholder__section-button:hover,\n.ck-placeholder__section-button:focus {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__section-button:hover .ck-placeholder__icon-wrapper,\n.ck-placeholder__section-button:focus .ck-placeholder__icon-wrapper {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__close-button {\n  margin-left: auto;\n  position: relative;\n}\n\n.ck-placeholder__close-button .ck-placeholder__icon-wrapper {\n  margin-bottom: 0;\n}\n\n.ck-placeholder__close-button:hover .ck-placeholder__icon-wrapper,\n.ck-placeholder__close-button:focus .ck-placeholder__icon-wrapper {\n  color: var(--color-black, #222330);\n}\n\n.ck-placeholder__close-button-label {\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n}\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/gallery/gallery.css":
/*!************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/gallery/gallery.css ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-30: rgba(0, 0, 0, 0.3);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --align-buttons: left;\n  font-family: var(--font-family, sans-serif);\n  font-style: initial;\n  font-weight: initial;\n  --gallery-position-top: auto;\n  --gallery-position-left: 50%;\n  --gallery-position-right: auto;\n  --gallery-position-bottom: 40px;\n  --gallery-transform: translate(-50%, 0);\n}\n\n.ck-gallery {\n  position: relative;\n  width: 100%;\n  display: inline-block;\n  margin: auto;\n  overflow: hidden;\n}\n\n.disabled {\n  opacity: 0.3;\n}\n\n.ck-gallery__rail {\n  display: flex;\n  transition: transform 0.7s ease;\n}\n\n::slotted(*), ck-placeholder {\n  display: block;\n  width: 100%;\n  flex-shrink: 0;\n  --align-buttons: center;\n  min-height: 300px;\n}\n\n\n.ck-gallery__controls {\n  position: absolute;\n  top: var(--gallery-position-top);\n  bottom: var(--gallery-position-bottom);\n  left: var(--gallery-position-left);\n  right: var(--gallery-position-right);\n  transform: var(--gallery-transform);\n  background-color: var(--color-white);\n  display: flex;\n  min-width: 40px;\n  max-height: 60px;\n  justify-content: space-between;\n  align-items: flex-end;\n  padding: 10px 20px;\n  border-radius: 10px;\n}\n\n.ck-gallery__actions {\n  min-width: 130px;\n  padding-left: 20px;\n  margin-left: 20px;\n  border-left: 1px solid var(--color-grey-light);\n  font-size: 14px;\n}\n\n.ck-gallery__pager {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 5px;\n}\n\n.ck-gallery__dots {\n  margin-right: 10px;\n  display: flex;\n}\n\n.ck-gallery__dot-item {\n  display: inline-block;\n  height: 20px;\n  width: 20px;\n  border-radius: 100%;\n  margin-right: 5px;\n  background-color: var(--color-black-30);\n  text-align: center;\n  line-height: 20px;\n  color: var(--color-white);\n  cursor: pointer;\n  font-size: 12px;\n  transition: background-color 0.35s ease;\n}\n\n.ck-gallery__add {\n  display: inline-block;\n  box-sizing: border-box;\n  height: 20px;\n  width: 20px;\n  border-radius: 100%;\n  background-color: var(--color-white);\n  text-align: center;\n  color: var(--color-blue);\n  line-height: 16px;\n  font-size: 16px;\n  cursor: pointer;\n  transition: background-color 0.35s ease;\n  border: 1px solid var(--color-blue);\n}\n\n.ck-gallery__add.active {\n  background-color: var(--color-blue);\n  color: var(--color-white);\n}\n\n.ck-gallery__dot-item.active {\n  background-color: var(--color-black-80);\n}\n\n\n.ck-gallery__add-slide:hover {\n  background-color: var(--color-blue);\n  color: var(--color-white);\n}\n\n.ck-gallery__icons {\n  max-width: 110px;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 5px;\n}\n\n.ck-gallery__icon {\n  cursor: pointer;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  transition: background-color 0.35s ease;\n  background-color: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.ck-gallery__icon:hover {\n  background-color: #f0f0f0;\n}\n\n.ck-gallery__icon > * {\n  width: 14px;\n  height: 14px;\n}\n\n[data-tooltip] {\n  position: relative;\n  cursor: pointer;\n  text-align: center;\n}\n\n/* Base styles for the entire tooltip */\n[data-tooltip]:before,\n[data-tooltip]:after {\n  position: absolute;\n  visibility: hidden;\n  transition:\n        opacity 0.2s ease-in-out,\n        visibility 0.2s ease-in-out,\n        transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);\n  transform: translate3d(0, 0, 0);\n  pointer-events: none;\n}\n\n.disabled[data-tooltip]:before,\n.disabled[data-tooltip]:after {\n  display: none;\n}\n\n/* Show the entire tooltip on hover and focus */\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after,\n[data-tooltip]:focus:before,\n[data-tooltip]:focus:after {\n  visibility: visible;\n  opacity: 1;\n}\n\n/* Base styles for the tooltip's directional arrow */\n[data-tooltip]:before {\n  z-index: 1001;\n  border: 6px solid transparent;\n  background: transparent;\n  content: \"\";\n}\n\n/* Base styles for the tooltip's content area */\n[data-tooltip]:after {\n  z-index: 1000;\n  padding: 8px;\n  display: inline-block;\n  width: 160px;\n  background-color: var(--color-black-60);\n  color: var(--color-white);\n  content: attr(data-tooltip);\n  font-size: 13px;\n  line-height: 1;\n}\n\n/* Horizontally align top/bottom tooltips */\n[data-tooltip]:after {\n  margin-left: -80px;\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after,\n[data-tooltip]:focus:before,\n[data-tooltip]:focus:after {\n  transform: translateY(-12px);\n}\n\n\n[data-tooltip]:before,\n[data-tooltip]:after {\n  top: 80%;\n  bottom: auto;\n  left: 50%;\n}\n\n[data-tooltip]:before {\n  margin-top: -12px;\n  margin-left: -6px;\n  margin-bottom: 0;\n  border-top-color: transparent;\n  border-bottom-color: var(--color-black-60);\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after,\n[data-tooltip]:focus:before,\n[data-tooltip]:focus:after {\n  transform: translateY(12px);\n}\n\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/gallery/icons/leftArrow.svg":
/*!********************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/gallery/icons/leftArrow.svg ***!
  \********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <path d=\"M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z\"/>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/gallery/icons/rightArrow.svg":
/*!*********************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/gallery/icons/rightArrow.svg ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <path d=\"M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z\"/>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/gallery/icons/trash.svg":
/*!****************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/gallery/icons/trash.svg ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <path d=\"M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM8,9h8V19H8Zm7.5-5-1-1h-5l-1,1H5V6H19V4Z\"/>\n</svg>\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/media/media.css":
/*!********************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/media/media.css ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-30: rgba(0, 0, 0, 0.3);\n  --color-black-10: rgba(0, 0, 0, 0.1);\n  --color-black-05: rgba(0, 0, 0, 0.05);\n  --color-spinner: rgba(0, 0, 0, 0.4);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --align-buttons: left;\n  --height-ratio: 50%;\n  font-family: var(--font-family, sans-serif);\n  --button-padding: 5px;\n}\n\nimg {\n  display: block;\n  height: auto !important;\n}\n\n* {\n  max-width: 100%;\n}\n\n.hidden {\n  display: none;\n}\n\n.ck-media {\n  width: 100%;\n  border: 1px solid var(--color-black-10);\n  position: relative;\n}\n\n.ck-media__placeholder {\n  width: 100%;\n  padding-bottom: var(--height-ratio);\n  background: repeating-linear-gradient(\n  45deg,\n  var(--color-white),\n  var(--color-white) 30px,\n  var(--color-black-05) 30px,\n  var(--color-black-05) 60px\n  );\n}\n\n.ck-media__preview {\n  width: 100%;\n  height: 100%;\n}\n\n.ck-media__loader {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n\nck-media-loader {\n  opacity: 1;\n  visibility: visible;\n  transition: all 0.2s ease;\n  pointer-events: none;\n}\n\n.ck-media__spinner {\n  width: 100px;\n  text-align: center;\n}\n\n.ck-media__spinner > .ck-media__bounce {\n  width: 16px;\n  height: 16px;\n  background-color: var(--color-spinner);\n\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: ck-bounce 1.4s infinite ease-in-out both;\n  animation: ck-bounce 1.4s infinite ease-in-out both;\n}\n\n.ck-media__spinner .ck-media__bounce--1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.ck-media__spinner .ck-media__bounce--2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes ck-bounce {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes ck-bounce {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n\n.ck-media {\n  position: relative;\n}\n\n.ck-media__buttons {\n  position: absolute;\n  display: flex;\n}\n\n.ck-media__buttons button {\n  display: block;\n  outline: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  padding: 5px;\n  border-radius: 3px;\n  cursor: pointer;\n}\n\n.ck-media__buttons button:not(:last-child) {\n  margin-right: 5px;\n}\n\n.ck-media__buttons svg {\n  margin-top: -1px;\n  display: block;\n}\n\n.top-left {\n  top: var(--button-padding);\n  left: 5px;\n}\n\n.top {\n  top: var(--button-padding);\n  width: 100%;\n  justify-content: center;\n}\n\n.top-right {\n  top: var(--button-padding);\n  right: var(--button-padding);\n}\n\n.right {\n  top: 0;\n  right: var(--button-padding);\n  height: 100%;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.bottom-right {\n  bottom: var(--button-padding);\n  right: var(--button-padding);\n}\n\n.bottom {\n  bottom: var(--button-padding);\n  width: 100%;\n  justify-content: center;\n}\n\n.bottom-left {\n  bottom: var(--button-padding);\n  left: var(--button-padding);\n}\n\n.left {\n  top: 0;\n  left: var(--button-padding);\n  height: 100%;\n  flex-direction: column;\n  justify-content: center;\n}\n\n\n.ck-media__buttons button {\n  background: rgba(255, 255, 255, 0.5);\n  transition: 0.3s ease;\n  border: none;\n}\n\n.ck-media__buttons button:hover{\n  background: rgba(255, 255, 255, 0.8);\n  transform: scale(1.2);\n  border: none;\n}\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/tabs/modal.css":
/*!*******************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/tabs/modal.css ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  --color-blue: #004adc;\n  --color-blue-60: rgba(0, 74, 220, 0.6);\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-30: rgba(0, 0, 0, 0.3);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --font-size-small: 12px;\n  --font-size-text: 16px;\n  --baseline: 8px;\n  --baseline2: 16px;\n  --baseline3: 24px;\n  --baseline4: 32px;\n  --baseline5: 40px;\n  font-family: var(--font-family, sans-serif);\n}\n\n.modal {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: var(--color-black-30);\n  opacity: 0;\n  visibility: hidden;\n  transform: scale(1.1);\n  transition: visibility 0s linear .35s,opacity .35s 0s,transform .35s;\n  z-index: 1;\n}\n.visible {\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1);\n  transition: visibility 0s linear 0s,opacity .35s 0s,transform .35s;\n}\n\n.modal__item {\n  background-color: var(--color-white);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  border-radius: 4px;\n  min-width: 300px;\n  box-shadow: 0px 5px 40px 1px rgba(0,0,0,0.35);\n}\n\n.modal__content, .modal__actions, .modal__title {\n  padding: var(--baseline2);\n}\n\n.modal__actions {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.modal__action {\n  text-transform: uppercase;\n  cursor: pointer;\n  margin-left: 20px;\n  font-size: var(--font-size-small);\n}\n\n.modal__action--primary {\n  color: var(--color-blue);\n}\n\n.modal__action-wrap-delete {\n  flex: 1;\n}\n\n.modal__action--delete {\n  margin: 0;\n  transition: 0.35s color ease;\n}\n\n.modal__action--delete:hover {\n  color: red;\n}\n\n.modal__title {\n  font-size: var(--font-size-text);\n  background-color: var(--color-blue);\n  color: var(--color-white);\n  margin: 0;\n  border-top-left-radius: 4px; \n  border-top-right-radius: 4px; \n}\n\n.modal__button-container {\n  text-align: right;\n}\n\n.modal__label {\n  font-size: var(--font-size-small);\n  color: var(--color-black-30);\n}\n\n.modal__input {\n  margin: 5px 0 20px 0;\n  display: block;\n  border: none;\n  border-bottom: 1px solid  var(--color-black-30);\n  padding: 5px 0;\n  outline: none;\n  width: 100%;\n  transition: border-color 0.35s;\n  font-size: var(--font-size-text);\n}\n\n.modal__input:focus {\n  border-color: var(--color-blue);\n}\n\n.modal__toggle {\n  display: flex;\n  align-items: center;\n}\n\n.modal__toggle-label {\n  margin-left: 15px;\n  font-size: var(--font-size-small);\n}\n\n/* The switch - the box around the slider */\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 30px;\n  height: 8px;\n}\n\n/* Hide default HTML checkbox */\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n/* The slider */\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--color-black-30);\n  transition: all 0.35s ease;\n  border-radius: 20px;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 15px;\n  width: 15px;\n  left: 0px;\n  bottom: -3px;\n  background-color: var(--color-white);\n  transition: all 0.35s ease;\n  box-shadow: 0px 3px 15px 0px rgba(0,0,0,0.3);\n  border-radius: 50%;\n}\n\ninput:checked + .slider {\n  background-color: var(--color-blue-60);\n}\n\n\ninput:checked + .slider:before {\n  transform: translateX(15px);\n  background-color: var(--color-blue);\n}\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/tabs/tabs.css":
/*!******************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/tabs/tabs.css ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-30: rgba(0, 0, 0, 0.3);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --font-size-text: 16px;\n  --baseline: 8px;\n  --baseline2: 16px;\n  --baseline3: 24px;\n  --baseline4: 32px;\n  --baseline5: 40px;\n  font-style: initial;\n  font-weight: initial;\n  font-family: var(--font-family, sans-serif);\n}\n\n.ck-tabs {\n  width: 100%;\n  display: block;\n  margin: auto;\n}\n\n.ck-tabs__header-tab-list {\n  list-style: none;\n  display: flex;\n  padding-left: 0;\n  border-bottom: 1px solid var(--color-grey-light);\n}\n\n\n.ck-tabs__header-tab-item {\n  padding: 0 var(--baseline3) 0 var(--baseline3);\n  border-bottom: 1px solid var(--color-grey-light);\n  margin-bottom: -1px;\n  cursor: pointer;\n  position: relative;\n  font-size: var(--font-size-text);\n  position: relative;\n}\n\n.ck-tabs__header-icon {\n  height: 0;\n  width: 0;\n  cursor: pointer;\n  opacity: 0;\n  visibility: hidden;\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n\n.ck-tabs__header-tab-item.active {\n  border-bottom: 2px solid var(--color-blue);\n  color: var(--color-blue);\n  font-weight: bold;\n  cursor: default;\n}\n\n.ck-tabs__header-tab-item.active .ck-tabs__header-icon {\n  width: var(--baseline2);\n  height: var(--baseline2);\n}\n\n.ck-tabs__header-tab-item.active:hover .ck-tabs__header-icon {\n  opacity: 1;\n  visibility: visible;\n}\n\n.ck-tabs__header-tab-item.default:before {\n  content: '*';\n  margin-right: 5px;\n  font-size: 19px;\n  height: var(--baseline2);\n  position: absolute;\n  left: 5px;\n  top: 0;\n}\n\n.ck-tabs__header-tab-add {\n  margin-left: var(--baseline3);\n  cursor: pointer;\n  height: 20px;\n  width: 20px;\n  background-color: var(--color-black-80);\n  text-align: center;\n  color: var(--color-white);\n  border-radius: 50%;\n  transition: background-color 0.35s ease;\n  position: relative;\n  margin-bottom: 15px;\n}\n\n.ck-tabs__header-tab-add::before {\n  content: '+';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -54%)\n}\n\n.ck-tabs__header-tab-add:hover {\n  background-color: var(--color-blue);\n}\n\n::slotted(*) {\n  display: block;\n  width: 100%;\n  flex-shrink: 0;\n}\n"

/***/ }),

/***/ "../../../../../editor-components/node_modules/raw-loader/index.js!../../../../../editor-components/components/textfield/textfield.css":
/*!****************************************************************************************************************************************************************!*\
  !*** /Users/philippmelab/Projects/editor-components/node_modules/raw-loader!/Users/philippmelab/Projects/editor-components/components/textfield/textfield.css ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  --color-red: #d32323;\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-15: rgba(0, 0, 0, 0.15);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --align-buttons: left;\n  --font-size-small: 14px;\n  --font-size-text: 16px;\n  --baseline: 8px;\n  --baseline2: 16px;\n  font-family: var(--font-family, sans-serif);\n  font-style: initial;\n  font-weight: initial;\n  position: relative;\n  display: block;\n  outline: none;\n}\n\n.ck-textfield {\n  position: relative;\n}\n\n.ck-textfield.error {\n  outline: 1px solid var(--color-red);\n}\n\n.ck-tooltip {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: translate(-1px, -100%);\n  padding: var(--baseline) var(--baseline2);\n  border-radius: var(--baseline);\n  border-bottom-left-radius: 0;\n  font-size: var(--font-size-small);\n}\n\n.ck-tooltip--error {\n  background-color: var(--color-red);\n  color: var(--color-white);\n}\n\n.ck-tooltip--helper {\n  transform: translate(0, -100%);\n  background-color: var(--color-white);\n  box-shadow: 0px 0px 3px 1px var(--color-black-15);\n}\n"

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _amazee_editor_components_components_base_placeholder_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amazee/editor-components/components/base/placeholder/index */ "../../../../../editor-components/components/base/placeholder/index.js");
/* harmony import */ var _amazee_editor_components_components_container_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amazee/editor-components/components/container/index */ "../../../../../editor-components/components/container/index.js");
/* harmony import */ var _amazee_editor_components_components_section_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amazee/editor-components/components/section/index */ "../../../../../editor-components/components/section/index.js");
/* harmony import */ var _amazee_editor_components_components_gallery_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amazee/editor-components/components/gallery/index */ "../../../../../editor-components/components/gallery/index.js");
/* harmony import */ var _amazee_editor_components_components_tabs_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amazee/editor-components/components/tabs/index */ "../../../../../editor-components/components/tabs/index.js");
/* harmony import */ var _amazee_editor_components_components_button_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @amazee/editor-components/components/button/index */ "../../../../../editor-components/components/button/index.js");
/* harmony import */ var _amazee_editor_components_components_text_conflict_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @amazee/editor-components/components/text_conflict/index */ "../../../../../editor-components/components/text_conflict/index.js");
/* harmony import */ var _amazee_editor_components_components_media_conflict_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @amazee/editor-components/components/media_conflict/index */ "../../../../../editor-components/components/media_conflict/index.js");
/* harmony import */ var _amazee_editor_components_components_media_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @amazee/editor-components/components/media/index */ "../../../../../editor-components/components/media/index.js");
/* harmony import */ var _amazee_editor_components_components_textfield_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @amazee/editor-components/components/textfield/index */ "../../../../../editor-components/components/textfield/index.js");












/***/ })

/******/ })["default"];
});
//# sourceMappingURL=components.js.map