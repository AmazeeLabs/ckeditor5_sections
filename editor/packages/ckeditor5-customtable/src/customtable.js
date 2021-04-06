import Table from '@ckeditor/ckeditor5-table/src/table';
import CustomTableEditing from "./customtableediting";
import CustomTableUI from "./customtableui";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

export default class CustomTable extends Table {

  static get requires() {
	return [ CustomTableEditing, CustomTableUI, Widget ];
  }

  static get pluginName() {
	return 'CustomTable';
  }
}
