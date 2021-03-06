const reactCSS = require('reactcss').default;
const Human = require('human-component');
const Squid = require('../squid');
const actions = require('../actions');
const darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

const Paper = Human.require(module, 'material-ui/Paper');
const Projects = Human.require(module, './projects');
const MuiThemeProvider = Human.require(module, 'material-ui/styles/MuiThemeProvider');


const createStyle = (me) => reactCSS({
  default: {
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
}, me.props, me.state);


class App extends Squid.TopComponent {

  componentDidMount() {
    actions.showWindow();
  }

  render() {
    const style = createStyle(this);

    return (
      MuiThemeProvider.el({muiTheme: getMuiTheme(darkBaseTheme)},
        Paper.el({
          style: style.container,
          onMouseUp: this.onDragLeave,
          onMouseMove: this.onDragMove,
        },
          Projects.el()
        )
      )
    );
  }

}

module.exports = App;
