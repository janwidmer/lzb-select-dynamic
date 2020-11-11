const { withSelect } = wp.data;
const { Component } = wp.element;
const { __ } = wp.i18n;
const { withInstanceId, compose} = wp.compose;
const { SelectControl } = wp.components;

const postTypesToIgnore = ['pages', 'media', 'blocks', 'lazyblocks', 'lazyblocks_templates'];

class SelectDynamicControl extends Component {
	render () {
		const { label, value, help, entityType, onChange = () => {}, items, } = this.props;

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
					if (entityType === 'posts') {
						// select options posts
						choices.push({ label: item.title.rendered, value: item.id });
					} else if (entityType === 'pages') {
						// select options pages
						choices.push({ label: item.title.rendered, value: item.id });
					} else if (entityType === 'categories') {
						// select options categories
						choices.push({ label: item.name, value: item.id });
					} else if (entityType === 'post-type') {
						// select options for post types (usage on the lazy blocks constructor page)
						if (postTypesToIgnore.indexOf(item.rest_base) === -1) {
							choices.push({ label: item.labels.singular_name, value: item.slug });
						}
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
		let query = {
			per_page: -1,
		};

		if (ownProps.entityType === 'posts') {
			entityKind = 'postType';
			entityName = ownProps.postType || 'post'; // if a postType is given we use it (to get custom posts)
		} else if (ownProps.entityType === 'pages') {
			entityKind = 'postType';
			entityName = 'page';
		} else if (ownProps.entityType === 'categories') {
			entityKind = 'taxonomy';
			entityName = 'category';
		}

		// if a parentEntity has been set, we set it as parent parameter, does not work for posts as they cannot be nested
		if (ownProps.entityType !== 'posts' && ownProps.parentEntity) {
			query['parent'] = ownProps.parentEntity;
		}

		// lazy block constructor mode to get custom post types
		if (ownProps.entityType === 'post-type') {
			return {
				items: select("core").getPostTypes(),
			};
		} else {
			return {
				items: select('core').getEntityRecords(entityKind, entityName, query),
			};
		}
	}),
])(SelectDynamicControl);
