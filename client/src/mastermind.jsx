import React from "react"
import io from 'socket.io-client'
import { useEffect } from "react";
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
            turn: 0,
            isLoading: true
        }
        this.socket = io("http://192.168.1.110:8080")
    }
    componentDidMount() {
        const userAuth = JSON.parse(window.localStorage.getItem('userAuth'));
        if (!userAuth || !userAuth.token) {
            window.location.href = '/login'
        }
        else{
            this.setState({ isLoading: false })
        }
    }
    //Pone color a los circulos del tablero principal
    setColor(color, id) {

        let filas = this.state.filas
        let pos = filas.findIndex(item => item.id === id)
        let combination = this.state.intento
        
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
        }, () => {
            this.socket.emit('movement', 
                                    [this.state,
                                    window.localStorage.getItem('userAuth'), 
                                    window.localStorage.getItem('room')
                                ])
        });
    }

    comboSet() {
        if (this.checkIntento(this.state.intento) && this.state.turn == 0) {
            this.setState({
                activeFila: this.state.activeFila + 1,
                intento: [],
                turn: 1
            }, () => {
                this.socket.emit('movement', 
                                    [this.state,
                                    window.localStorage.getItem('userAuth'), 
                                    window.localStorage.getItem('room')
                                ])
            });
        }
    }
    correction() {
        if (this.checkIntento(this.state.intento) && this.state.turn == 1) {
            this.setState({
                intento: [],
                turn: 2
            }, () => {
                this.socket.emit('movement', 
                                    [this.state,
                                    window.localStorage.getItem('userAuth'), 
                                    window.localStorage.getItem('room')
                                ])
                });
        }
    }
    doneCorrection() {
        if (this.state.turn == 2) {
            this.setState({
                activeFila: this.state.activeFila + 1,
                intento: [],
                turn: 1
            }, () => {
                this.socket.emit('movement', 
                                    [this.state,
                                    window.localStorage.getItem('userAuth'), 
                                    window.localStorage.getItem('room')
                                ])
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
        if (this.state.isLoading) {
            return null; // or return <LoadingScreen />;
        }
        this.socket.on("move", (data) => {
            if(data.room != window.localStorage.getItem('room')){
                
            }
            else{
                this.setState({
                    activeColor: data.activeColor,
                    activeFila: data.activeFila,
                    activeCircle: data.activeCircle,
                    combination: data.combination,
                    filas: data.filas,
                    intento: data.intento,
                    turn: data.turn,
                    isLoading: true
                });
            }
        })

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