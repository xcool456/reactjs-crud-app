// eslint-disable-next-line
import React from 'react';

class AddButton extends React.Component {
    constructor(props) {
      super(props);
    }
 
    render() {
        return (
            <a type="button" class="btn btn-light">Add new product</a>
        );
  }
}
  
export default AddButton;