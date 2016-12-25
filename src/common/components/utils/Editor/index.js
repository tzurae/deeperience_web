import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import classname from 'classnames'
import { stateToHTML } from 'draft-js-export-html'
import { Editor as DEditor, RichUtils, Entity, AtomicBlockUtils, EditorState } from 'draft-js'
import uploadAPI from '../../../api/upload'
import generateEditorState from './generateEditorState'
import ApiEngine from '../../../utils/ApiEngine'
import styles from './styles.scss'

let dispatchTimer = null

const apiEngine = new ApiEngine()

class Editor extends React.Component {
  constructor(props) {
    super(props)

    let plainContent = this.props.content

    // if plainContent not exist, initial it
    if (!plainContent) {
      plainContent = EditorState.createEmpty().getCurrentContent()
    }

    // turn to plain object
    if (plainContent.toJS) {
      plainContent = plainContent.toJS()
    }

    this.state = {
      editorState: generateEditorState(plainContent),
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
      const contentState = this.state.editorState.getCurrentContent()
      const htmlStr = stateToHTML(contentState)
      if (this.props.updateEditor) {
        this.props.updateEditor(contentState.toJS())
      }
      this.props.update(htmlStr)
    }, 500)
  }

  // upload image to server
  _uploadImage(file) {
    uploadAPI(apiEngine)
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

    return (
      <div
        className={styles.editorRoot}
      >
        <Toolbar
          editorState={editorState}
          toggleBlock={this.toggleBlockType}
          toggleInline={this.toggleInlineStyle}
          uploadImage={this.uploadImage}
        />
        <div
          className={styles.editorEditor}
          style={{ height: `${this.props.height}px` }}
          onClick={this.focus}
        >
          <DEditor
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

Editor.propTypes = {
  height: PropTypes.number,
}

Editor.defaultProps = {
  height: 500,
}

const Image = (props) => <img src={props.src} style={{ width: '100%' }} />

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
  const styleArr = [styles.styleBlockDefault]
  switch (block.getType()) {
    case 'header-six':
      styleArr.push(styles.styleImgQuote)
      break
  }
  return classname(...styleArr)
}

const Toolbar = ({ editorState, toggleBlock, toggleInline, uploadImage }) => {
  const fontSize = [ // block styles
    { label: '大', style: 'header-one' },
    { label: '中', style: 'header-three' },
    { label: '小', style: 'header-five' },
  ]

  const textStyle = [ // inline styles
    { label: 'bold', style: 'BOLD' },
    { label: 'italic', style: 'ITALIC' },
    { label: 'underline', style: 'UNDERLINE' },
  ]

  const pic = [
    { label: 'pencil', style: 'header-six' },
  ]

  // block
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey())
    .getType()

  // inline
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <div className={styles.toolbar}>
      {fontSize.map((type) =>
        <LabelBtn
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={toggleBlock}
          style={type.style}
        />
      )}
      <span className={styles.blockLine}/>
      {textStyle.map(type =>
        <FABtn
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={toggleInline}
          style={type.style}
        />
      )}
      <span className={styles.blockLine}/>
      <label htmlFor="img-input" className={styles.btnPhoto}>
        <FontAwesome
          name="photo"
        />
      </label>
      <input
        id="img-input"
        name="img"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => {
          uploadImage(e.target.files[0])
          e.target.value = ''
        }}
      />
      {pic.map((type) =>
        <FABtn
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={toggleBlock}
          style={type.style}
        />
      )}
    </div>
  )
}

const LabelBtn = ({ label, style, active, onToggle }) => {
  return (
    <span
      className={classname(active ? styles.btnActive : styles.btnInactive, styles.btnLabel)}
      onMouseDown={
        e => {
          e.preventDefault()
          onToggle(style)
        }
      }
    >
      {label}
    </span>
  )
}

const FABtn = ({ label, active, style, onToggle, ...props }) => {
  return (
    <FontAwesome
      name={label}
      className={classname(active ? styles.btnActive : styles.btnInactive, styles.btnFa)}
      onMouseDown={
        e => {
          e.preventDefault()
          onToggle(style)
        }
      }
      {...props}
    />
  )
}

export default Editor
