import React from 'react'
import { connect } from 'react-redux'
import { change, Field } from 'redux-form'
import { stateToHTML } from 'draft-js-export-html'
import { BsInput as Input } from '../../fields/adapters'
import { Editor, EditorState, RichUtils, Entity, AtomicBlockUtils } from 'draft-js'
// import { Editor, EditorState, RichUtils, convertToRaw, Entity, AtomicBlockUtils } from 'draft-js'
import { BsField as FormField } from '../../fields/widgets'

class SiteEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }

    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => {
      this.setState({ editorState })
      let state = editorState.getCurrentContent()
      let htmlStr = stateToHTML(state)
      this.props.dispatch(change('TRIP_CREATE_SITE', 'introduce', htmlStr))
            // this.addImage()

    }

    this.onImageUpload = (e) => this._onImageUpload(e)
    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.onTab = (e) => this._onTab(e)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    this.addImage = () => this._addImage()
  }

  _onImageUpload(e){
    console.log(e.target.value)
    console.log(e)
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _onTab(e) {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }

  _toggleBlockType(blockType) {
    this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
  }

  _addImage() {
    const urlValue = 'http://i.imgur.com/Ceihz91.png'
    const urlType = 'image'
    const { editorState } = this.state
    const entityKey = Entity.create(urlType, 'IMMUTABLE', { src: urlValue })

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
                editorState,
                entityKey,
                ' '
            ),
    })
  }

  render() {
    const { editorState } = this.state

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    const contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <div>
          <div className="RichEditor-root">
            <input type="file" onChange={this.onImageUpload} name="test" />
            <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
                />
            <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
                />
            <div className={className} onClick={this.focus}>
                <Editor
                    blockRendererFn={mediaBlockRenderer}
                    blockStyleFn={getBlockStyle}
                    editorState={editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    onTab={this.onTab}
                    ref="editor"
                    spellCheck={true}
                />
            </div>
          </div>
      </div>
    )
  }
}

const Image = (props) => {
  return <img src={props.src} style={{ width: '100%' }} />
}

const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0))
  const { src } = entity.getData()
  const type = entity.getType()

  let media
  if (type === 'audio') {
    media = <Audio src={src} />
  } else if (type === 'image') {
    media = <Image src={src} />
  } else if (type === 'video') {
    media = <Video src={src} />
  }

  return media
}

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    }
  }

  return null
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote'
    default: return null
  }
}

class StyleButton extends React.Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    let className = 'RichEditor-styleButton'
    if (this.props.active) {
      className += ' RichEditor-activeButton'
    }

    return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
    )
  }
}

const BLOCK_TYPES = [
    { label: '大標題', style: 'header-one' },
    { label: '小標題', style: 'header-three' },
]

const BlockStyleControls = (props) => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()

  return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
  )
}

const INLINE_STYLES = [
    { label: '粗體', style: 'BOLD' },
    { label: '斜體', style: 'ITALIC' },
    { label: '底線', style: 'UNDERLINE' },
]

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(SiteEditor)
