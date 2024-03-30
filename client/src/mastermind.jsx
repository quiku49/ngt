import React from "react"
import io from 'socket.io-client'
import { Logout } from "./logout";
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
        const savedState = JSON.parse(window.localStorage.getItem('mastermindState'));
        this.state = savedState || {
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
    componentDidUpdate() {
        window.localStorage.setItem('mastermindState', JSON.stringify(this.state));
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
        }, () => {});
    }

    comboSet() {
        if (this.checkIntento(this.state.intento) && this.state.turn == 0) {
            this.setState({
                activeFila: this.state.activeFila + 1,
                intento: [],
                turn: 1
            }, () => {
                this.socket.emit('movement', 
                                    {state: this.state,
                                    userAuth: JSON.parse(window.localStorage.getItem('userAuth')), 
                                    room: JSON.parse(window.localStorage.getItem('room'))
                                 })
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
                                    {state: this.state,
                                    userAuth: JSON.parse(window.localStorage.getItem('userAuth')), 
                                    room: JSON.parse(window.localStorage.getItem('room'))
                                 })
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
                                    {state: this.state,
                                    userAuth: JSON.parse(window.localStorage.getItem('userAuth')), 
                                    room: JSON.parse(window.localStorage.getItem('room'))
                                 })
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
        this.socket.on('room', (room) => {
            if(room.roomid == JSON.parse(window.localStorage.getItem('room')).roomid){
                window.localStorage.setItem('room', JSON.stringify(room))
                window.location.reload();
            }
        });
        this.socket.on("move", (data) => {
            if(data.room.roomid != JSON.parse(window.localStorage.getItem('room')).roomid){
            }
            else{
                this.setState({
                    activeColor: data.state.activeColor,
                    activeFila: data.state.activeFila,
                    activeCircle: data.state.activeCircle,
                    combination: data.state.combination,
                    filas: data.state.filas,
                    intento: data.state.intento,
                    turn: data.state.turn
                },() => {});
            }
        })

        return (
            <div>
                <h1>Mastermind</h1>
                <h2>sala: {JSON.parse(window.localStorage.getItem('room')).roomid}</h2>
                <div>
                    <h3>Participantes:</h3>
                    <h3>{JSON.parse(window.localStorage.getItem('room')).player1UserName}</h3>
                    <h3>{JSON.parse(window.localStorage.getItem('room')).player2UserName}</h3>
                </div>
                <Logout />
                <div className="main">
                    <Reglas />
                    <Board state={this.state}
                        colorCircle={this.setColor}
                        actColor={this.activateColor}
                        combination={this.comboSet}
                        correct={this.correction}
                        doneCorrect={this.doneCorrection} />
                </div>
            </div>
        )
    }
} 