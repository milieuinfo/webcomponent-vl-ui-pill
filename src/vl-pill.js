import { VlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlPill
 * @class
 * @classdesc Gebruik de pill om keywoorden (filters of tags) te visualiseren.
 *
 * @extends VlElement
 *
 * @property {(success | warning | error)} type - Attribuut bepaalt de soort van pill: succes, probleem of fout.
 * @property {boolean} closable - Attribuut bepaalt of de pill kan worden verwijderd (kan niet in combinatie met checkable gebruikt worden).
 * @property {boolean} checkable - Attribuut bepaalt of de pill kan worden aangevinkt (kan niet in combinatie met closable gebruikt worden).
 *
 * @see {@link http://www.github.com/milieuinfo/webcomponent-vl-ui-pill/releases/latest|Release notes}
 * @see {@link http://www.github.com/milieuinfo/webcomponent-vl-ui-pill/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-pill.html|Demo}
 */
export class VlPill extends VlElement(HTMLElement) {
  static get EVENTS() {
    return {
      close: 'vl-pill-close',
      check: 'vl-pill-check'
    };
  }
  constructor() {
    super(`
      <style>
          @import "/src/style.css";
      </style>
      ${VlPill._standardPillTemplate}
    `);
  }

  /**
   * Is de pill aangevinkt?
   *
   * @returns {boolean} Geeft terug of de pill aangevinkt is. Als de pill niet checkable is, wordt undefined teruggegeven.
   */
  get checked() {
    const checkbox = this._checkbox;
    if (checkbox) {
      return !!checkbox.checked;
    }
  }

  /**
   * Vinkt de pill aan of uit. Als de pill niet checkable is, gebeurt er niets.
   *
   * @param {boolean} checked - Of de pill aangevinkt moet zijn of niet.
   */
  set checked(checked) {
    const checkbox = this._checkbox;
    if (checkbox) {
      checkbox.checked = checked;
      this._checked();
    }
  }

  get _classPrefix() {
    return 'vl-pill--';
  }

  static get _observedAttributes() {
    return ['type', 'closable', 'checkable'];
  }

  get _pillTemplate() {
    if (this.hasAttribute('checkable')) {
      return VlPill._checkablePillTemplate;
    } else if (this.hasAttribute('closable')) {
      return VlPill._closablePillTemplate;
    } else {
      return VlPill._standardPillTemplate;
    }
  }

  static get _standardPillTemplate() {
    return `
      <span class="vl-pill">
        <slot></slot>
      </span>
    `;
  }

  static get _closablePillTemplate() {
    return `
      <div class="vl-pill vl-pill--closable">
        <slot></slot>
        <button id="close" class="vl-pill__close" type="button">
          <span class="vl-u-visually-hidden">Verwijderen</span>
        </button>
      </div>
    `;
  }

  static get _checkablePillTemplate() {
    return `
      <label class="vl-pill vl-pill--checkable" for="checkbox">
        <input class="vl-pill--checkable__checkbox" type="checkbox" id="checkbox" name="checkbox" value="checked"/>
        <span></span> <slot></slot>
      </label>
    `;
  }

  get _checkbox() {
    return this.shadowRoot.querySelector('#checkbox');
  }

  get _closeButton() {
    return this.shadowRoot.querySelector('#close');
  }

  __removeClosableEventListeners() {
    const closeButton = this._closeButton;
    if (closeButton) {
      closeButton.removeEventListener('click', this._closeClicked);
    }
  }

  __removeCheckableEventListeners() {
    const checkbox = this._checkbox;
    if (checkbox) {
      checkbox.removeEventListener('click', this._checked);
    }
  }

  __removeEventListeners() {
    this.__removeClosableEventListeners();
    this.__removeCheckableEventListeners()
  }

  __addClosableEventListeners() {
    const closeButton = this._closeButton;
    if (closeButton) {
      closeButton.addEventListener('click', this._closeClicked);
    }
  }

  __addCheckableEventListeners() {
    const checkbox = this._checkbox;
    if (checkbox) {
      checkbox.addEventListener('click', this._checked);
    }
  }

  __addEventListeners() {
    this.__addClosableEventListeners();
    this.__addCheckableEventListeners();
  }

  _redraw() {
    this.__removeEventListeners();
    this._shadow.lastElementChild.replaceWith(this._template(this._pillTemplate));
    this.__addEventListeners();
  }

  _closeClicked() {
    this.dispatchEvent(new CustomEvent(VlPill.EVENTS.close, { composed: true, bubbles: true }));
  }

  _checked() {
    this.dispatchEvent(new CustomEvent(VlPill.EVENTS.check, {
      composed: true,
      bubbles: true,
      detail: {
        checked: this.checked
      }
    }));
  }

  _closableChangedCallback() {
    this._redraw();
  }

  _checkableChangedCallback() {
    this._redraw();
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