import { VlElement, NativeVlElement, define } from '/node_modules/vl-ui-core/vl-core.js';

export const VlPillElement = (SuperClass) => {
  return class extends VlElement(SuperClass) {
    static get _observedAttributes() {
      return ['type'];
    }
  
    get _classPrefix() {
      return 'vl-pill--';
    }
  
    _typeChangedCallback(oldValue, newValue) {
      if (["success", "warning", "error"].indexOf(newValue) >= 0) {
        this._changeClass(this._element, oldValue, newValue);
      } else {
        this._element.classList.remove(this._classPrefix + oldValue);
      }
    }
  }
};

/**
 * VlPill
 * @class
 * @classdesc Gebruik de pill om keywoorden (filters of tags) te visualiseren. <a href="demo/vl-pill.html">Demo</a>.
 *
 * @extends VlElement
 *
 * @property {(success | warning | error)} type - Attribuut bepaalt de soort van pill: succes, probleem of fout.
 */
export class VlPill extends VlPillElement(HTMLElement) {
  static get pillTemplate() {
    return `
      <span class="vl-pill">
        <slot></slot>
      </span>
    `;
  }

  constructor() {
    super(`
      <style>
          @import "../style.css";
      </style>
      ${VlPill.pillTemplate}
    `);
  }

  static get _observedAttributes() {
    return super._observedAttributes.concat(['closable']);
  }

  _getPillTemplate() {
    return this._template(VlPill.pillTemplate);
  }

  _getClosablePillTemplate() {
    return this._template(`
      <div class="vl-pill vl-pill--closable">
          <slot></slot>
        <button class="vl-pill__close" type="button">
          <span class="vl-u-visually-hidden">Verwijderen</span>
        </button>
      </div>
    `);
  }

  _closableChangedCallback(oldValue, newValue) {
    this._shadow.lastElementChild.replaceWith((newValue != undefined ? this._getClosablePillTemplate() : this._getPillTemplate()));
  }
}

export class VlButtonPill extends VlPillElement(NativeVlElement(HTMLButtonElement)) {
  constructor() {
    super();
    this.classList.add('vl-pill');
    this.classList.add('vl-pill--clickable');
  }
  
  get _stylePath() {
      return '../style.css';
  }
}

export class VlLabelPill extends VlPillElement(NativeVlElement(HTMLLabelElement)) {
  constructor() {
    super();
    this.classList.add('vl-pill');
    this.classList.add('vl-pill--checkable');
    this._inputElement.classList.add("vl-pill--checkable__checkbox");
    this._inputElement.insertAdjacentHTML('afterend', this._inputStyleElement);
  }

  get _stylePath() {
    return '../style.css';
  }

  get _inputElement() {
    return this._element.querySelector('input');
  }

  get _inputStyleElement() {
    return `
      <span></span>
    `;
  }
}

define('vl-pill', VlPill);
define('vl-button-pill', VlButtonPill, {extends: 'button'});
define('vl-label-pill', VlLabelPill, {extends: 'label'});
