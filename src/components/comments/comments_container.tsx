import * as React from "react";
import { Comment } from "../comments/comment_component"
import CommentsList from "../comments/comments_list"
 
interface CommentsContainerState {
  comments: Comment[]
}
 
interface CommentsContainerProps {
  issueNumber: number
}
 
export default class CommentsContainer extends React.Component<CommentsContainerProps, CommentsContainerState> {
 
  constructor(props: CommentsContainerProps) {
    super(props)
    this.state = { comments: [] }
  }
 
  componentDidMount() {
    const url = `https://esttorhe-blog-comments.herokuapp.com/repos/esttorhe/esttorhe.github.io/issues/${this.props.issueNumber}/comments`
    fetch(url).then((response) => {
      return response.json()
    }).then((comments: any[]) => {
      if (comments.length > 0) {
        const newState = {
          comments: comments.map((comment) => ({
            authorUsername: comment.user.login,
            authorAvatarUrl: comment.user.avatar_url,
            bodyMarkdown: comment.body_html,
            createdAt: new Date(comment.created_at),
            updatedAt: new Date(comment.updated_at),
            reactions: comment.reactions
          }))
        }
        this.setState(newState)
      }
    })
  }

  render() {
    return <CommentsList comments={this.state.comments} issueNumber={this.props.issueNumber} key={this.props.issueNumber}/>
  }
}