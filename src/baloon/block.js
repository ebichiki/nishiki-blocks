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
const { Fragment } = wp.element;
const { RichText, InspectorControls, MediaUpload, PanelColorSettings } = wp.editor;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
		<path d="M544 450.583c0 22.75 13.014 42.454 32 52.092v7.969c-5.313 0.727-10.736 1.112-16.25 1.112-34.004 0-64.674-14.264-86.361-37.132-13.111 3.491-27.001 5.376-41.389 5.376-79.529 0-144-57.308-144-128s64.471-128 144-128c79.529 0 144 57.308 144 128 0 27.674-9.882 53.296-26.678 74.233-3.412 7.412-5.322 15.656-5.322 24.35zM115.339 110.593c-33.107 26.899-51.339 61.492-51.339 97.407 0 20.149 5.594 39.689 16.626 58.075 11.376 18.96 28.491 36.293 49.494 50.126 15.178 9.996 25.39 25.974 28.088 43.947 0.9 5.992 1.464 12.044 1.685 18.062 3.735-3.097 7.375-6.423 10.94-9.988 12.077-12.076 28.39-18.745 45.251-18.745 2.684 0 5.381 0.168 8.078 0.512 10.474 1.331 21.172 2.008 31.797 2.010v64c-13.564-0.001-26.877-0.869-39.871-2.521-54.989 54.989-120.625 64.85-184.088 66.298v-13.458c34.268-16.789 64-47.37 64-82.318 0-4.877-0.379-9.665-1.082-14.348-57.898-38.132-94.918-96.377-94.918-161.652 0-114.875 114.615-208 256-208 139.229 0 252.496 90.307 255.918 202.76-20.548-9.158-42.92-14.711-66.131-16.289-5.765-28.034-22.701-54.408-49.126-75.878-17.661-14.349-38.458-25.695-61.814-33.722-24.853-8.54-51.38-12.871-78.847-12.871s-53.994 4.331-78.847 12.871c-23.356 8.027-44.153 19.372-61.814 33.722z"/>
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
registerBlockType( 'nishiki/balloon', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'フキダシ' ), // Block title.
	icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'nishiki-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'nishiki' ),
		__( 'balloon' ),
	],
	attributes: {
		content: {
			source: 'html',
			selector: 'p',
		},
		balloonName: {
			source: 'html',
			selector: 'figcaption',
		},
		balloonType: {
			type: 'string',
			default: 'type-serif',
		},
		balloonBgColor: {
			type: 'string',
		},
		balloonTextColor: {
			type: 'string',
		},
		balloonAlign: {
			type: 'string',
			default: 'balloon-left',
		},
		fontSize:{
			type: 'number',
			default: 16,
		},
		backgroundImage: {
			type: 'string',
			default: null, // no image by default!
		},
		animation:{
			type: 'string',
			default: 'none',
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
			content,
			balloonName,
			balloonType,
			balloonBgColor,
			balloonTextColor,
			balloonAlign,
			backgroundImage,
			animation,
			fontSize,
		} = attributes;

		return [
			<Fragment>
				<InspectorControls>
					<PanelBody title="吹き出し設定">
						<RangeControl
							label={ __( '文字の大きさ' ) }
							value={ fontSize }
							min={ 16 }
							max={ 100 }
							onChange={ (value) => setAttributes( { fontSize: value } ) }
						/>
						<RadioControl
							label="タイプ"
							help="吹き出しのタイプを指定してください。"
							selected={ balloonType }
							options={ [
								{ label: 'セリフ', value: 'type-serif' },
								{ label: '考え中', value: 'type-think' }
							] }
							onChange={ ( value ) => setAttributes( { balloonType: value } ) }
						/>
						<RadioControl
							label="配置"
							help="吹き出しの配置を指定してください。"
							selected={ balloonAlign }
							options={ [
								{ label: '左', value: 'balloon-left' },
								{ label: '右', value: 'balloon-right' },
							] }
							onChange={ ( value ) => setAttributes( { balloonAlign: value } ) }
						/>
						<RadioControl
							label="アニメーション"
							help="吹き出しのアニメーションを指定してください。"
							selected={ animation }
							options={ [
								{ label: 'なし', value: 'none' },
								{ label: '振動', value: 'vibration' },
							] }
							onChange={ ( value ) => setAttributes( { animation: value } ) }
						/>

						<PanelColorSettings
							title={ __( '色設定' ) }
							initialOpen={ true }
							colorSettings={ [
								{
									value: balloonBgColor,
									onChange: ( value ) => setAttributes( { balloonBgColor: value } ),
									label: __( '背景カラー' ),
								},
								{
									value: balloonTextColor,
									onChange: ( value ) => setAttributes( { balloonTextColor: value } ),
									label: __( 'テキストカラー' ),
								},
							] }
						>
						</PanelColorSettings>
					</PanelBody>
				</InspectorControls>

				<div className={ `${ className } ${ balloonAlign } ${ balloonType } animation-${ animation }` }>
					<div className={ 'image' }>
						<MediaUpload
							onSelect={ (value) => setAttributes( { backgroundImage: value.sizes.full.url } ) }
							type="image"
							className={ 'icon-image' }
							value={ backgroundImage }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className={ backgroundImage ? 'image-button' : 'button button-large' }
								>
									{ ! backgroundImage ? 'アイコン選択' : <img className={ 'icon-image' } src={ backgroundImage } alt={ balloonName ? balloonName : '画像アップロード' } /> }
								</Button>
							)}
						/>
						<RichText
							tagName="figcaption"
							onChange={ ( value ) => setAttributes( { balloonName: value } ) }
							value={ balloonName }
							placeholder="アイコン名"
						/>
					</div>
					<RichText
						style={ { background: balloonBgColor, border: balloonBgColor, color: balloonTextColor, fontSize: fontSize + 'px' } }
						tagName="p"
						onChange={ ( value ) => setAttributes( { content: value } ) }
						value={ content }
						placeholder="文字を入れてください"
					/>
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
			content,
			balloonName,
			balloonType,
			balloonBgColor,
			balloonTextColor,
			balloonAlign,
			backgroundImage,
			animation,
			fontSize,
		} = attributes;

		return (
			<div className={ `${ balloonAlign } ${ balloonType } animation-${ animation }` }>
				<div className={ 'image' }>
					{ backgroundImage ?
						<figure>
							<img
								className={ 'icon-image' }
								src={ backgroundImage }
								alt={ balloonName ?
									`${ balloonName }` : '' }
							/>
							<RichText.Content
								tagName="figcaption"
								value={ balloonName }
							/>
						</figure> : '' }
				</div>
				<RichText.Content
					className={ 'text' }
					style={ { background: balloonBgColor, border: balloonBgColor, color: balloonTextColor, fontSize: fontSize + 'px' } }
					tagName="p"
					value={ content }
				/>
			</div>
		);
	},
});
