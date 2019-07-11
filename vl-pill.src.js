import { VlElement, define } from '/node_modules/vl-ui-core/vl-core.js';

/**
 * VlPill
 * @class
 * @classdesc Gebruik de pill om keywoorden (filters of tags) te visualiseren. <a href="demo/vl-pill.html">Demo</a>.
 *
 * @extends VlElement
 *
 * @property {(success | warning | error)} type - Attribuut bepaalt de soort van pill: succes, probleem of fout.
 */
export class VlPill extends VlElement(HTMLElement) {
  constructor() {
    super(`
            <style>
                @import "../style.css";
            </style>
            <span class="vl-pill">
                <slot></slot>
            </span>
        `);
  }

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

define('vl-pill', VlPill);