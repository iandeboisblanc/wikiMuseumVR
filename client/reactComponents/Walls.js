import React from 'react';
import $ from 'jquery';
require('aframe-text-component');

class Walls extends React.Component {

  constructor(props) {
    super(props);
    this.wallHeight = 8;
    this.doorWidth = 2;
    this.doorHeight = 3;
    this.wallThickness = 0.3;
  }

  renderDoorWays () {
    let links = this.props.links.slice(0,6); //max out at 6 links
    let boxCount = links.length + 1;
    let boxWidth = (this.props.width - (links.length * this.doorWidth)) / boxCount;
    //Make link colliders:
    let linkPads = links.map((link, i) => {
      // const position = `${-this.props.width/2 + boxWidth * (i + 1) + this.doorWidth * (i + 1/2)} 0 ${-this.props.length/2 - 0.15}`;

      // $.get(link, (result) => {
      //   console.log('result', result);
      //   // const title = Regex.Match(source, @"\<title\b[^>]*\>\s*(?<Title>[\s\S]*?)\</title\>", RegexOptions.IgnoreCase).Groups["Title"].Value;
      //   // console.log('title', title);
      // })
      const xPos = -this.props.width/2 + boxWidth * (i + 1) + this.doorWidth * (i + 1/2);
      const yPos = 0;
      const zPos = -this.props.length/2 - 0.15;

      return (
        <a-entity key={'linkPad' + i}>
          <a-entity
            text={`text: ${link.title}`}
            material="color: black"
            position={`${xPos - this.doorWidth} ${yPos + this.doorHeight} ${zPos + this.wallThickness}`}
          />
          <a-box
            link={link.url}
            static-body
            position={`${xPos} ${yPos} ${zPos}`}
            height='0.1'
            width={this.doorWidth}
            depth={this.wallThickness}
            color='grey'
          />
        </a-entity>
      )
    });
    let lowerWalls = [];
    for(let i = 0; i < boxCount; i++) {
      lowerWalls.push((
        <a-box key={'lowerWall' + i}
          static-body
          position={`${-this.props.width/2 + boxWidth/2 + i * (boxWidth + this.doorWidth)} 1.5 ${-this.props.length/2 - 0.15}`}
          height={this.doorHeight}
          width={boxWidth}
          depth={this.wallThickness}
          material={`src:#stucco; repeat:${boxWidth} ${this.doorHeight};`}
          />
      ))
    }
    let lowerWallsTrim = [];
    for(let i = 0; i < boxCount; i++) {
      lowerWallsTrim.push((
        <a-box id='southWallTrim' key={'lowerWallTrim' + i}
          position={`${-this.props.width/2 + boxWidth/2 + i * (boxWidth + this.doorWidth)} 0.1 ${-this.props.length/2}`}
          depth={0.1} width={boxWidth - 0.001} height={0.2}
          material='src:#stucco; repeat:25 8;'
          />
      ))
    }
    return linkPads.concat(lowerWalls, lowerWallsTrim);
  }

  render () {
    return (
      <a-entity position='0 0 0'>
        <a-box id='northWall'
          static-body position={`0 ${this.wallHeight/2} ${this.props.length/2 + 0.15}`}
          depth={this.wallThickness} width={this.props.width} height={this.wallHeight}
          material={`src:#stucco; repeat:${this.props.width} ${this.wallHeight};`}
          />
        <a-box id='northWallTrim'
          position={`0 0.1 ${this.props.length/2}`}
          depth={0.1} width={this.props.width} height={0.2}
          material='src:#stucco; repeat:25 8;'
          />
        <a-box id='eastWall'
          static-body position={`${this.props.width/2 + 0.15} ${this.wallHeight/2} 0`}
          depth={this.props.length + 0.6} width={this.wallThickness} height={this.wallHeight}
          material={`src:#stucco2; repeat:${this.props.length/2} ${this.wallHeight/2};`}
          />
        <a-box id='eastWallTrim'
          position={`${this.props.width/2} 0.1 0`}
          depth={this.props.length} width={0.1} height={0.2}
          material='src:#stucco; repeat:25 8;'
          />
        <a-box id='westWall'
          static-body position={`${-this.props.width/2 - 0.15} ${this.wallHeight/2} 0`}
          depth={this.props.length + 0.6} width={this.wallThickness} height={this.wallHeight}
          material={`src:#marbleSurface; repeat:${this.props.length/4} ${this.wallHeight/4};`}
          />
        <a-box id='westWallTrim'
          position={`${-this.props.width/2} 0.1 0`}
          depth={this.props.length} width={0.1} height={0.2}
          material='src:#stucco; repeat:25 8;'
          />

        <a-box id='southWallUpper'
          static-body position={`0 ${(this.wallHeight + this.doorHeight)/2} ${-this.props.length/2 - 0.15}`}
          depth={this.wallThickness} width={this.props.width} height={this.wallHeight - this.doorHeight}
          material={`src:#stucco; repeat:${this.props.width} ${this.wallHeight - this.doorHeight};`}
          />
        {this.renderDoorWays.call(this)}

      </a-entity>
    )
  }
}

module.exports = Walls;
