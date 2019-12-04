import {LitElement, html, css} from "lit-element";
import styles from "!raw-loader!./date.css";
import EditorElement from "../base/editor-element/editor-element";

export default class Date extends EditorElement {
	static get properties() {
		return {
			value: {},
			max: {},
			min: {},
			step: {},
		};
	}
	render() {
		return html`
			<style>
			${styles}
			</style>
			<input type="date" value="${this.value}" min="${this.min}" max="${this.max}" step="${this.step}">
		`;
	}
}
