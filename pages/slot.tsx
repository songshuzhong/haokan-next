import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Addon = () => null;
Addon.displayName = 'Addon';
Addon.propTypes = {
  slot: PropTypes.string,
  children: PropTypes.object
};
Addon.defaultTypes = {
  slot: '?default'
};
const Slot = ({name, children}, {requestAddonRenderer}) => {
  const addOnRenderer = requestAddonRenderer(name);
  return (addOnRenderer && addOnRenderer()) || children || null;
};
Slot.disPlayName = 'Slot';
Slot.propTypes = {
  name: PropTypes.string,
  children: PropTypes.array
};
Slot.contextTypes = {
  requestAddonRenderer: PropTypes.func
};
Slot.defaultProps = {
  name: '?default'
};

class AppLayout extends Component<any, any> {
  static childContextTypes = {
    requestAddonRenderer: PropTypes.func
  };
  addOnRenderers = {};

  getChildContext() {
    const requestAddonRenderer = name => {
      if (!this.addOnRenderers[name]) {
        return undefined;
      }

      return () => this.addOnRenderers[name];
    };

    return {
      requestAddonRenderer
    };
  }

  render() {
    const {children} = this.props;
    if (children) {
      const arr = React.Children.toArray(children);
      const checkedName = [];
      this.addOnRenderers = {};

      arr.forEach((child: any) => {
        if (child.type.displayName === 'Addon') {
          const name = child.props.slot || '?default';
          if (checkedName.includes(name)) {
            throw new Error(`Slot ${name} has been occupied`);
          }
          this.addOnRenderers[name] = child.props.children;
          checkedName.push(name);
        }
      });
    }

    return (
      <div>
        <header>
          <Slot name='header'/>
        </header>
        <main>
          <Slot/>
        </main>
        <footer>
          <Slot name='footer'/>
        </footer>
      </div>
    );
  }
}

export default class Page extends Component<any, any> {
  render() {
    return (
      <AppLayout>
        <Addon slot='header'>
          <h1>header</h1>
        </Addon>
        <Addon>
          <h2>body</h2>
        </Addon>
        <Addon slot='footer'>
          <h3>footer</h3>
        </Addon>
      </AppLayout>
    );
  }
}
