import * as React from "react"
import { CSSProperties } from "react"
import { Markdown } from "react-showdown"
import timeago from 'timeago.js'
 
export interface Comment {
  authorUsername: string,
  authorAvatarUrl: string | null,
  bodyMarkdown: string,
  createdAt: Date,
  updatedAt: Date | null,
  reactions: Reactions | null
  id: number
}
 
export interface Reactions {
  "+1": number,
  "-1": number,
  laugh: number,
  hooray: number,
  confused: number,
  heart: number
  [index:string] : number
}
 
interface CommentComponentProps {
  comment: Comment
}
 
export default class CommentComponent extends React.Component<CommentComponentProps> {
  reactions() {
    let filtered: { [index: string]: number } = {}
    return ["+1", "-1", "laugh", "hooray", "confused", "heart"].reduce((acc, next) => {
      if (this.props.comment.reactions[next] != 0) {
        acc[next] = this.props.comment.reactions[next]
      }
      return acc
    }, filtered)
  }
 
  renderReaction(name: string, count: number, key: number) {
    const emojis: { [index: string]: string } = {
      "+1": "👍",
      "-1": "👎",
      "laugh": "😊",
      "hooray": "🎉",
      "confused": "😕",
      "heart": "❤️"
    }
    return <div className='comment-reaction' key={key}>
      {emojis[name]} {count}
    </div>
  }
 
  renderReactions() {
    const reactions = this.reactions()
    return <div className='comment-reactions'>
      {Object.keys(reactions).map((reaction, i) => {
        return this.renderReaction(reaction, reactions[reaction], i)
      })}
    </div>
  }
 
  render() {
    const authorUrl = "https://github.com/" + this.props.comment.authorUsername
    let timeAgoString: string | null
    if (this.props.comment.updatedAt) {
      timeAgoString = timeago().format(this.props.comment.updatedAt)
    } else {
      timeAgoString = timeago().format(this.props.comment.createdAt)
    }
    return <div className='comment'>
      <div style={{display: "flex", flex: "0 0 40px"}}>
        <div className='comments-connector'></div>
        <img style={{height: "40px", width: "40px"}} src={this.props.comment.authorAvatarUrl}/>
      </div>
      <div style={{flex: "0 0 10px"}} />
      <div className='comment-box'>
        <div className='comment-header'>
          <a target="blank" href={authorUrl}>@{this.props.comment.authorUsername}</a> {timeAgoString} <br/>
        </div>
        <div className='comment-body'
          dangerouslySetInnerHTML={{ __html: this.props.comment.bodyMarkdown }}
        >
        </div>
        {(Object.keys(this.reactions()).length != 0) && (
          <div>
            {this.renderReactions()}
          </div>
        )}
      </div>
    </div>
  }
}