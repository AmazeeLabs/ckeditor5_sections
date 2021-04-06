/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/commands/setheadercolumncommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';

import { findAncestor } from '@ckeditor/ckeditor5-table/src/commands/utils';
import TableWalker from "@ckeditor/ckeditor5-table/src/tablewalker";

/**
 * The header column command.
 *
 * The command is registered by {@link module:table/tableediting~TableEditing} as `'setTableColumnHeader'` editor command.
 *
 * You can make the column containing the selected cell a [header](https://www.w3.org/TR/html50/tabular-data.html#the-th-element)
 * by executing:
 *
 *		editor.execute( 'setTableColumnHeader' );
 *
 * **Note:** All preceding columns will also become headers. If the current column is already a header, executing this command
 * will make it a regular column back again (including the following columns).
 *
 * @extends module:core/command~Command
 */
export default class SetHighlightColumnCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const model = this.editor.model;
		const doc = model.document;
		const selection = doc.selection;

		const position = selection.getFirstPosition();
		const tableCell = findAncestor( 'tableCell', position );

		const isInTable = !!tableCell;

		this.isEnabled = isInTable;

		/**
		 * Flag indicating whether the command is active. The command is active when the
		 * {@link module:engine/model/selection~Selection} is in a header column.
		 *
		 * @observable
		 * @readonly
		 * @member {Boolean} #value
		 */
		if (isInTable) {
		  console.log('Checking: ', tableCell, 'Result: ', this._isInHighligthedColumns(tableCell, tableCell.parent.parent));
		}
		this.value = isInTable && this._isInHighligthedColumns( tableCell, tableCell.parent.parent );
	}

	/**
	 * Executes the command.
	 *
	 * When the selection is in a non-header column, the command will set the `headingColumns` table attribute to cover that column.
	 *
	 * When the selection is already in a header column, it will set `headingColumns` so the heading section will end before that column.
	 *
	 * @fires execute
	 */
	execute() {
		const model = this.editor.model;
		const doc = model.document;
		const selection = doc.selection;
		const tableUtils = this.editor.plugins.get( 'TableUtils' );

		const position = selection.getFirstPosition();
		const tableCell = findAncestor( 'tableCell', position.parent );
		const tableRow = tableCell.parent;
		const table = tableRow.parent;

		const { column: selectionColumn } = tableUtils.getCellLocation( tableCell );
		const currentHighligtedColumns = this._getHighlightedColumns(table);
	  	let highlightColumns = [];
		if (!currentHighligtedColumns.includes(selectionColumn.toString())) {
		  highlightColumns = [... new Set([... this._getHighlightedColumns(table), selectionColumn.toString()])];
		} else {
		  highlightColumns = [... new Set([... this._getHighlightedColumns(table)])].filter(item => item !== selectionColumn.toString());
		}

		model.change( writer => {
			writer.setAttribute('highlightColumns', highlightColumns.join(','), table);

			const tableWalker = new TableWalker( table, { includeSpanned: true} );
			for ( const { row, column } of [ ...tableWalker ] ) {
			  const cell = table.getNodeByPath([row, column]);
			  if (highlightColumns.includes(column.toString())) {
				writer.setAttribute('highlighted', '1', cell);
			  } else {
			    writer.removeAttribute('highlighted', cell);
			  }
			}
		} );
	}

	/**
	 * Checks if a table cell is in the heading section.
	 *
	 * @param {module:engine/model/element~Element} tableCell
	 * @param {module:engine/model/element~Element} table
	 * @returns {Boolean}
	 * @private
	 */
	_isInHighligthedColumns(tableCell, table ) {
		const highlightColumns = this._getHighlightedColumns(table);

		const tableUtils = this.editor.plugins.get( 'TableUtils' );

		const { column } = tableUtils.getCellLocation( tableCell );

		return highlightColumns.includes(column.toString());
	}

	_getHighlightedColumns(table) {
	  const highlightColumnsString = table.getAttribute( 'highlightColumns' ) || '';
	  return highlightColumnsString.split(',');
	}
}
