import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { stateToHTML } from 'draft-js-export-html'
import { Editor, EditorState, RichUtils, Entity, AtomicBlockUtils } from 'draft-js'
import * as reduxFormActions from '../../../reducers/form/reduxFormActions'
import tripAPI from '../../../api/trip'

const actions = [
  reduxFormActions,
]

let dispatchTimer = null

const mapStateToProps = state => ({
  apiEngine: state.getIn(['global', 'apiEngine']),
})

const mapDispatchToProps = dispatch => {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  }
}

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
    this.focus = () => this.editor.focus()
    this.handleKeyCommand = (cmd) => this._handleKeyCommand(cmd)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
  }

  // copy html string to redux form state
  _updateReduxForm() {
    if (dispatchTimer) {
      clearTimeout(dispatchTimer)
    }
    dispatchTimer = setTimeout(() => {
      const state = this.state.editorState.getCurrentContent()
      const htmlStr = stateToHTML(state)
      this.props.actions.change(this.props.formName, this.props.name, htmlStr)
    }, 500)
  }

  // upload image to server
  _uploadImage(file) {
    const { apiEngine } = this.props
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

  _handleKeyCommand(command) {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
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
            <img src="/img/createsitepage/icon04.png" width="42" />
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
              e.target.value = ''
            }
          } />
        </span>

        <div className={className} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref={ref => { this.editor = ref }}
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

const mediaBlockRenderer = block => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    }
  }
  return null
}

const getBlockStyle = block => {
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

RichEditor.propTypes = {
  formName: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditor)
