/**
 * Script for Select Dynamic Control
 */
import SelectDynamicControl from './select-dynamic-control';

const {
    addFilter,
} = wp.hooks;

const { __ } = wp.i18n;

const {
    Fragment,
} = wp.element;

const {
    PanelBody,
    BaseControl,
    RadioControl,
} = wp.components;

/**
 * Control render in editor.
 */
addFilter( 'lzb.editor.control.select_dynamic.render', 'lzb.editor', ( render, props ) => (
    <SelectDynamicControl
      label={ props.data.label }
      help={ props.data.help }
      dataType={ props.data.data_type }
      parentEntity={ props.data.parent_entity }
      value={ props.getValue() }
      onChange={ props.onChange }
    />
) );

/**
 * Control settings render in constructor.
 */
addFilter( 'lzb.constructor.control.select_dynamic.settings', 'lzb.constructor', ( render, props ) => {
    const {
        updateData,
        data,
    } = props;

    return (
      <Fragment>
          <PanelBody>
              <BaseControl
                label={ __( 'Data Type', '@@text_domain' ) }
                help={ __( 'Allows you to select the data type to render as select options', '@@text_domain' ) }
              >
                  <RadioControl
                    options={ [
                        {
                            label: __( 'Posts', '@@text_domain' ),
                            value: 'posts',
                        }, {
                            label: __( 'Pages', '@@text_domain' ),
                            value: 'pages',
                        }, {
                            label: __( 'Categories', '@@text_domain' ),
                            value: 'categories',
                        }
                    ] }
                    selected={ data.data_type || 'posts' }
                    onChange={ ( value ) => updateData( { data_type: value } ) }
                  />
              </BaseControl>
              <BaseControl
                label={ __( 'Parent entity', '@@text_domain' ) }
                help={ __( 'Allows you to restrict the select options to a certain parent entity, otherwise leave blank', '@@text_domain' ) }
              >
                  <SelectDynamicControl
                    dataType={ props.data.data_type }
                    value={ props.data.parent_entity }
                    onChange={ ( value ) => updateData( { parent_entity: value } ) }
                  />
              </BaseControl>
          </PanelBody>
      </Fragment>
    );
} );
