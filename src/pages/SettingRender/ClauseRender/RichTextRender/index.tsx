import React from "react";
import {update} from '@/services/clause';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {PropsState, BaseState} from './Type';
import {Button, message} from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
class RichTextRender extends React.Component<PropsState, any>
{
  state: BaseState = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(''),
    prevContent: ''
  }

  async componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
    const htmlContent = this.props.content;
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    })
  }

  static getDerivedStateFromProps(props: PropsState, current_state: BaseState) {
    if (current_state.prevContent !== props.content) {
      return {
        editorState: BraftEditor.createEditorState(props.content),
        prevContent: props.content
      }
    }
    return null
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    update({id: this.props.id, content: htmlContent}).then(() => {
      message.success('保存成功');
      if (this.props.onFinish) {
          this.props.onFinish({
            id: this.props.id,
            content: htmlContent
          });
      }
    });
  }

  handleEditorChange = (editorState: any) => {
    this.setState({ editorState })
  }

  render () {

    const { editorState } = this.state
    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
        />
        <Button type='primary' onClick={() => this.submitContent()}>保存</Button>
      </div>
    )

  }
}

export default RichTextRender;
