import global from '@ckeditor/ckeditor5-utils/src/dom/global';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';
import { setData as setModelData, getData as getModelData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';
import { getData as getViewData } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import TemplateEditing from '../src/templateediting';

describe( 'TemplateEditing', () => {
	let editorElement, model, view, editor;

	testUtils.createSinonSandbox();

	beforeEach( () => {
		editorElement = global.document.createElement( 'div' );
		global.document.body.appendChild( editorElement );

		return ClassicTestEditor
			.create( editorElement, {
				plugins: [ TemplateEditing ],
				templates: {
					simple: {
						label: 'Simple',
						template: '<div class="simple"></div>',
					},
					classes: {
						label: 'Classes',
						template: '<div class="b a"></div>',
					},
					attribute: {
						label: 'Simple',
						template: '<div class="attribute" data-foo="foo"></div>',
					},
					nested: {
						label: 'Nested',
						template: '<div class="parent"><div class="nested"></div></div>',
					},
					double_nested: {
						label: 'Double Nested',
						template: '<div class="grandma"><div class="ma"><div class="me"></div></div></div>',
					},
					ordered: {
						label: 'Ordered',
						template: '<div class="ordered"><div class="first" data-foo=""></div><div class="second" data-foo="b"></div></div>',
					},
				}
			} )
			.then( newEditor => {
				editor = newEditor;
				model = editor.model;
				view = editor.editing.view;
			} );
	} );

	afterEach( () => {
		editorElement.remove();
		return editor.destroy();
	} );

	it( 'should load dependencies', () => {
		expect( editor.plugins.get( Widget ) ).to.instanceOf( Widget );
	} );

	it( 'initialises template elements', () => {
		const plugin = editor.plugins.get( TemplateEditing );
		expect( plugin._elements.ck__simple.name ).to.equal( 'ck__simple' );
		expect( plugin._elements.ck__nested.name ).to.equal( 'ck__nested' );
		expect( plugin._elements.ck__nested__child0.name ).to.equal( 'ck__nested__child0' );
	} );

	it( 'upcasts simple elements', () => {
		editor.setData( '<div class="simple"></div>' );
		expect( getModelData( model ) ).to.equal( '[<ck__simple></ck__simple>]' );
	} );

	it( 'upcasts elements with multiple classes', () => {
		editor.setData( '<div class="a b"></div>' );
		expect( getModelData( model ) ).to.equal( '[<ck__classes></ck__classes>]' );
	} );

	it( 'properly data downcasts elements with multiple classes', () => {
		setModelData( model, '<ck__classes></ck__classes>' );
		expect( editor.getData() ).to.equal( '<div class="a b">&nbsp;</div>' );
	} );

	it( 'properly editing downcasts elements with multiple classes', () => {
		setModelData( model, '<ck__classes></ck__classes>' );
		expect( getViewData( view ) ).to.equal( '[<div ck-icon="configurator" ck-label="Classes" ck-name="classes"' +
			' class="a b ck-widget ck-widget_selected" contenteditable="false"></div>]' );
	} );

	it( 'ignores unknown elements ', () => {
		editor.setData( '<div class="unknown"></div>' );
		expect( getModelData( model ) ).to.equal( '[]' );
	} );

	it( 'upcasts nested elements', () => {
		editor.setData( '<div class="parent"><div class="nested"></div></div>' );
		expect( getModelData( model ) ).to.equal( '[<ck__nested><ck__nested__child0></ck__nested__child0></ck__nested>]' );
	} );

	it( 'upcasts double nested', () => {
		editor.setData( '<div class="grandma"><div class="ma"><div class="me"></div></div></div>' );
		expect( getModelData( model ) ).to.equal( '[' +
			'<ck__double_nested>' +
              '<ck__double_nested__child0>' +
                '<ck__double_nested__child0__child0></ck__double_nested__child0__child0>' +
              '</ck__double_nested__child0>' +
			'</ck__double_nested>' +
			']' );
	} );

	it( 'upcasts attributes', () => {
		editor.setData( '<div class="attribute" data-foo="bar"></div>' );
		expect( getModelData( model ) ).to.equal( '[<ck__attribute data-foo="bar"></ck__attribute>]' );
	} );

	it( 'auto-adds attributes with default values', () => {
		editor.setData( '<div class="attribute"></div>' );
		expect( getModelData( model ) ).to.equal( '[<ck__attribute data-foo="foo"></ck__attribute>]' );
	} );

	it( 'ignores unknown attributes', () => {
		editor.setData( '<div class="attribute" data-bar="foo"></div>' );
		expect( getModelData( model ) ).to.equal( '[<ck__attribute data-foo="foo"></ck__attribute>]' );
	} );

	it( 'downcasts simple elements', () => {
		setModelData( model, '<ck__simple></ck__simple>' );
		expect( editor.getData() ).to.equal( '<div class="simple">&nbsp;</div>' );
	} );

	it( 'downcasts nested elements', () => {
		setModelData( model, '<ck__nested><ck__nested__child0></ck__nested__child0></ck__nested>' );
		expect( editor.getData() ).to.equal( '<div class="parent"><div class="nested">&nbsp;</div></div>' );
	} );

	it( 'downcasts attributes to data', () => {
		setModelData( model, '<ck__attribute data-foo="bar"></ck__attribute>' );
		expect( editor.getData() ).to.equal( '<div class="attribute" data-foo="bar">&nbsp;</div>' );
	} );

	it( 'downcasts attributes to editing', () => {
		setModelData( model, '<ck__attribute data-foo="bar"></ck__attribute>' );
		expect( getViewData( view ) ).to.equal(
			'[<div ck-icon="configurator" ck-label="Simple" ck-name="attribute"' +
			' class="attribute ck-widget ck-widget_selected" contenteditable="false" data-foo="bar"></div>]'
		);
	} );

	it( 'fixes missing children ', () => {
		editor.setData( '<div class="parent"></div></div>' );
		expect( getModelData( model ) ).to.equal( '[<ck__nested><ck__nested__child0></ck__nested__child0></ck__nested>]' );
	} );

	it( 'fixes missing grandchildren', () => {
		editor.setData( '<div class="grandma"></div>' );
		expect( getModelData( model ) ).to.equal( '[' +
            '<ck__double_nested>' +
              '<ck__double_nested__child0>' +
                '<ck__double_nested__child0__child0></ck__double_nested__child0__child0>' +
              '</ck__double_nested__child0>' +
            '</ck__double_nested>' +
			']' );
	} );

	it( 'fixes invalid children ', () => {
		editor.setData( '<div class="parent"><div class="unknown"></div></div>' );
		expect( getModelData( model ) ).to.equal( '[<ck__nested><ck__nested__child0></ck__nested__child0></ck__nested>]' );
	} );

	it( 'fixes wrongly ordered children', () => {
		editor.setData( '<div class="ordered"><div class="second" data-foo="b"></div><div class="first" data-foo="a"></div></div>' );
		expect( getModelData( model ) ).to.equal(
			'[<ck__ordered>' +
			'<ck__ordered__child0 data-foo="a"></ck__ordered__child0>' +
			'<ck__ordered__child1 data-foo="b"></ck__ordered__child1>' +
			'</ck__ordered>]'
		);
	} );

	it( 'renders templates as widgets', () => {
		setModelData( model, '<ck__simple></ck__simple>' );
		expect( getViewData( view ) ).to.equal( '[<div ck-icon="configurator" ck-label="Simple" ck-name="simple"' +
			' class="ck-widget ck-widget_selected simple" contenteditable="false"></div>]' );
	} );

	it( 'renders only outer elements widgets', () => {
		setModelData( model, '<ck__nested><ck__nested__child0></ck__nested__child0></ck__nested>' );
		expect( getViewData( view ) ).to.equal(
			'[<div ck-icon="configurator" ck-label="Nested" ck-name="nested"' +
			' class="ck-widget ck-widget_selected parent" contenteditable="false">' +
			'<div class="nested"></div>' +
			'</div>]'
		);
	} );
} );
