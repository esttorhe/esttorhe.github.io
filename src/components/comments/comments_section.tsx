import * as React from "react"
import CommentsContainer from '../comments/comments_container'

interface CommentsSectionProps {
  githubRepo: string,
  url: string,
  issueNumber: number
}

export default class CommentsSection extends React.Component<CommentsSectionProps> {
  render() {
    const issueLink = `${this.props.githubRepo}/issues/${this.props.issueNumber}`
    return <div>
      <div className='comments-separator'>
        <hr></hr>
        <h4>Comments</h4>
        <p className='comments-disclaimer'>
            Comments are published on the website <a target="blank" href={this.props.githubRepo}>GitHub repository</a>. You can leave a comment on this post's <a target="blank" href={issueLink}>issue</a>. Your comment will show up automatically on this page.
          </p>
        <hr></hr>
      </div>
      <div>
        <CommentsContainer issueNumber={this.props.issueNumber} key={this.props.url}/>
      </div>
    </div>
  }
}