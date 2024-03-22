import React from "react"

import { Board } from "./board";
import { Reglas } from "./rules";

export class Mastermind extends React.Component {
    constructor(props) {
        super(props)
        this.setColor = this.setColor.bind(this)
        this.activateColor = this.activateColor.bind(this)
        this.comboSet = this.comboSet.bind(this)
        this.correction = this.correction.bind(this)
        this.doneCorrection = this.doneCorrection.bind(this)
        this.state = {
            activeColor: '',
            activeFila: 0,
            activeCircle: 0,
            combination: [],
            filas: [],
            intento: [],
            turn: 0
        }
    }
    //Pone color a los circulos del tablero principal
    setColor(color, id) {

        let filas = this.state.filas
        let pos = filas.findIndex(item => item.id === id)
        let combination = this.state.intento
        console.log(filas)
        if (this.state.activeFila == 0 && pos >= 150 && this.state.turn == 0) {
            filas[pos] = { id: id, color: color }
            combination[pos - 150] = { id: id, color: color }
            this.setState({
                combination: combination
            });
        }
        else if (pos < this.state.activeFila * 5 && pos >= ((this.state.activeFila * 5) - 5) && this.state.turn == 1 && pos < 75) {

            filas[pos] = { id: id, color: color }
            combination[pos % 5] = { id: id, color: color }
        }
        else if (pos < (this.state.activeFila + 15) * 5 && pos >= (((this.state.activeFila + 15) * 5) - 5) && this.state.turn == 2 && pos >= 75 && pos < 150) {
            if (color === 'white' || color === 'black') {
                filas[pos] = { id: id, color: color }
                combination[pos % 5] = { id: id, color: color }
            }
        }
        this.setState({
            filas: filas,
            intento: combination
        });
    }
    //activa un color para poner en el intento
    activateColor(color) {
        this.setState({
            activeColor: color
        });
    }

    comboSet() {
        if (this.checkIntento(this.state.intento) && this.state.turn == 0) {
            this.setState({
                activeFila: this.state.activeFila + 1,
                intento: [],
                turn: 1
            });
        }
    }
    correction() {
        if (this.checkIntento(this.state.intento) && this.state.turn == 1) {
            this.setState({
                intento: [],
                turn: 2
            });
        }
    }
    doneCorrection() {
        if (this.state.turn == 2) {
            this.setState({
                activeFila: this.state.activeFila + 1,
                intento: [],
                turn: 1
            });
        }

    }
    checkIntento(intento) {
        for (let i = 0; i < 5; i++) {
            if (intento[i]);
            else {
                return false
            }
        }
        return true
    }
    render() {
        return (
            <div className="main">
                <Reglas />
                <Board state={this.state}
                    colorCircle={this.setColor}
                    actColor={this.activateColor}
                    combination={this.comboSet}
                    correct={this.correction}
                    doneCorrect={this.doneCorrection} />
            </div>
        )
    }
} 