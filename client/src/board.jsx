/* eslint-disable react/prop-types */
import React from 'react'

export class Board extends React.Component {
  render() {

    return (
      <div className="tablero" >
        <Tablero state={this.props.state} colorCircle={this.props.colorCircle} type="principal" n={15} id={'p'} />
        <Tablero state={this.props.state} colorCircle={this.props.colorCircle} type="secundaria" n={15} id={'s'} />
        <div className="panelderecho">
          <Tablero state={this.props.state} actColor={this.props.actColor} type="colors" n={2} id={'colors'} />
          <button
            onClick={() =>
              this.props.correct()}
          >
            Check
          </button>
          <button
            onClick={() =>
              this.props.doneCorrect()}
          >
            Correct
          </button>
          <button
            onClick={() =>
              this.props.combination()}
          >
            Done
          </button>
          <Tablero state={this.props.state} colorCircle={this.props.colorCircle} type="combinacion" n={1} id={'c'} />
        </div>
      </div>
    );
  }
}


function Tablero(props) {

  let rows = [];
  let pal = 0;
  if (props.type === "colors") {
    pal = 1;
  }
  for (let i = 0; i < props.n; i++) {
    rows.push(<Row state={props.state} colorCircle={props.colorCircle} actColor={props.actColor} paleta={pal} row={i} id={props.id} />);
  }
  return <div className={props.type}>{rows}</div>;
}

class Row extends React.Component {
  render() {
    let circles = [];
    let n = 5;
    let colors = ['red', 'yellow', 'green', 'blue', 'orange', 'black', 'white']

    let circleid;
    if (this.props.paleta == 1) {
      if (this.props.row != 0) {
        circles.push(<Circles state={this.props.state} actColor={this.props.actColor} clase={'circles ' + colors[5]} id={'colors'} />);
        circles.push(<Circles state={this.props.state} actColor={this.props.actColor} clase={'circles ' + colors[6]} id={'colors'} />);
      }
      else {
        for (let i = 0; i < n; i++) {
          circles.push(<Circles state={this.props.state} actColor={this.props.actColor} clase={'circles ' + colors[i + (this.props.row)]} id={'colors'} />);
        }
      }

    }
    else {
      for (let i = 0; i < n; i++) {
        if (this.props.state.filas.length < 156) {
          circleid = { id: this.props.id + this.props.row + i, color: '' }
          this.props.state.filas.push(circleid)
        }
        circles.push(<Circles state={this.props.state} colorCircle={this.props.colorCircle} clase={'circles'} id={this.props.id + this.props.row + i} />);
      }
    }
    return <div className="row">{circles}</div>;
  }

}

class Circles extends React.Component {
  render() {
    let circle = this.props.state.filas.filter((item) => item.id === this.props.id);
    let color = circle.map((item) => item.color)
    let id = this.props.id + ''
    if (id[0] === 'p') {
      return (
        <span
          className={this.props.clase + ' ' + color[0]}
          id={this.props.id}
          onClick={() =>
            this.props.colorCircle(this.props.state.activeColor, this.props.id)} >
        </span>
      )
    }
    else if (id[0] === 's') {
      return (
        <span
          className={this.props.clase + ' ' + color[0]}
          id={this.props.id}
          onClick={() =>
            this.props.colorCircle(this.props.state.activeColor, this.props.id)} >
        </span>

      )
    }
    else if (id === "colors") {
      let splitted = this.props.clase.split(" ")
      return (
        <span
          className={this.props.clase}
          id={this.props.id}
          onClick={() =>
            this.props.actColor(splitted[1])} >
        </span>


      )
    }
    else if (id[0] === 'c') {
      return (
        <span
          className={this.props.clase + ' ' + color[0]}
          id={this.props.id}
          onClick={() =>
            this.props.colorCircle(this.props.state.activeColor, this.props.id)} >
        </span>

      )
    }
  }
}