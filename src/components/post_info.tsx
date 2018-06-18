import * as React from "react"
import PostFooter from '../components/post_footer'
import CommentsSection from '../components/comments/comments_section'

interface PostInfoProps {
    categories: string[],
    tags: string[],
    url: string,
    githubRepo: string,
    issueNumber: number,
    author: string,
    posted: string,
}

export default class PostInfo extends React.Component<PostInfoProps> {
    render() {
        return <div>
            <div style={{ paddingTop: '5%', }} />
            <AuthorInfo author={this.props.author} posted={(new Date(this.props.posted))}/>
            <PostFooter categories={this.props.categories} tags={this.props.tags} />
            <CommentsSection issueNumber={this.props.issueNumber} url={this.props.url} githubRepo={this.props.githubRepo} />
        </div>
    }
}

interface AuthorInfoProps {
    author: string,
    posted: Date
}

export class AuthorInfo extends React.Component<AuthorInfoProps> {
    render() {
        return <p style={{ float: 'right', }}>Posted by <b>{this.props.author}</b> on <i>{this.props.posted.toLocaleDateString() }</i></p>
    }
}