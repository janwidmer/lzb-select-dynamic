const { withSelect } = wp.data;
const { Component } = wp.element;
const { __ } = wp.i18n;
const { withInstanceId, compose} = wp.compose;
const { SelectControl } = wp.components;

class SelectDynamicControl extends Component {
	render () {
		const { label, value, help, dataType, onChange = () => {}, items, } = this.props;

		let choices = [];

		// check if items are available (means, loading finished)
		if (items) {
			if (items.length === 0) {
				choices.push({
					value: '',
					label: __('No items found', '@@text_domain'),
				});
			} else {
				for (const item of items) {
					if (dataType === 'posts') {
						choices.push({ label: item.title.rendered, value: item.id });
					} else if (dataType === 'pages') {
						choices.push({ label: item.title.rendered, value: item.id });
					} else if (dataType === 'categories') {
						choices.push({ label: item.name, value: item.id });
					}
				}

				choices = [
					{
						value: '',
						label: __('Please Select', '@@text_domain'),
					},
					...choices,
				];
			}
		} else {
			choices.push({
				value: '',
				label: __('Loading..', '@@text_domain'),
			});
		}

		return (
		  <div className="ww-lzb-control_select_dynamic">
			  <SelectControl
				label={ label }
				options={ choices }
				help={ help }
				value={ value }
				className="lzb-gutenberg-select"
				onChange={(val) => {
					onChange(val);
				}}
			  />
		  </div>
		);
	}
}

export default compose([
	withInstanceId,
	withSelect((select, ownProps) => {
		let entityKind = '';
		let entityName = '';
		let query = {};

		if (ownProps.dataType === 'posts') {
			entityKind = 'postType';
			entityName = 'post';
		} else if (ownProps.dataType === 'pages') {
			entityKind = 'postType';
			entityName = 'page';
		} else if (ownProps.dataType === 'categories') {
			entityKind = 'taxonomy';
			entityName = 'category';
		}

		// if a parentEntity has been set, we set it as parent parameter, does not work for posts as they cannot be nested
		if (ownProps.dataType !== 'posts' && ownProps.parentEntity) {
			query['parent'] = ownProps.parentEntity;
		}

		return {
			items: select('core').getEntityRecords(entityKind, entityName, query),
		};
	}),
])(SelectDynamicControl);
