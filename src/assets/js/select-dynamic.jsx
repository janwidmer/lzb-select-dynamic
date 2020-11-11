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
addFilter('lzb.editor.control.select_dynamic.render', 'lzb.editor', (render, props) => (
  <SelectDynamicControl
	label={props.data.label}
	help={props.data.help}
	entityType={props.data.entity_type}
	customEntity={props.data.custom_entity}
	parentEntity={props.data.parent_entity}
	value={props.getValue()}
	onChange={props.onChange}
  />
));

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
							label: __('Posts', '@@text_domain'),
							value: 'posts',
						},{
							label: __('Custom Posts', '@@text_domain'),
							value: 'posts-custom',
						}, {
							label: __('Pages', '@@text_domain'),
							value: 'pages',
						}, {
							label: __('Categories', '@@text_domain'),
							value: 'categories',
						}
					]}
					selected={data.entity_type || ''}
					onChange={(value) => updateData({ entity_type: value })}
				  />
			  </BaseControl>

			  {props.data.entity_type === 'posts-custom' && (
				<BaseControl
				  label={__('Custom entity', '@@text_domain')}
				  help={__('Allows you to select a custom entity type (posts or taxonomy)', '@@text_domain')}
				>
					<SelectDynamicControl
					  entityType='post-type'
					  value={props.data.custom_entity}
					  onChange={(value) => updateData({ custom_entity: value })}
					/>
				</BaseControl>
			  )}

			  {props.data.entity_type !== 'posts' && props.data.entity_type !== 'posts-custom' && (
				<BaseControl
				  label={__('Parent entity', '@@text_domain')}
				  help={__('Allows you to restrict the select options to a certain parent entity, otherwise leave blank', '@@text_domain')}
				>
					<SelectDynamicControl
					  entityType={props.data.entity_type}
					  customEntity={props.data.custom_entity}
					  value={props.data.parent_entity}
					  onChange={(value) => updateData({ parent_entity: value })}
					/>
				</BaseControl>
			  )}
		  </PanelBody>
	  </Fragment>
	);
});
