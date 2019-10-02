import { css } from "lit-element";
import { html, svg } from "lit-html";
import EditorElement from "../base/editor-element/editor-element";

/**
 * Static heading element.
 */
export default class Heading extends EditorElement {
	static get properties() {
		return {
			text: { type: String, attribute: "ck-text" },
		};
	}

	render() {
		return html`
			<style>
				:host {
				  font-family: var(--font-family, sans-serif);
				}
			</style>
			<h3>${this.text}</h3>
		`;
	}
}
