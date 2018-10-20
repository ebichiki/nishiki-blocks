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
const { Fragment } = wp.element;
const { RichText, InspectorControls, MediaUpload, ColorPalette } = wp.editor;

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
registerBlockType( 'nishiki/hukidashi', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'フキダシ' ), // Block title.
	icon: 'admin-comments', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'nishiki-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'nishiki' ),
		__( 'hukidashi' ),
	],
	attributes: {
		content: {
			source: 'html',
			selector: 'p',
		},
		hukidashiName: {
			source: 'html',
			selector: 'figcaption',
		},
		fontSize:{
			type: 'number',
			default: 16,
		},
		option: {
			type: 'string',
			default: 'baloon-left',
		},
		backgroundImage: {
			type: 'string',
			default: null, // no image by default!
		},
		hukidashiType: {
			type: 'string',
			default: 'type-serif',
		},
		hukidashibgColor: {
			type: 'string',
		},
		hukidashitextColor: {
			type: 'string',
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
		const { content, hukidashiName, option, backgroundImage, hukidashiType, hukidashibgColor, hukidashitextColor, animation, fontSize } = attributes;

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangehukidashiName( newhukidashiName ) {
			setAttributes( { hukidashiName: newhukidashiName } );
		}

		function onChangeOption( newOption ) {
			setAttributes( { option: newOption } );
		}

		function onChangeAnimation( newAnimation ) {
			setAttributes( { animation: newAnimation } );
		}

		function onChangehukidashiType( newhukidashiType ) {
			setAttributes( { hukidashiType: newhukidashiType } );
		}

		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		function onImageSelect( imageObject ) {
			setAttributes( {
				backgroundImage: imageObject.sizes.full.url
			} )
		}

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
							selected={ hukidashiType }
							options={ [
								{ label: 'セリフ', value: 'type-serif' },
								{ label: '考え中', value: 'type-think' }
							] }
							onChange={ onChangehukidashiType }
						/>
						<RadioControl
							label="配置"
							help="吹き出しの配置を指定してください。"
							selected={ option }
							options={ [
								{ label: '左', value: 'baloon-left' },
								{ label: '右', value: 'baloon-right' },
							] }
							onChange={ onChangeOption }
						/>
						<RadioControl
							label="アニメーション"
							help="吹き出しのアニメーションを指定してください。"
							selected={ animation }
							options={ [
								{ label: 'なし', value: 'none' },
								{ label: '振動', value: 'vibration' },
							] }
							onChange={ onChangeAnimation }
						/>
						<PanelColor title={ __( '背景カラー' ) } colorValue={ hukidashibgColor } initialOpen={ true }>
							<ColorPalette
								value={ hukidashibgColor }
								onChange={ ( value ) => setAttributes( { hukidashibgColor: value } ) }
							/>
						</PanelColor>
						<PanelColor title={ __( 'テキストカラー' ) } colorValue={ hukidashitextColor } initialOpen={ true }>
							<ColorPalette
								value={ hukidashitextColor }
								onChange={ ( value ) => setAttributes( { hukidashitextColor: value } ) }
							/>
						</PanelColor>
					</PanelBody>
				</InspectorControls>

				<div className={ `${className} ${option} ${hukidashiType} animation-${animation}` }>
					<div className={ 'image' }>
						<MediaUpload
							onSelect={ onImageSelect }
							type="image"
							value={ backgroundImage }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className={ backgroundImage ? 'image-button' : 'button button-large' }
								>
									{ ! backgroundImage ? 'アイコン選択' : <img src={ backgroundImage } alt={ hukidashiName ? hukidashiName : '画像アップロード' } /> }
								</Button>
							)}
						/>
						<RichText
							tagName="figcaption"
							onChange={ onChangehukidashiName }
							value={ hukidashiName }
							placeholder="アイコン名"
						/>
					</div>
					<RichText
						style={ { background: hukidashibgColor, borderColor: hukidashibgColor, color: hukidashitextColor, fontSize: fontSize + 'px' } }
						tagName="p"
						onChange={ onChangeContent }
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
		const { option, content, hukidashiName, backgroundImage, hukidashiType, hukidashibgColor, hukidashitextColor, animation, fontSize } = attributes;

		return (
			<div className={`${option} ${hukidashiType} animation-${animation}`}>
				<div className={ 'image' }>
					{ backgroundImage ?
						<figure>
							<img
								src={ backgroundImage }
								alt={ hukidashiName ?
									`${hukidashiName}` : '' }
							/>
							<RichText.Content
								tagName="figcaption"
								value={ hukidashiName }
							/>
						</figure> : '' }
				</div>
				<RichText.Content
					className={ 'text' }
					style={ { background: hukidashibgColor, borderColor: hukidashibgColor, color: hukidashitextColor, fontSize: fontSize + 'px' } }
					tagName="p"
					value={ content }
				/>
			</div>
		);
	},
});
