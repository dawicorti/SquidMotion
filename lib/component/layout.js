const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');

const div = Human.from('div');

const createStyle = (me) => reactCSS({
  default: {
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    workspace: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: me.state.timelineHeight,
      left: 0,
    },
    timeline: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      height: me.state.timelineHeight,
    },
  },
}, me.props, me.state);


class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.initState();
  }

  initState() {
    this.state = {timelineHeight: 300};
  }

  render() {
    const style = createStyle(this);

    return (
      div.el({style: style.container},
        div.el({style: style.workspace, key: 'workspace-wrapper'}),
        div.el({style: style.timeline, key: 'timeline-wrapper'})
      )
    );
  }

}

module.exports = Layout;