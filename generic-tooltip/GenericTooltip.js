import { randomId } from '../utils/randomId.js';

const random = randomId();

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: relative;
    }

    ::slotted([role="tooltip"]) {
      position: absolute;
      
      top: 100%;
      left: 50%;

      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      
      padding: .5em 1em;

      min-width: -webkit-max-content;
      min-width: -moz-max-content;
      min-width: max-content;
      max-width: 10em;
    }
  </style>
  <slot name="target">
  </slot>
  <slot name="tooltip">
  </slot>
`;

export class GenericTooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.__target = this.querySelector('[slot="target"]');
    this.__tooltip = this.querySelector('[slot="tooltip"]');

    this.__tooltip.hidden = true;
    this.__tooltip.id = `tooltip-${random}`;
    this.__tooltip.setAttribute('role', 'tooltip');

    this.__target.setAttribute('aria-labelledby', `tooltip-${random}`);

    this.addEventListener('focus', this.__show.bind(this));
    this.addEventListener('blur', this.__hide.bind(this));
    this.addEventListener('mouseenter', this.__show.bind(this));
    this.addEventListener('mouseleave', this.__hide.bind(this));
  }

  __show() {
    this.__tooltip.hidden = false;
  }

  __hide() {
    this.__tooltip.hidden = true;
  }
}
