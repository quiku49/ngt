/* eslint-disable react/prop-types */
import React from 'react'

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDoneClicked: false
    };
  }

  handleDoneClick = () => {
    this.props.combination();
    
  };
  render() {

    return (
      <div className="tablero" >
        <Tablero state={this.props.state} colorCircle={this.props.colorCircle} type="principal" n={15} id={'p'} />
        <Tablero state={this.props.state} colorCircle={this.props.colorCircle} type="secundaria" n={15} id={'s'} />
        <div className="panelderecho">
          <Tablero state={this.props.state} actColor={this.props.actColor} type="colors" n={2} id={'colors'} />

          {this.props.state.turn1 === this.props.state.playerSelf ? (
            <>
            <p>Pulse este botón cuando quiera comprobar su intento</p>
            <button
              className="button-74"
              role="button"
              onClick={() =>
                this.props.correct()}>
              Enviar intento
            </button>
            </>
          ) : ''}
          {this.props.state.turn2 === this.props.state.playerSelf ? (
            <>
            <p>Pulse este botón para enviar la correccióna su rival</p>
            <button
              className="button-74"
              role="button"
              onClick={() =>
                this.props.doneCorrect()}>
              Enviar Corrección
            </button>
            </>
          ) : ''}
          { this.props.state.comboSet === 1 ? '' : (this.props.state.turn0 === this.props.state.playerSelf ? (
            <><div>
              <p>Pulse este botón cuando haya termiando de colocar la combinación:</p>
              <button
                className="button-74"
                role="button"
                onClick={this.handleDoneClick}>
                Establecer Combinación
            </button>
            </div>
            </>) : '')
            }
          {
            this.props.state.turn0 !== this.props.state.playerSelf ? (
              <Tablero state={this.props.state} colorCircle={this.props.colorCircle} clear={this.props.state.endOfGame === 1 ? "notclear" : "clear"} type="combinacion" n={1} id={'c'} />
            ) : (
              <Tablero state={this.props.state} colorCircle={this.props.colorCircle} clear="notclear" type="combinacion" n={1} id={'c'} />
            )
          }
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
    rows.push(<Row state={props.state} colorCircle={props.colorCircle} actColor={props.actColor} clear={props.clear} paleta={pal} row={i} id={props.id} />);
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
        circles.push(<Circles state={this.props.state} actColor={this.props.actColor} clase={'circles ' + colors[5]} clear={this.props.clear} id={'colors'} />);
        circles.push(<Circles state={this.props.state} actColor={this.props.actColor} clase={'circles ' + colors[6]} clear={this.props.clear} id={'colors'} />);
      }
      else {
        for (let i = 0; i < n; i++) {
          circles.push(<Circles state={this.props.state} actColor={this.props.actColor} clear={this.props.clear} clase={'circles ' + colors[i + (this.props.row)]} id={'colors'} />);
        }
      }

    }
    else {
      for (let i = 0; i < n; i++) {
        if (this.props.state.filas.length < 156) {
          circleid = { id: this.props.id + this.props.row + i, color: '' }
          this.props.state.filas.push(circleid)
        }
        circles.push(<Circles state={this.props.state} colorCircle={this.props.colorCircle} clear={this.props.clear} clase={'circles'} id={this.props.id + this.props.row + i} />);
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
          className={splitted[1] === this.props.state.activeColor ? this.props.clase + ' selected' : this.props.clase}
          id={this.props.id}
          onClick={() =>
            this.props.actColor(splitted[1])
          } >
        </span >


      )
    }
    else if (id[0] === 'c') {
      if (this.props.clear === "clear") {
        return (
          <span
            className={'clear'}
            id={this.props.id}>
          </span>)
      }
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