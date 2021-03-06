const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const reactCSS = require('reactcss').default;
const actions = require('../actions');
const ChannelStore = require('../store/channel');
const TimelineStore = require('../store/timeline');

const svg = Human.from('svg');
const Ruler = Human.require(module, './ruler');
const ChannelGrid = Human.require(module, './channelgrid');
const TableRow = Human.require(module, 'material-ui/Table', 'TableRow');
const TableRowColumn = Human.require(module, 'material-ui/Table', 'TableRowColumn');


const createStyle = (me) => reactCSS({
  default: {
    container: {
      display: 'table',
      width: '100vw',
      direction: 'ltr',
    },
    titleColumn: {
      position: 'relative',
      width: 100,
      background: me.context.muiTheme.palette.primary1Color,
    },
    gridColumn: {
      padding: 0,
    },
  },
}, me.props, me.state);


class Channel extends Squid.Component {

  initState() {
    this.state = {
      channel: ChannelStore.get({channelId: this.props.channelId}),
      timeline: TimelineStore.get({animationId: this.props.animationId}),
    };
  }

  onClick(evt) {
    const timeline = this.state.timeline;
    const time = (evt.nativeEvent.layerX / timeline.gapWidth) * timeline.gap;

    actions.selectTime(this.props, time);
  }

  onDoubleClick(evt) {
    const timeline = this.state.timeline;
    const time = (evt.nativeEvent.layerX / timeline.gapWidth) * timeline.gap;

    actions.createAndSelectStep(this.props, time);
  }

  render() {
    const style = createStyle(this);

    return (
      TableRow.el({style: style.container},
        TableRowColumn.el({style: style.titleColumn, key: 'first'}, this.state.channel.name),
        TableRowColumn.el({style: style.gridColumn, key: 'second'},
          svg.el({
            width: '100%',
            height: '100%',
            onClick: this.onClick,
            onDoubleClick: this.onDoubleClick,
          },
            Ruler.el({
              withLabels: false,
              withSizing: false,
              root: 'g',
              fileId: this.props.fileId,
              animationId: this.props.animationId,
              key: 'ruler',
            }),
            ChannelGrid.el({
              fileId: this.props.fileId,
              animationId: this.props.animationId,
              channelId: this.props.channelId,
              key: 'grid',
            })
          )
        )
      )
    );
  }
}

Channel.events = ['onClick', 'onDoubleClick'];


Channel.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  channelId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
};

module.exports = Channel;
