// The editor creator to use.
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Template from '@amazee/ckeditor5-template/src/template';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import TemplateEditing from '@amazee/ckeditor5-template/src/templateediting';
import RemoteControl from '@amazee/ckeditor5-template/src/remotecontrol';
import MergeEditing from "@amazee/ckeditor5-template/src/mergeediting";

export default class SectionsEditor extends BalloonEditorBase { }

class PlaceholderConfig extends Plugin {
	init() {
		const templates = this.editor.config.get('templates');
		Placeholder.availableSections = Object.keys(templates)
			.map(id => ({ id, label: templates[id].label, icon: templates[id].icon }));
		Media.previewCallback = this.editor.config.get('drupalMediaRenderer').callback;
    Media.previewEntityCallback = this.editor.config.get('drupalEntityPreview').callback;
    Media.drupalEntitySelector = this.editor.config.get('drupalEntitySelector').callback;
	}
}

// Plugins to include in the build.
SectionsEditor.builtinPlugins = [
	PlaceholderConfig,
	RemoteControl,
	Essentials,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	Heading,
	List,
	Paragraph,
	Table,
	TableToolbar,
	BlockToolbar,
	Template,
	TemplateEditing,
	MergeEditing
];

// Editor configuration.
SectionsEditor.defaultConfig = {
	toolbar: {
		items: [
			'bold',
			'italic',
			'link',
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

