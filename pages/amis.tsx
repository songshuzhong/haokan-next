import React from 'react';
import {findRenderer} from '../src/scripts/decorator';

export default class Amis extends React.Component<any, any> {
      constructor(props) {
          super(props);
          this.state = {
              json: {
                  type: 'alert'
              }
          };
      }

      componentDidMount() {
          const c = findRenderer('asdf;lkklj;lkj');

          console.log(c);
      }

      render() {
          return (
              <div>
                  1234567890
              </div>
          );
      }
}
