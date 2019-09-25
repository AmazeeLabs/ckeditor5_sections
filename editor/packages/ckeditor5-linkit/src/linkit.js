import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LinkUI from '@ckeditor/ckeditor5-link/src/linkui';
import findLinkRange from "@ckeditor/ckeditor5-link/src/findlinkrange";


const linkitIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><g fill-rule="evenodd"><path d="M7.41 10.533l.701-1.002a.532.532 0 0 1 .87.609l-.813 1.16a.529.529 0 0 1-.153.146 3.716 3.716 0 0 1-2.686 1.148 3.734 3.734 0 0 1-3.717-3.716c0-.572.132-1.135.385-1.647a.524.524 0 0 1 .085-.194l.811-1.16a.53.53 0 1 1 .87.609L3.06 7.49l.004.002a2.657 2.657 0 0 0-.391 1.386 2.667 2.667 0 0 0 2.654 2.654c.808 0 1.574-.368 2.077-1.001l.005.003zm.659-5.568a.532.532 0 0 1 .13.74L5.966 8.893a.532.532 0 0 1-.87-.609l2.233-3.189a.532.532 0 0 1 .74-.13zm3.23 1.792a.529.529 0 0 1-.086.194l-.812 1.16a.53.53 0 1 1-.869-.609l.609-.87c.306-.443.47-.97.47-1.507a2.667 2.667 0 0 0-2.655-2.654c-.858 0-1.666.417-2.164 1.117l-.608.87a.532.532 0 0 1-.87-.61l.812-1.16a.529.529 0 0 1 .154-.146 3.716 3.716 0 0 1 2.686-1.148 3.734 3.734 0 0 1 3.716 3.717c0 .571-.131 1.134-.384 1.646z"/><path d="M-190.335-828.811c-215.066 13.6-414.933 129.066-534.933 309.2-92.533 139.066-132.133 303.066-112.933 469.333 24.666 214.266 149.466 407.733 334.533 518.266 90.267 54 181.467 84.267 290.667 96.4 20.8 2.4 95.466 3.2 119.333 1.467 116-8.933 230.533-46.533 323.2-106.4l9.2-6 202.133 202c111.2 111.067 204.267 203.067 206.8 204.533 6.933 3.6 25.733 3.334 38-.8 13.333-4.4 32.933-14.8 44.8-23.733 16.4-12.4 27.333-22.8 65.733-62.533 38.134-39.2 47.6-51.067 57.467-72 9.867-20.667 12.533-42.267 6.8-53.867-1.333-2.533-92.8-95.2-205.867-208.267-197.2-197.333-203.466-203.866-201.733-206.666 34.933-56 66.267-132.134 82.667-201.067 20.133-84.8 24.133-177.733 11.333-266-24-165.733-112-322.8-241.867-431.6-138.8-116.266-314-173.733-495.333-162.266zm78.667 231.866c146.533 10.934 275.333 86 356.4 208 41.333 62.133 65.6 129.067 75.2 208 2.266 18.667 2.266 80.267-.134 99.333-9.6 79.6-35.2 149.2-78.4 212.667-56.933 83.467-139.733 146.933-233.733 178.933-49.2 16.667-89.333 23.734-142.666 24.667-36.134.667-58.667-.933-89.6-6.267-208.667-36.4-367.334-209.866-385.2-421.066-2-23.867-.8-77.6 2.133-98.934 7.333-53.066 20.667-97.2 44-144.666 24.4-49.867 52.8-89.333 92.667-128.533 94.133-92.8 227.6-141.867 359.333-132.134z"/><path d="M-134.44-836.654c-215.066 13.6-414.933 129.067-534.933 309.2-92.533 139.067-132.133 303.067-112.933 469.333 24.666 214.267 149.466 407.734 334.533 518.267 90.267 54 181.467 84.267 290.667 96.4 20.8 2.4 95.466 3.2 119.333 1.467 116-8.934 230.533-46.534 323.2-106.4l9.2-6 202.133 202c111.2 111.066 204.267 203.066 206.8 204.533 6.933 3.6 25.733 3.333 38-.8 13.333-4.4 32.933-14.8 44.8-23.733 16.4-12.4 27.333-22.8 65.733-62.534 38.134-39.2 47.6-51.066 57.467-72 9.867-20.666 12.533-42.266 6.8-53.866-1.333-2.534-92.8-95.2-205.867-208.267-197.2-197.333-203.466-203.867-201.733-206.667 34.933-56 66.267-132.133 82.667-201.066 20.133-84.8 24.133-177.734 11.333-266-24-165.734-112-322.8-241.867-431.6-138.8-116.267-314-173.734-495.333-162.267zm78.667 231.867c146.533 10.933 275.333 86 356.4 208 41.333 62.133 65.6 129.066 75.2 208 2.266 18.666 2.266 80.266-.134 99.333-9.6 79.6-35.2 149.2-78.4 212.667C240.36 206.679 157.56 270.146 63.56 302.146c-49.2 16.667-89.333 23.733-142.666 24.667-36.134.666-58.667-.934-89.6-6.267-208.667-36.4-367.334-209.867-385.2-421.067-2-23.866-.8-77.6 2.133-98.933 7.333-53.067 20.667-97.2 44-144.667 24.4-49.866 52.8-89.333 92.667-128.533 94.133-92.8 227.6-141.867 359.333-132.133z"/></g><path d="M13.33 9.544a3.86 3.86 0 0 0-3.575 4.295 3.86 3.86 0 0 0 3.45 3.391c.114.013.526.018.658.008a3.881 3.881 0 0 0 1.783-.587l.05-.033 1.116 1.114c.614.613 1.127 1.12 1.14 1.129.04.02.143.018.21-.005.074-.024.182-.081.248-.13.09-.069.15-.126.362-.346.21-.216.263-.281.317-.397.055-.114.07-.233.038-.297a75.128 75.128 0 0 0-1.136-1.149c-1.088-1.089-1.122-1.125-1.113-1.14.193-.31.366-.73.456-1.11.111-.467.133-.98.063-1.467a3.87 3.87 0 0 0-1.335-2.381 3.85 3.85 0 0 0-2.732-.895zm.434 1.279c.808.06 1.519.474 1.966 1.147.228.343.362.713.415 1.148.012.103.012.443 0 .548a2.584 2.584 0 0 1-1.723 2.16c-.271.092-.493.131-.787.137a2.34 2.34 0 0 1-.494-.035 2.582 2.582 0 0 1-2.125-2.323 3.615 3.615 0 0 1 .011-.546 2.5 2.5 0 0 1 .243-.798 2.581 2.581 0 0 1 2.494-1.438z"/></svg>`;

/**
 * Event type to communicate with an external user interface.
 *
 * @see RequestInformationEvent in the ckeditor5_sections/editor/components/components/base/editor-element/editor-element.js.
 */
class LinkitInformationEvent extends CustomEvent {
  constructor(type, payload, callback) {
    super(`ck-editor:${type}`, {
      detail: payload,
      bubbles: true,
      composed: true
    });
    this.callback = callback;
  }

  /**
   * Respond to this event.
   *
   * @param detail
   */
  respond(detail) {
    this.callback(detail);
  }
}

/**
 * @extends module:core/plugin~Plugin
 */
export default class Linkit extends Plugin {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    editor.config.define('link.linkit', []);
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;
    const linkUI = editor.plugins.get(LinkUI);
    this.linkUI = linkUI;
    this.linkFormView = linkUI.formView;
    this.linkitButton = this._createLinkitButton();

    this.linkFormView.once('render', () => {
      // Render button's template.
      this.linkitButton.render();
      // Register the button under the link form view, it will handle its destruction.
      this.linkFormView.registerChild(this.linkitButton);
      // Inject the element into DOM.
      this.linkFormView.element.insertBefore(this.linkitButton.element, this.linkFormView.saveButtonView.element);
    });

    // Extend the schema with our custom attributes, and add the upcast and
    // downcast callbacks.
    const attributes = this.customAttributes();
    for ( const attrId in attributes ) {
      editor.model.schema.extend( '$text', { allowAttributes: attrId } );

      // Code structure taken from the LinkEditing Plugin, the
      // _enableManualDecorators() method.
      const upcastAttributes = {};
      upcastAttributes[attributes[attrId]] = true;
      editor.conversion.for( 'upcast' ).elementToAttribute( {
        view: {
          name: 'a',
          attributes: upcastAttributes,
        },
        model: {
          key: attrId,
          value: viewElement => viewElement.getAttribute( attributes[attrId] )
        }
      } );

      editor.conversion.for( 'downcast' ).attributeToElement( {
        model: attrId,
        view: ( attrValue, writer ) => {
          const elementAttributes = {};
          elementAttributes[attributes[attrId]] = attrValue;
          const element = writer.createAttributeElement( 'a', elementAttributes, { priority: 5 } );
          writer.setCustomProperty( 'link', true, element );

          return element;
        } } );
    }
  }

  _createLinkitButton() {
    const editor = this.editor;
    const button = new ButtonView(this.locale);

    button.set({
      label: 'Linkit',
      icon: linkitIcon,
      withText: false,
      tooltip: true
    });

    button.on('execute', () => {
      // Hide the default linkUI.
      this.linkUI._hideUI();
      this.requestInformation('select-link', {
        'link-target': this.linkFormView.urlInputView.value || '',
      }, link => {
        if (link.href !== null) {
          editor.execute( 'link', link.href, this.linkFormView.getDecoratorSwitchesState() );

          // Update our custom entity attributes. The code structure was taken
          // from the LinkCommand::execute() method.
          const model = this.editor.model;
          const selection = model.document.selection;
          model.change( writer => {
            const attributes = this.customAttributes();
            if (selection.isCollapsed) {
              const position = selection.getFirstPosition();
              if ( selection.hasAttribute( 'linkHref' ) ) {
                const linkRange = findLinkRange( position, selection.getAttribute( 'linkHref' ), model );
                for ( const attrId in attributes ) {
                  if (link[attributes[attrId]] != '_ignore') {
                    writer.setAttribute(attrId, link[attributes[attrId]], linkRange);
                  }
                }
              }
            } else {
              const ranges = model.schema.getValidRanges( selection.getRanges(), 'linkHref' );
              for ( const range of ranges ) {
                for ( const attrId in attributes ) {
                  if (link[attributes[attrId]] != '_ignore') {
                    writer.setAttribute(attrId, link[attributes[attrId]], range);
                  }
                }
              }
            }
          });
        }
      });
    });

    return button;
  }

  /**
   * Returns the linkit custom attributes for the entity type, uuid and
   * substitution.
   *
   * @returns {{dataEntityUUID: string, dataEntitySubstitution: string, dataEntityType: string}}
   */
  customAttributes() {
    return {
      dataEntityType: 'data-entity-type',
      dataEntityUUID: 'data-entity-uuid',
      dataEntitySubstitution: 'data-entity-substitution',
    };
  }

  /**
   * Request information from outside systems.
   *
   * @param type String
   *   The type of information required.
   * @param detail Object
   *   Arbitrary additional information.
   * @param callback
   *   Callback that is invoked when information is returned.
   */
  requestInformation(type, detail, callback) {
    this.editor.sourceElement.dispatchEvent(new LinkitInformationEvent(type, detail, callback));
  }
}
