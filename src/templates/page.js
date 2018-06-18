import React from "react";

export default class AboutMe extends React.Component {
    render() {
        return <div
          dangerouslySetInnerHTML={{ __html: this.props.pathContext.html }}>
          </div>;
    }
}