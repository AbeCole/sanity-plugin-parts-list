"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _sanityDebug = _interopRequireDefault(require("sanity:debug"));

var _PartsList = _interopRequireDefault(require("./PartsList.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PartsList extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleActiveSection", section => {
      if (this.state.activeSections.includes(section)) {
        this.setState({
          activeSections: [...this.state.activeSections.filter(s => s !== section)]
        });
      } else {
        this.setState({
          activeSections: [...this.state.activeSections, section]
        });
      }
    });

    _defineProperty(this, "handleSearchChange", e => {
      this.setState({
        search: e.target.value
      });
    });

    this.state = {
      activeSections: ['definitions', 'implementations', 'plugins'],
      search: ''
    };
  }

  render() {
    var _this$state = this.state,
        activeSections = _this$state.activeSections,
        search = _this$state.search;
    console.log('App render');

    if (Array.isArray(_sanityDebug.default)) {
      _sanityDebug.default.forEach(function (tool) {
        console.log(tool.title, tool);
      });
    } else {
      console.log('tools is not an Array', _sanityDebug.default);
    }

    var searchCriteria = search === '' ? null : search.toLowerCase();
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _PartsList.default.container
    }, /*#__PURE__*/_react.default.createElement("h1", {
      className: _PartsList.default.title
    }, "Parts list"), /*#__PURE__*/_react.default.createElement("p", null, "This page displays a basic output of currently available Sanity.io parts, these have been retrieved using the 'sanity:debug' part. The raw data object has been logged to the developer console for further examination."), /*#__PURE__*/_react.default.createElement("p", null, "These parts are divided into 3 sections: Definitions, Implementations and Plugins. You can hide a section by clicking the heading."), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      placeholder: "Search part name or path...",
      value: search,
      onChange: this.handleSearchChange,
      className: _PartsList.default.input
    }), /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: _PartsList.default.button,
      onClick: () => this.toggleActiveSection('definitions')
    }, "Definitions"), activeSections.includes('definitions') && /*#__PURE__*/_react.default.createElement("ul", {
      className: _PartsList.default.partList
    }, Object.keys(_sanityDebug.default.definitions).filter(p => !searchCriteria || p.includes(searchCriteria) || _sanityDebug.default.definitions[p].path.includes(searchCriteria)).map(partName => /*#__PURE__*/_react.default.createElement("li", {
      key: partName,
      className: _PartsList.default.partListItem
    }, /*#__PURE__*/_react.default.createElement("h3", {
      className: _PartsList.default.itemTitle
    }, partName), /*#__PURE__*/_react.default.createElement("div", {
      className: _PartsList.default.content
    }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "Plugin"), " ", _sanityDebug.default.definitions[partName].plugin, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("strong", null, "Path"), " ", _sanityDebug.default.definitions[partName].path, _sanityDebug.default.definitions[partName].isAbstract && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("strong", null, "Abstract"))), _sanityDebug.default.definitions[partName].description && /*#__PURE__*/_react.default.createElement("p", {
      className: _PartsList.default.description
    }, _sanityDebug.default.definitions[partName].description))))), /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: _PartsList.default.button,
      onClick: () => this.toggleActiveSection('implementations')
    }, "Implementations"), activeSections.includes('implementations') && /*#__PURE__*/_react.default.createElement("ul", {
      className: _PartsList.default.partList
    }, Object.keys(_sanityDebug.default.implementations).filter(p => !searchCriteria || p.includes(searchCriteria) || _sanityDebug.default.implementations[p].find(i => i.path.includes(searchCriteria))).map(partName => /*#__PURE__*/_react.default.createElement("li", {
      key: partName,
      className: _PartsList.default.partListItem
    }, /*#__PURE__*/_react.default.createElement("h3", {
      className: _PartsList.default.itemTitle
    }, partName), /*#__PURE__*/_react.default.createElement("ul", {
      className: _PartsList.default.implementations
    }, _sanityDebug.default.implementations[partName].map(implementation => /*#__PURE__*/_react.default.createElement("li", {
      key: implementation.path
    }, /*#__PURE__*/_react.default.createElement("strong", null, implementation.plugin), ' ', implementation.path)))))), /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: _PartsList.default.button,
      onClick: () => this.toggleActiveSection('plugins')
    }, "Plugins"), activeSections.includes('plugins') && /*#__PURE__*/_react.default.createElement("ul", {
      className: _PartsList.default.partList
    }, _sanityDebug.default.plugins.filter(p => !searchCriteria || p.name.includes(searchCriteria) || p.path.includes(searchCriteria)).map(part => /*#__PURE__*/_react.default.createElement("li", {
      key: part.name,
      className: _PartsList.default.partListItem
    }, /*#__PURE__*/_react.default.createElement("h3", {
      className: _PartsList.default.itemTitle
    }, part.name), /*#__PURE__*/_react.default.createElement("div", {
      className: _PartsList.default.content
    }, part.path, part.plugins.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", {
      className: _PartsList.default.itemSubTitle
    }, "Plugins"), /*#__PURE__*/_react.default.createElement("ul", {
      className: _PartsList.default.implementations
    }, part.plugins.map(implementation => /*#__PURE__*/_react.default.createElement("li", {
      key: implementation.path
    }, /*#__PURE__*/_react.default.createElement("strong", null, implementation.name), ' ', implementation.path)))))))));
  }

}

var _default = PartsList;
exports.default = _default;
//# sourceMappingURL=PartsList.js.map