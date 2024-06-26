import React from "react"
import io from 'socket.io-client'
import { Turns } from "../turns.jsx";
import { Logout } from "../auth/logout.jsx";
import { Board } from "./board";
import { Reglas } from "./rules.jsx";
import { LOCAL_IP } from '../../config.js';
import victory from '../../resources/victoria.gif'

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
            turn: '',
            isLoading: true,
            player1: '',
            player1Status: 0,
            player2: '',
            player2Status: 0,
            playerSelf: '',
            roomid: '',
            turn0: '',
            turn1: '',
            turn2: '',
            turns: 0,
            pointsPlayer1: '',
            pointsPlayer2: '',
            comboSet: 0,
            endOfGame: 0
        }
        this.socket = io("http://" + LOCAL_IP)
        this.roomid = ''
        this.player1 = ''
        this.player2 = ''
    }
    componentDidUpdate() {
        window.localStorage.setItem('mastermindState', JSON.stringify(this.state));
    }
    componentDidMount() {
        const userAuth = JSON.parse(window.localStorage.getItem('userAuth'));
        if (!userAuth || !userAuth.token) {
            window.location.href = '/login'
        }
        else {

            this.roomid = JSON.parse(window.localStorage.getItem('room')).roomid
            this.player1 = JSON.parse(window.localStorage.getItem('room')).player1UserName
            this.player2 = JSON.parse(window.localStorage.getItem('room')).player2UserName
            this.setState({
                player1: this.player1,
                player2: this.player2,
                roomid: this.roomid,
                player1Status: this.player1 ? 1 : 0,
                player2Status: this.player2 ? 1 : 0,
                playerSelf: userAuth.user,
                isLoading: false
            }, () => { });

        }

    }
    //Pone color a los circulos del tablero principal
    setColor = (color, id) => {

        let filas = this.state.filas
        let pos = filas.findIndex(item => item.id === id)
        let combination = this.state.intento
        //console.log(this.state.activeFila, pos, this.state.turn0, this.state.playerSelf)
        if (this.state.activeFila == 0 && pos >= 150 && this.state.turn0 == this.state.playerSelf) {
            filas[pos] = { id: id, color: color }
            combination[pos - 150] = { id: id, color: color }
            this.setState({
                combination: combination
            });
        }
        else if (pos < this.state.activeFila * 5 && pos >= ((this.state.activeFila * 5) - 5) && this.state.turn == this.state.playerSelf && this.state.turn1 == this.state.playerSelf && pos < 75) {

            filas[pos] = { id: id, color: color }
            combination[pos % 5] = { id: id, color: color }
        }
        else if (pos < (this.state.activeFila + 15) * 5 && pos >= (((this.state.activeFila + 15) * 5) - 5) && this.state.turn == this.state.playerSelf && this.state.turn2 == this.state.playerSelf && pos >= 75 && pos < 150) {
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
        }, () => { });
    }
    //Establece la combinación
    comboSet() {
        if (this.checkIntento(this.state.intento) && this.state.turn0 == this.state.playerSelf) {
            this.setState({
                activeFila: this.state.activeFila + 1,
                intento: [],
                turn: this.state.turn1,
                activeColor: '',
                comboSet: 1
            }, () => {
                this.socket.emit('movement',
                    {
                        state: this.state,
                        userAuth: JSON.parse(window.localStorage.getItem('userAuth')),
                        room: JSON.parse(window.localStorage.getItem('room'))
                    })
            });
        }
    }
    //Corrige el intento
    correction() {
        if (this.checkIntento(this.state.intento) && this.state.turn == this.state.playerSelf) {
            this.setState({
                intento: [],
                turn: this.state.turn2,
                activeColor: '',
                pointsPlayer1: this.state.pointsPlayer1 -1,
                pointsPlayer2: this.state.pointsPlayer2 +1
            }, () => {
                this.socket.emit('movement',
                    {
                        state: this.state,
                        userAuth: JSON.parse(window.localStorage.getItem('userAuth')),
                        room: JSON.parse(window.localStorage.getItem('room'))
                    })
            });
        }
    }
    //Envia la corrección
    doneCorrection() {
        this.endOfGame()
        if (this.state.turn == this.state.playerSelf) {
            this.setState({
                activeFila: this.state.activeFila + 1,
                intento: [],
                turn: this.state.turn1,
                activeColor: ''
            }, () => {
                this.socket.emit('movement',
                    {
                        state: this.state,
                        userAuth: JSON.parse(window.localStorage.getItem('userAuth')),
                        room: JSON.parse(window.localStorage.getItem('room'))
                    })
            });
        }

    }
    endOfGame() {
        let intento = this.state.intento
        for (let i = 0; i < 5; i++) {
            if (intento[i].color != 'black'){
                return false
            }
        }
        this.setState({
            endOfGame: 1,
            pointsPlayer1: this.state.pointsPlayer1 + 5,

        })
        return true
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
            if (room.roomid == this.roomid) {
                window.localStorage.setItem('room', JSON.stringify(room))
                this.setState({
                    player1: room.player1UserName,
                    player2: room.player2UserName,
                    roomid: room.roomid
                }, () => { });
            }
        });
        this.socket.on("move", (data) => {
            if (data.room.roomid == this.roomid) {
                this.setState({
                    activeColor: data.state.activeColor,
                    activeFila: data.state.activeFila,
                    activeCircle: data.state.activeCircle,
                    combination: data.state.combination,
                    filas: data.state.filas,
                    intento: data.state.intento,
                    turn: data.state.turn,
                    pointsPlayer1: data.state.pointsPlayer1,
                    pointsPlayer2: data.state.pointsPlayer2,
                    comboSet: data.state.comboSet,
                    endOfGame: data.state.endOfGame
                }, () => { });
            }
        })
        this.socket.on('logIn', (data) => {
            if (data === this.state.player1) {
                this.setState({ player1Status: 1 }, () => { });
            } else if (data === this.state.player2) {
                this.setState({ player2Status: 1 }, () => { });
            }
        });
        this.socket.on('logOut', (data) => {
            if (data.room == this.roomid) {
                if (this.player1 == data.userName) {
                    this.setState({
                        player1Status: 0
                    }, () => { });
                }
                else {
                    this.setState({
                        player2Status: 0
                    }, () => { });
                }

            }

        });
        this.socket.on('turns', (data) => {
            console.log(this.state.player1, this.state.player2, this.state.turns, data)
            if (this.state.player1 != '' && this.state.player2 != '' && this.state.turns == 0) {
                let players = [this.state.player1, this.state.player2];
                let t1 = players[data];
                players.splice(data, 1);
                let t2 = players[0];
                this.setState({
                    turn0: t2,
                    turn1: t1,
                    turn2: t2,
                    turn: t2,
                    turns: 1,
                    pointsPlayer1: this.state.player1 === t1 ? 15 : 0,
                    pointsPlayer2: this.state.player2 === t1 ? 15 : 0
                }, () => { });
            }
        });



        return (
            <div>
                
                <div className="top">
                    <div className="participantes">
                        <h3>{this.state.player1} {this.state.player1 && <span className={this.state.player1Status === 1 ? "connection" : "disconnection"}></span>}</h3>
                        <h3>{this.state.player2} {this.state.player2 && <span className={this.state.player2Status === 1 ? "connection" : "disconnection"}></span>}</h3>
                        <h3>{this.state.pointsPlayer1 === '' ? '' : this.state.pointsPlayer1 + " puntos"}</h3>
                        <h3>{this.state.pointsPlayer2 === '' ? '' : this.state.pointsPlayer2 + " puntos"}</h3>
                    </div>
                    <h1>Mastermind</h1>
                    <div className="topButtons">
                        <Logout />
                        <br />
                        <div style={{display:'flex'}}>
                            {this.state.turn0 != '' ? '' : 
                                <><p>Sortear los turnos de la partida:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><Turns /></>}
                            
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="panelIzq">
                    <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        sala: {this.state.roomid}</h2>
                        <div className="inforoomturn">
                            <h2 className="turn">
                                {this.state.turn === '' ? 'Deben sortear los turnos para comenzar' : this.state.turn === this.state.playerSelf ? "Es tu turno!!" : "Turno del rival..."}
                            </h2>
                        </div>
                        <Reglas />
                    </div>
                    {this.state.endOfGame === 0 ? '' : (
                        <>
                        <div className="victory">
                            <p>Victoria!!</p>
                            <img src={victory} alt="" />
                            <p>{this.state.player1} ha ganado: {this.state.pointsPlayer1} puntos</p>
                            <p>{this.state.player2} ha ganado: {this.state.pointsPlayer2} puntos</p>
                        </div>
                        </>)}

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