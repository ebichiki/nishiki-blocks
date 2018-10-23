/**
 * BLOCK: nishiki-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Import Class Names.
import classnames from 'classnames';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RangeControl, RadioControl, PanelBody, Button, PanelColor, ToggleControl } = wp.components;
const { InnerBlocks, InspectorControls, ColorPalette, BlockControls, BlockAlignmentToolbar, MediaUpload } = wp.editor;
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
		<path d="M192 96h64v32h-64zM288 96h64v32h-64zM448 96v128h-96v-32h64v-64h-32v-32zM160 192h64v32h-64zM256 192h64v32h-64zM96 128v64h32v32h-64v-128h96v32zM192 288h64v32h-64zM288 288h64v32h-64zM448 288v128h-96v-32h64v-64h-32v-32zM160 384h64v32h-64zM256 384h64v32h-64zM96 320v64h32v32h-64v-128h96v32zM480 32h-448v448h448v-448zM512 0v0 512h-512v-512h512z"/>
	</svg>
);

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType( 'nishiki/section', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'セクション' ), // Block title.
	icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'nishiki-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'nishiki' ),
		__( 'section' ),
	],
	attributes: {
		height: {
			type: 'number',
			default: 320,
		},
		backgroundImage: {
			type: 'string',
			default: null,
		},
		fixed: {
			type: 'boolean',
			default: false,
		},
		overlay: {
			type: 'string',
		},
		opacity:{
			type: 'number',
			default: '20',
		},
		align: {
			type: 'string',
			default: 'full',
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit( { attributes, className, setAttributes } ) {
		const {
			height,
			backgroundImage,
			fixed,
			opacity,
			overlay,
			align,
		} = attributes;

		const classes = classnames(
			className,
			`image-opacity-${opacity}`,
			{
				'has-parallax': fixed,
			}
		);

		return [
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ (value) => setAttributes( { align: value } ) }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title="セクション設定">
						<RangeControl
							label={ __( 'セクションの高さ' ) }
							value={ height }
							min={ 0 }
							max={ 1280 }
							onChange={ (value) => setAttributes( { height: value } ) }
						/>
						<ToggleControl
							label={ __( '背景を固定する' ) }
							checked={ fixed }
							onChange={ (value) => setAttributes( { fixed: ! fixed } ) }
						/>
					</PanelBody>
					<PanelBody title="画像設定">
						<PanelColor title={ __( 'オーバーレイ' ) } colorValue={ overlay } initialOpen={ true }>
							<ColorPalette
								value={ overlay }
								onChange={ ( value ) => setAttributes( { overlay: value } ) }
							/>
						</PanelColor>
						<RangeControl
							label={ __( '背景画像の透明度（％）' ) }
							value={ opacity }
							min={ 0 }
							max={ 100 }
							step={ 10 }
							onChange={ (value) => setAttributes( { opacity: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div
					className={ classes }
					style={ {
						minHeight: height + 'px',
						backgroundColor: overlay,
						backgroundImage: `url(${ backgroundImage })`,
					} }
				>
					<MediaUpload
						onSelect={ (value) => setAttributes( { backgroundImage: value.sizes.full.url } ) }
						type="image"
						value={ backgroundImage }
						render={ ( { open } ) => (
							<Button
								onClick={ open }
								className={ 'image-button button button-large' }
							>
								画像選択
							</Button>
						)}
					/>
					<div className={ 'container' }>
						<InnerBlocks />
					</div>
				</div>

			</Fragment>
		];

	},


	/**
	 * The save function defin className }> which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */


	save( { attributes, className } ) {
		const {
			height,
			backgroundImage,
			fixed,
			opacity,
			overlay,
			align,
		} = attributes;

		const classes = classnames(
			className,
			`image-opacity-${ opacity }`,
			{
				'has-parallax': fixed,
			}
		);

		return (
			<div
				className={ classes }
				style={ {
					minHeight: height + 'px',
					backgroundColor: overlay,
					backgroundImage: `url(${backgroundImage})`,
				} }
			>
				<div className={ 'container' }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});

const withDataAlign = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { align } = props.block.attributes;

		let wrapperProps = props.wrapperProps;
		wrapperProps = { ...wrapperProps, 'data-align': align };

		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
	};
}, 'withDataAlign' );

addFilter( 'editor.BlockListBlock', 'nishiki/section', withDataAlign );
