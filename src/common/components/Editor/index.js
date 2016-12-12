import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { stateToHTML } from 'draft-js-export-html'
import { Editor, EditorState, RichUtils, Entity, AtomicBlockUtils } from 'draft-js'
import tripAPI from '../../api/trip'

class RichEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }

    // functions about changing state
    this.updateReduxForm = () => this._updateReduxForm()
    this.onChange = (editorState) => this.setState({ editorState }, this.updateReduxForm)
    this.uploadImage = (file) => this._uploadImage(file)
    this.addImage = (url) => this._addImage(url)

    // functions for editor
    this.focus = () => this.refs.editor.focus()
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
  }

  // copy html string to redux form state
  _updateReduxForm() {
    const state = this.state.editorState.getCurrentContent()
    const htmlStr = stateToHTML(state)
    this.props.dispatch(change(this.props.formName, this.props.name, htmlStr))
  }

  // upload image to server
  _uploadImage(file) {
    const apiEngine = this.props.apiEngine
    tripAPI(apiEngine)
      .uploadImage(file)
      .then(json => {
        // image url
        const url = json.downloadURL
        this.addImage(url)
      })
      .catch(err => {
        console.log(err)
      })
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

  _addImage(url) {
    let { editorState } = this.state
    const entityKey = Entity.create('image', 'IMMUTABLE', { src: url })
    editorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
    this.setState({ editorState }, this.updateReduxForm)
  }

  render() {
    const { editorState } = this.state

    // Hide the placeholder if the user changes block type before entering any text
    let className = 'RichEditor-editor'
    const contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
          />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
          />

        <span>
          <label htmlFor="img-input" style={{ cursor: 'pointer' }} >
            <img src="/img/icon04.png" width="42" />
          </label>
          <input
            id="img-input"
            name="img"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0]
              this.uploadImage(file)
            }
          } />
        </span>

        <div className={className} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
          />
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
  // We only use image currently
  // but we may add audio or video in the future
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

const mapStateToProps = (state) => ({
  apiEngine: state.global.apiEngine,
})

RichEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(RichEditor)
