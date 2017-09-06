import React from 'react';
import { createClient } from 'contentful';

const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms 
  space: '07c3fee5zt61',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app 
  accessToken: '3674559aa73f2d2b5b461d97299df2df699e9a1eede74a8adb8def371c217be1'
});

export default Page => class Application extends React.Component {
  constructor (props) {
    super(props);
  }
  static async getInitialProps(ctx) {
    const blog = await client.getEntries({
      content_type: '2wKn6yEnZewu2SCCkus4as'
    });
    let result = {
      blog
    };

    if(Page.getInitialProps){
      result = Object.assign(Page.getInitialProps(ctx), result);
    }

    return result;
  }
  render () {
    return (
      <div>
        <Page {...this.props} />
      </div>
    )
  }
}