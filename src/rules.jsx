export function Reglas() {
    return (
        <div className="reglas">
            <h1>Como jugar:</h1>
            <div className="rulestext">
                <p>
                    Mastermind es un juego de mesa, de ingenio y reflexión, para dos jugadores.
                    <br></br><br></br>Se juega en un tablero con fichas blancas y negras pequeñas y de otros colores, de un tamaño algo superior. Uno de los jugadores escoge un número de fichas de colores, 4 en el juego original, y pone un código secreto oculto del otro jugador. Este, tomando fichas de colores del mismo conjunto, aventura una posibilidad contestada con negras, fichas de color bien colocadas, o blancas, fichas de color con el color correcto, pero mal colocadas.
                    <br></br><br></br>Termina al averiguarse la combinación, es decir, se consigue una combinación con cinco negras, o bien se agota el tablero.
                </p>
            </div>
        </div>
);
  }