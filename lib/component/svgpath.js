import React from 'react';
import SVGElement from './svgelement';


export default class SVGPath extends SVGElement {
  render() {
    var attributes = this.props.attributes;

    return (
      <path
        id={attributes.id}
        style={attributes.style}
        transform={attributes.transform}
        onClick={this.onClick}
        onContextMenu={this.onContextMenu}
        onDoubleClick={this.onDoubleClick}
        onDrag={this.onDrag}
        onDragEnd={this.onDragEnd}
        onDragEnter={this.onDragEnter}
        onDragExit={this.onDragExit}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDragStart={this.onDragStart}
        onDrop={this.onDrop}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        onMouseUp={this.onMouseUp}
        d={attributes.d} />
    )
  }
}