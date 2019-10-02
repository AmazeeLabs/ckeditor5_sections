/**
 * @module templates/elements/textelement
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import { enablePlaceholder } from '@ckeditor/ckeditor5-engine/src/view/placeholder';

import TemplateEditing from '../templateediting';
import { downcastTemplateElement, getModelAttributes } from '../utils/conversion';
import TableEditing from '@ckeditor/ckeditor5-table/src/tableediting';

/**
 * Element names that are considered multiline containers by default.
 *
 * @type {string[]}
 */
export const containerElements = [
	'div',
	'li',
	'blockquote',
	'td',
];

/**
 * Check if an element is a container and therefore allows block elements inside.
 *
 * By default html elements that allow blocks are considered containers. This can be
 * overridden with the `ck-multiline` attribute.
 *
 * @param {module:template/utils/elementinfo~ElementInfo} templateElement
 * @returns {boolean}
 */
function isContainerElement( templateElement ) {
	return templateElement.configuration.input === 'full';
}

export default class TextElement extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ TemplateEditing, TableEditing ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const textElements = this.editor.templates.getElementsByType( 'text' );

		// If the current element is a container, allow bock elements inside it.
		this.editor.model.schema.extend( '$block', {
			allowIn: textElements.filter( isContainerElement ).map( el => el.name ),
		} );

		// If the current element is not a container, only allow text.
		this.editor.model.schema.extend( '$text', {
			allowIn: textElements.filter( el => !isContainerElement( el ) ).map( el => el.name ),
		} );

		// All container text elements inherit everything from root.
		// This also makes sure that all elements allowed in root are as well allowed here.
		for ( const element of textElements ) {
			if ( element.configuration.input === 'table' ) {
				this.editor.model.schema.extend( 'table', {
					allowIn: element.name,
				} );
			}
			if ( element.configuration.input === 'full' ) {
				this.editor.model.schema.extend( element.name, {
					inheritAllFrom: '$root',
				} );
			}
			if ( element.configuration.input === 'plain' ) {
				this.editor.model.schema.addAttributeCheck( (context, attributeName) => {
					if ( context.endsWith( `${ element.name } $text` ) ) {
						return attributeName === 'mention';
					}
				} );
			}
		}

		// Text element editing downcast
		this.editor.conversion.for( 'editingDowncast' ).add( downcastTemplateElement( this.editor, {
			types: [ 'text' ],
			view: ( templateElement, modelElement, viewWriter ) => {
				// TODO: Generalize this?
				if ( modelElement.parent.name === `${ modelElement.name }__conflict__option` ||
					modelElement.parent.name === `${ modelElement.name }__media__conflict__option` ) {
					return viewWriter.createContainerElement(
						templateElement.tagName,
						getModelAttributes( templateElement, modelElement )
					);
				}

				const el = viewWriter.createEditableElement(
					templateElement.tagName,
					getModelAttributes( templateElement, modelElement )
				);

				if ( templateElement.text ) {
					// By default, the placeholder is added right into the element and
					// displayed only when it's not empty. To placeholder elements,
					// e.g. such with ck-input="full", we add an empty paragraph right at
					// the start, so they are never empty. Setting `isDirectHost` to false
					// tells CKEditor to add the placeholder to the first child element
					// instead.
					const isDirectHost = templateElement.configuration.input !== 'full';
					enablePlaceholder( {
						view: this.editor.editing.view,
						element: el,
						text: templateElement.text,
						isDirectHost
					} );
				}

				const widget = templateElement.parent ? el : toWidget( el, viewWriter );

				return toWidgetEditable( widget, viewWriter );
			},
			converterPriority: 'low'
		} ) );

		// Add an empty paragraph if a container text element is empty.
		this.editor.templates.registerPostFixer( [ 'text' ], ( templateElement, modelElement, modelWriter ) => {
			if ( templateElement.configuration.input === 'table' ) {
				if ( modelElement.childCount === 0 ) {
					const rows = 3;
					const columns = 2;
					const table = modelWriter.createElement( 'table' );
					modelWriter.insert( table, modelElement, 'end' );
					for ( let i = 0; i < rows; i++ ) {
						const tableRow = modelWriter.createElement( 'tableRow' );
						modelWriter.insert( tableRow, table, 'end' );
						for ( let j = 0; j < columns; j++ ) {
							const tableCell = modelWriter.createElement( 'tableCell' );
							const paragraph = modelWriter.createElement( 'paragraph' );
							modelWriter.insert( tableCell, tableRow, 'end' );
							modelWriter.insert( paragraph, tableCell, 'end' );
						}
					}
					return true;
				}
			}
			else if (
				isContainerElement( templateElement ) &&
				modelElement.childCount === 0 &&
				this.editor.model.schema.checkChild( modelElement, 'paragraph' )
			) {
				const paragraph = modelWriter.createElement( 'paragraph' );
				modelWriter.insert( paragraph, modelElement, 'end' );

				// This is hacky, however, I couldn't find any other way of detecting
				// a deletion. Without this block deleting text and then pasting it back
				// resulted in appending the text to the placeholder. On the other hand,
				// setting the selection uncoditionally prevented the placeholder from
				// showing up at the time of inserting a section.
				if ( !modelElement.hasAttribute( 'model-element-existing' ) ) {
					modelWriter.setAttribute( 'model-element-existing', 'true', modelElement );
				} else {
					modelWriter.setSelection( paragraph, 'in' );
				}

				return true;
			}
		} );

		// Catch soft linebreaks in text elements with "plain" ck-input attribute.
		this.listenTo( this.editor.editing.view.document, 'enter', ( evt, data ) => {
			// Do nothing if is *not* soft, hard break is handled elsewhere.
			if (!data.isSoft) {
				return ;
			}

			// Determine whether the current element ha "plain" input configuration.
			const modelSelection = this.editor.model.document.selection;
			const element = modelSelection.getSelectedElement() || modelSelection.anchor.parent;
			const info = this.editor.templates.getElementInfo( element.name );

			// Abort if matched to a template with plain input configuration.
			if (info && info.configuration && info.configuration.input === 'plain') {
				data.preventDefault();
				evt.stop();
			}
		}, { priority: 'high' } );

		// Handle delete behaviour.
		this.listenTo( this.editor.editing.view.document, 'delete', ( evt, data ) => {
			this._handleDelete( evt, data );
		}, { priority: 'high' } );
	}

	/**
	 * Handles delete on the text elements (paragraphs) that for some do not act
	 * like the "original" elements outside templates.
	 */
	_handleDelete( evt, data ) {
		// Do nothing when the read only mode is enabled.
		if ( this.editor.isReadOnly ) {
			return;
		}

		const isForward = data.direction == 'forward';
		const modelDocument = this.editor.model.document;
		const modelSelection = modelDocument.selection;

		const element = modelSelection.getSelectedElement() || modelSelection.anchor.parent;
		const info = this.editor.templates.getElementInfo( element.name );
		const isPlainText = info && info.configuration && info.configuration.input === 'plain';

		// Do nothing on non-collapsed selection.
		if ( !modelSelection.isCollapsed ) {
			return;
		}

		const nodeToRemove = modelSelection.anchor.parent;
		// If we are backspacing and the element is "empty" ...
		if (!isForward && modelSelection.focus.isAtEnd && modelSelection.focus.isAtStart)  {
			// Then let's remove the element.
			this.editor.model.change( writer => {
				writer.remove( nodeToRemove );
			} );
			// @note: the normal delete event handling leads to the cursor/selection
			// moving to the previous sibling.
		}
		// If we are forward deleting (delete key), and we are at the _end_ of the
		// element then ...
		else if (isForward && modelSelection.focus.isAtEnd) {
			// check if the element is "empty" (i.e. at end and start simultaneously)
			if (modelSelection.focus.isAtStart) {
				// then we should current element.
				this.editor.model.change(writer => {
					if (nodeToRemove.nextSibling) {
						writer.setSelection(writer.createPositionAt(nodeToRemove.nextSibling, 0));
					}
					writer.remove(nodeToRemove);
				});
			}
			// If we have a next sibling, let's at least move to the next line, but
			// *only* if we are a "multi-line" element. so as not to jump from one
			// template element to the next.
			else if (nodeToRemove.nextSibling && !isPlainText) {
				// then we should current element.
				this.editor.model.change(writer => {
					writer.setSelection(writer.createPositionAt(nodeToRemove.nextSibling, 0));
				});
			}
			// Switch the forwardDelete (aka 'delete' key) to be a 'delete' (aka 'backspace' key).
			// if we are at the end of the document.
			else {
				this.editor.execute('delete');
			}
			data.preventDefault();
			evt.stop();
		}
	}
}
