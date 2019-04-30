// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Link from "@ckeditor/ckeditor5-link/src/link";
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Template from '@amazee/ckeditor5-template/src/template';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

import TemplateEditing from '@amazee/ckeditor5-template/src/templateediting';
import RemoteControl from '@amazee/ckeditor5-template/src/remotecontrol';
import MergeEditing from "@amazee/ckeditor5-template/src/mergeediting";

export default class SectionsEditor extends BalloonEditorBase { }

// Plugins to include in the build.
SectionsEditor.builtinPlugins = [
	RemoteControl,
	Essentials,
	PasteFromOffice,
	Autoformat,
	Bold,
	Italic,
	Subscript,
	Superscript,
	Underline,
	BlockQuote,
	Heading,
	List,
	Paragraph,
	Table,
	TableToolbar,
	BlockToolbar,
	Template,
	TemplateEditing,
	MergeEditing,
  Link,
];

// Editor configuration.
SectionsEditor.defaultConfig = {
	toolbar: {
		items: [
			'bold',
			'italic',
			'link',
			'underline',
      'superscript',
      'subscript',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'insertTable',
			'undo',
			'redo'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	blockToolbar: ['heading', 'insertTable'],
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

window.ckeditor5_sections_builds = window.ckeditor5_sections_builds || {};
window.ckeditor5_sections_builds['ckeditor5_sections/editor_build'] = SectionsEditor;

