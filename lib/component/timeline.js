const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const reactCSS = require('reactcss').default;
const AnimationStore = require('../store/animation');
const ChannelStore = require('../store/channel');
const TimelineStore = require('../store/timeline');


const div = Human.from('div');
const Paper = Human.require(module, 'material-ui/Paper');
const Subheader = Human.require(module, 'material-ui/Subheader');
const Cursor = Human.require(module, './cursor');
const Ruler = Human.require(module, './ruler');
const Channel = Human.require(module, './channel');
const ChannelCreator = Human.require(module, './channelcreator');
const TimelineMenu = Human.require(module, './timelinemenu');
const TimelineIcon = Human.require(module, 'material-ui/svg-icons/action/timeline');
const Table = Human.require(module, 'material-ui/Table', 'Table');
const TableHeader = Human.require(module, 'material-ui/Table', 'TableHeader');
const TableHeaderColumn = Human.require(module, 'material-ui/Table', 'TableHeaderColumn');
const TableRow = Human.require(module, 'material-ui/Table', 'TableRow');
const TableBody = Human.require(module, 'material-ui/Table', 'TableBody');


const createStyle = (me) => reactCSS({
  default: {
    timeline: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
    },
    icon: {
      marginBottom: -7,
      marginRight: 10,
    },
    header: {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: me.context.muiTheme.palette,
    },
    firstColumn: {
      width: 100,
    },
    secondColumn: {
      padding: 0,
      overflow: 'hidden',
    },
    tableBody: {
      display: 'block',
      height: 170,
      width: '100vw',
      overflowY: 'auto',
      overflowX: 'hidden',
      direction: 'rtl',
    },
    timelineScroll: {
      position: 'absolute',
      bottom: 10,
      right: 0,
      left: 150,
      height: 10,
      overflowX: 'scroll',
      overflowY: 'hidden',
    },
    timelineScrollSpacer: {
      height: 1,
      width: me.state.timeline.gapWidth * me.state.timeline.length / me.state.timeline.gap,
    },
  },
}, me.props, me.state);

class Timeline extends Squid.Component {

  onAnimationStoreChange() {
    const animationId = AnimationStore.getCurrentAnimation(this.props.fileId).animationId;

    this.setState({
      animationId: animationId,
      channelIds: ChannelStore.allIDs(animationId),
    });
  }

  onChannelStoreChange() {
    this.setState({
      animationId: this.state.animationId,
      channelIds: ChannelStore.allIDs(this.state.animationId),
    });
  }

  initState() {
    const animationId = AnimationStore.getCurrentAnimation(this.props.fileId).animationId;

    this.state = {
      animationId: animationId,
      channelIds: ChannelStore.allIDs(animationId),
      timeline: TimelineStore.get({animationId: animationId}),
    };
  }


  render() {
    const style = createStyle(this);

    return (
      Paper.el({style: style.timeline, zDepth: 1, rounded: false},
        TimelineMenu.el({
          key: 'menu',
          fileId: this.props.fileId,
          animationId: this.state.animationId,
        }),
        Paper.el({zDepth: 1, rounded: false, key: 'header'},
          Subheader.el(null,
            TimelineIcon.el({key: 'icon', style: style.icon}),
            'Timeline'
          )
        ),
        Cursor.el({
          key: 'cursor',
          fileId: this.props.fileId,
          animationId: this.state.animationId,
        }),
        Table.el({selectable: false, key: 'channels-table'},
          TableHeader.el({displaySelectAll: false, adjustForCheckbox: false, key: 'header'},
            TableRow.el({style: style.header},
              TableHeaderColumn.el({style: style.firstColumn, key: 'first'}),
              TableHeaderColumn.el({style: style.secondColumn, key: 'second'},
                Ruler.el({
                  withLabels: true,
                  withSizing: true,
                  fileId: this.props.fileId,
                  animationId: this.state.animationId,
                })
              )
            )
          ),
          TableBody.el({displayRowCheckbox: false, key: 'body', style: style.tableBody},
            this.state.channelIds.map((channelId) => Channel.el({
              fileId: this.props.fileId,
              animationId: this.state.animationId,
              channelId: channelId,
              key: channelId,
            })).concat(
              ChannelCreator.el({
                key: 'creator',
                fileId: this.props.fileId,
                animationId: this.state.animationId,
              })
            )
          )
        ),
        div.el({style: style.timelineScroll},
          div.el({style: style.timelineScrollSpacer})
        )
      )
    );
  }
}

Timeline.storeListeners = {
  onAnimationStoreChange: AnimationStore,
  onChannelStoreChange: ChannelStore,
};

Timeline.propTypes = {
  fileId: React.PropTypes.string.isRequired,
};

module.exports = Timeline;
