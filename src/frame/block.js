/**
 * BLOCK: nishiki-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RangeControl, RadioControl, PanelBody, Button, PanelColor } = wp.components;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { Fragment } = wp.element;

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


registerBlockType( 'nishiki/frame', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'フレーム' ), // Block title.
	icon: 'welcome-widgets-menus', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'nishiki-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'nishiki' ),
		__( 'frame' ),
	],
	attributes: {
		borderWidth: {
			type: 'number',
			default: 1,
		},
		borderRadius: {
			type: 'number',
			default: 2,
		},
		borderPadding: {
			type: 'number',
			default: 20,
		},
		borderStyle: {
			type: 'string',
			default: 'solid',
		},
		borderBgColor: {
			type: 'string',
		},
		borderColor: {
			type: 'string',
		},
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
			borderWidth,
			borderRadius,
			borderStyle,
			borderColor,
			borderPadding,
			borderBgColor
		} = attributes;

		function onChangeborderStyle( newborderStyle ) {
			setAttributes( { borderStyle: newborderStyle } );
		}

		return [
			<Fragment>
				<InspectorControls>
					<PanelBody title="囲み枠設定">
						<RangeControl
							label={ __( '線の太さ' ) }
							value={ borderWidth }
							min={ 0 }
							max={ 50 }
							onChange={ (value) => setAttributes( { borderWidth: value } ) }
						/>
						<RangeControl
							label={ __( 'コーナーの角丸' ) }
							value={ borderRadius }
							min={ 0 }
							max={ 50 }
							onChange={ (value) => setAttributes( { borderRadius: value } ) }
						/>
						<RangeControl
							label={ __( 'コンテンツとの間隔' ) }
							value={ borderPadding }
							min={ 0 }
							max={ 50 }
							onChange={ (value) => setAttributes( { borderPadding: value } ) }
						/>
					</PanelBody>
					<RadioControl
						label={ __( '線のタイプ' ) }
						selected={ borderStyle }
						options={ [
							{ label: 'なし', value: 'none' },
							{ label: '実線', value: 'solid' },
							{ label: '破線', value: 'dashed' },
							{ label: '点線', value: 'dotted' },
							{ label: '2重線', value: 'double' },
						] }
						onChange={ onChangeborderStyle }
					/>
					<PanelColor title={ __( '枠線のカラー' ) } colorValue={ borderColor } initialOpen={ true }>
						<ColorPalette
							value={ borderColor }
							onChange={ ( value ) => setAttributes( { borderColor: value } ) }
						/>
					</PanelColor>
					<PanelColor title={ __( '枠線の背景カラー' ) } colorValue={ borderBgColor } initialOpen={ true }>
						<ColorPalette
							value={ borderBgColor }
							onChange={ ( value ) => setAttributes( { borderBgColor: value } ) }
						/>
					</PanelColor>
				</InspectorControls>

				<div
					className={ className }
					style={ {
						borderWidth: borderWidth + 'px',
						borderRadius: borderRadius + 'px',
						borderStyle: borderStyle,
						padding: borderPadding,
						borderColor: borderColor,
						backgroundColor: borderBgColor
					} }
				>
					<InnerBlocks />
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
			borderWidth,
			borderRadius,
			borderStyle,
			borderColor,
			borderPadding,
			borderBgColor
		} = attributes;

		return (
			<div
				className={ className }
				style={ {
					borderWidth: borderWidth + 'px',
					borderRadius: borderRadius + 'px',
					borderStyle: borderStyle,
					padding: borderPadding,
					borderColor: borderColor,
					backgroundColor: borderBgColor
				} }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
});
