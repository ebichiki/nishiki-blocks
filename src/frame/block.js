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
const { RangeControl, RadioControl, PanelBody, Button, ColorPalette } = wp.components;
const { InnerBlocks, InspectorControls, PanelColorSettings } = wp.editor;
const { Fragment } = wp.element;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
		<path d="M10.69,149.5A10.2,10.2,0,0,1,.5,139.31V10.69A10.2,10.2,0,0,1,10.69.5H139.31A10.2,10.2,0,0,1,149.5,10.69V139.31a10.2,10.2,0,0,1-10.19,10.19Zm2.16-145A8.36,8.36,0,0,0,4.5,12.85v124.3a8.36,8.36,0,0,0,8.35,8.35h124.3a8.36,8.36,0,0,0,8.35-8.35V12.85a8.36,8.36,0,0,0-8.35-8.35Z"/><path d="M139.31,1A9.7,9.7,0,0,1,149,10.69V139.31a9.7,9.7,0,0,1-9.69,9.69H10.69A9.7,9.7,0,0,1,1,139.31V10.69A9.7,9.7,0,0,1,10.69,1H139.31M12.85,146h124.3a8.86,8.86,0,0,0,8.85-8.85V12.85A8.86,8.86,0,0,0,137.15,4H12.85A8.86,8.86,0,0,0,4,12.85v124.3A8.86,8.86,0,0,0,12.85,146M139.31,0H10.69A10.72,10.72,0,0,0,0,10.69V139.31A10.72,10.72,0,0,0,10.69,150H139.31A10.72,10.72,0,0,0,150,139.31V10.69A10.72,10.72,0,0,0,139.31,0ZM12.85,145A7.87,7.87,0,0,1,5,137.15V12.85A7.87,7.87,0,0,1,12.85,5h124.3A7.87,7.87,0,0,1,145,12.85v124.3a7.87,7.87,0,0,1-7.85,7.85Z"/>
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

registerBlockType( 'nishiki/frame', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'フレーム' ), // Block title.
	icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
					<PanelColorSettings
						title={ __( '色設定' ) }
						initialOpen={ true }
						colorSettings={ [
							{
								value: borderColor,
								onChange: ( value ) => setAttributes( { borderColor: value } ),
								label: __( '枠線のカラー' ),
							},
							{
								value: borderBgColor,
								onChange: ( value ) => setAttributes( { borderBgColor: value } ),
								label: __( '枠線の背景カラー' ),
							},
						] }
					>
					</PanelColorSettings>
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
