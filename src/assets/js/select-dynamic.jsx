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
  	CheckboxControl,
  	TextControl,
} = wp.components;

/**
 * Control render in editor.
 */
addFilter('lzb.editor.control.select_dynamic.render', 'lzb.editor', (render, props, blockData) => {
	return <SelectDynamicControl
	  label={props.data.label}
	  help={props.data.help}
	  entityType={props.data.entity_type}
	  postType={props.data.conditional !== '' ? blockData.attributes[props.data.conditional] : props.data.post_type}
	  taxonomyType={props.data.taxonomy_type}
	  parentEntity={props.data.parent_entity}
	  multiple={ 'true' === props.data.multiple }
	  conditional={props.data.conditional }
	  value={props.getValue()}
	  onChange={props.onChange}
	/>
});

/**
 * Control settings render in lazy block constructor mode.
 */
addFilter('lzb.constructor.control.select_dynamic.settings', 'lzb.constructor', (render, props) => {
	const {
		updateData,
		data,
	} = props;

	return (
	  <Fragment>
		  <PanelBody>
			  <BaseControl
				label={__('Entity Type', '@@text_domain')}
				help={__('Allows you to select the entity type to render as select options', '@@text_domain')}
			  >
				  <RadioControl
					options={[
						{
							label: __('Post Type', '@@text_domain'),
							value: 'post-type',
						}, {
							label: __('Taxonomy Type', '@@text_domain'),
							value: 'taxonomy-type',
						}, {
							label: __('Post', '@@text_domain'),
							value: 'post',
						}, {
							label: __('Page', '@@text_domain'),
							value: 'page',
						}, {
							label: __('Taxonomy', '@@text_domain'),
							value: 'taxonomy',
						}
					]}
					selected={data.entity_type || ''}
					onChange={(value) => updateData({ entity_type: value })}
				  />
			  </BaseControl>

			  {props.data.entity_type && props.data.entity_type === 'post' && (
				<BaseControl
				  label={__('Post type', '@@text_domain')}
				  help={__('Allows you to select a custom post type. Defaults to "Post" if nothing is selected', '@@text_domain')}
				>
					<SelectDynamicControl
					  entityType='post-type'
					  value={props.data.post_type}
					  onChange={(value) => updateData({ post_type: value })}
					/>
				</BaseControl>
			  )}

			  {props.data.entity_type && props.data.entity_type === 'taxonomy' && (
				<BaseControl
				  label={__('Taxonomy type', '@@text_domain')}
				  help={__('Allows you to select a taxonomy type. Defaults to "Category" if nothing is selected', '@@text_domain')}
				>
					<SelectDynamicControl
					  entityType='taxonomy-type'
					  value={props.data.taxonomy_type}
					  onChange={(value) => updateData({ taxonomy_type: value })}
					/>
				</BaseControl>
			  )}

			  {((props.data.entity_type && props.data.entity_type === 'page') || (props.data.taxonomy_type && props.data.taxonomy_type !== 'tags')) && (
				<BaseControl
				  label={__('Parent entity', '@@text_domain')}
				  help={__('Allows you to restrict the select options to a certain parent entity, otherwise leave blank', '@@text_domain')}
				>
					<SelectDynamicControl
					  entityType={props.data.entity_type}
					  postType={props.data.post_type}
					  taxonomyType={props.data.taxonomy_type}
					  value={props.data.parent_entity}
					  onChange={(value) => updateData({ parent_entity: value })}
					/>
				</BaseControl>
			  )}

		  </PanelBody>
		  {(props.data.entity_type && (props.data.entity_type === 'post-type' || props.data.entity_type === 'post' || props.data.entity_type === 'page' || props.data.entity_type === 'taxonomy')) && (
			<PanelBody>
				<BaseControl
				  label={ __( 'Multiple', '@@text_domain' ) }
				  help={ __( 'Allows you to select multiple values', '@@text_domain' ) }
				>
					<CheckboxControl
					  label={ __( 'Yes', '@@text_domain' ) }
					  checked={ 'true' === data.multiple }
					  onChange={ ( value ) => updateData( { multiple: value ? 'true' : 'false' } ) }
					/>
				</BaseControl>
			</PanelBody>
		  )}

		  {(props.data.entity_type && props.data.entity_type === 'post') && (
			<PanelBody>
				<TextControl
				  label={ __( 'Conditional', '@@text_domain' ) }
				  help={ __( 'Allows you to select Posts based on another control value. Please enter the "Name" of the field, where the Post types should be taken from.', '@@text_domain' ) }
				  value={ data.conditional }
				  onChange={ ( value ) => updateData( { conditional: value } ) }
				/>
			</PanelBody>
		  )}
	  </Fragment>
	);
});
