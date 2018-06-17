import * as React from "react"
import CommentComponent, { Comment } from "../comments/comment_component"

interface CommentsListProps {
  comments: Comment[],
  issueNumber: number
}

export default class CommentsList extends React.Component<CommentsListProps> {
  render() {
    const issuesLink = "https://github.com/esttorhe/esttorhe.github.io/issues/" + this.props.issueNumber
    if (this.props.comments.length == 0) {
      return <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
        <a target="blank" href={issuesLink} style={{ textDecoration: 'none',}}><b style={{color: "#33a6b8"}}>Leave a comment</b></a>
      </div>
    } else {
      return <div key={this.props.issueNumber} className='comments'>
        {this.props.comments.map((comment, i) => (
          <div key={i}>
            <CommentComponent comment={comment} key={i}/>
            <div style={{height: "10px"}}/>
          </div>
        ))}
        <div style={{height: "20px"}}/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <div>
            <a target="blank" href={issuesLink}><b style={{color: "#33a6b8", textDecoration: 'none',}}>Leave a comment</b></a>
          </div>
        </div>
      </div>
    }
  }
}