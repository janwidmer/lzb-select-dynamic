const { withSelect } = wp.data;
const { Component } = wp.element;
const { __ } = wp.i18n;
const { withInstanceId, compose} = wp.compose;
const { SelectControl } = wp.components;

const postTypesToIgnore = [
	'pages',
	'media',
	'blocks',
	'menu-items',
	'navigation',
	'templates',
	'template-parts',
	'lazyblocks',
	'lazyblocks_templates'
];

class SelectDynamicControl extends Component {
	render () {
		const { label, value, help, entityType, multiple, onChange = () => {}, items, } = this.props;

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
					if (entityType === 'post') {
						// select options post
						choices.push({ label: item.title.rendered, value: item.id });
					} else if (entityType === 'page') {
						// select options page
						choices.push({ label: item.title.rendered, value: item.id });
					} else if (entityType === 'taxonomy') {
						// select options categories
						choices.push({ label: item.name, value: item.id });
					} else if (entityType === 'post-type') {
						if (postTypesToIgnore.indexOf(item.rest_base) === -1) {
							choices.push({ label: item.labels.singular_name, value: item.slug });
						}
					} else if (entityType === 'taxonomy-type') {
						choices.push({ label: item.labels.singular_name, value: item.slug });
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
				multiple={ multiple }
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

		if (ownProps.entityType === 'post') {
			entityKind = 'postType';
			entityName = ownProps.postType || 'post'; // if a postType is given we use it (to get custom posts)
		} else if (ownProps.entityType === 'page') {
			entityKind = 'postType';
			entityName = 'page';
		} else if (ownProps.entityType === 'taxonomy') {
			entityKind = 'taxonomy';
			entityName = ownProps.taxonomyType || 'category'; // if a taxonomyType is given we use it (to get custom taxonomy)
		}

		// does only work for pages / taxonomies other than tags as other entities cannot be nested
		if ((ownProps.entityType === 'page' || (ownProps.entityType === 'taxonomy' && ownProps.taxonomyType !== 'tag')) && ownProps.parentEntity) {
			query['parent'] = ownProps.parentEntity;
		}

		if (ownProps.entityType === 'post-type') {
			return {
				// parameter needed because https://github.com/WordPress/gutenberg/issues/38563
				items: select("core").getPostTypes({ per_page: -1 }),
			};
		} else if (ownProps.entityType === 'taxonomy-type') {
			return {
				items: select("core").getTaxonomies(),
			};
		} else if (ownProps.entityType === 'post' && ownProps.conditional !== '' && Array.isArray(ownProps.postType)) {
			let items = [];

			ownProps.postType.forEach((postType) => {
				const args = [entityKind, postType, query];

				if (!select('core/data').isResolving('core', 'getEntityRecords', args)) {
					const result = select('core').getEntityRecords(entityKind, postType, query);

					if (result !== null) {
						items = [...items, ...result];
					}
				}
			});

			return {
				items,
			};
		} else {
			return {
				items: select('core').getEntityRecords(entityKind, entityName, query),
			};
		}
	}),
])(SelectDynamicControl);
