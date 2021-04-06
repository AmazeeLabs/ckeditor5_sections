import TableEditing from "@ckeditor/ckeditor5-table/src/tableediting";
import SetHighlightColumnCommand
  from "./commands/sethighlightcolumncommand";

export default class CustomTableEditing extends TableEditing {
  init() {
    super.init();
	const editor = this.editor;
	const conversion = editor.conversion;

	editor.model.schema.extend('tableCell', { allowAttributes: "highlighted" });
	editor.model.schema.extend('table', { allowAttributes: "highlightColumns" });
	conversion.attributeToAttribute( { model: 'highlighted', view: 'highlighted' } );
	editor.commands.add( 'setTableColumnHighlight', new SetHighlightColumnCommand( editor ) );
  }
}
