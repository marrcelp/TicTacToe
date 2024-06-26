import React, {useState, useEffect} from 'react';

function Square({value, onClickHandler}){
    return (
      <button className={value === 'X' ? 'square square-x' : 'square square-o'} onClick={onClickHandler}>{value}</button>
    );
}


const Game = () => {

    const [squares, setSquares] = useState(Array(9).fill(''));
    const [isXturn, setIsXturn] = useState(true);
    const [status, setStatus] = useState('');
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [scoreDraw, setScoreDraw] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    function handleRestart(){
        setSquares(Array(9).fill(''));
        setStatus('');
        setIsGameOver(false)
    }

    function handleClick(squareNumber){
        let squaresCopy = [...squares];
        if (getWinner(squaresCopy) || squaresCopy[squareNumber] !== ''){
            return;
        }
        squaresCopy[squareNumber] = isXturn ? 'X' : 'O';
        console.log(squaresCopy);

        setIsXturn(!isXturn);
        setSquares(squaresCopy);
    }

    function getWinner(squares) {

        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningPatterns.length; i++) {
            const [square1, square2, square3] = winningPatterns[i];

            if (squares[square1] !== '' && squares[square1] === squares[square2] && squares[square1] === squares[square3]) {

                return squares[square1];
            }
        }

        return null
    }

    useEffect(() => {
        if (!getWinner(squares) && squares.every((square) => square !== '')){
            setStatus(`IT'S A DRAW! Restart the game.`)
            setIsGameOver(true);
            setScoreDraw(prevScoreDraw => ++prevScoreDraw);

        } else if (getWinner(squares)) {
            setIsGameOver(true);
            setStatus(`WINNER IS ${getWinner(squares)}! Restart the game.`);

            if (getWinner(squares) === 'X') {
                setScoreX(prevScoreX => ++prevScoreX);
            }
            if (getWinner(squares) === 'O') {
                setScoreO(prevScoreO => ++prevScoreO);
            }
        }
    }, [squares, isXturn]);


    return (
        <div className='game_container'>

                <div className='row'>
                    <div className='square_score'>
                        <h2>PLAYER X</h2>
                        <p>{scoreX}</p>
                    </div>
                    <div className='square_score'>
                        <h2>DRAW</h2>
                        <p>{scoreDraw}</p>
                    </div>
                    <div className='square_score'>
                        <h2>PLAYER O</h2>
                        <p>{scoreO}</p>
                    </div>
                </div>

                <div className='row'>
                    <Square value={squares[0]} onClickHandler={() => handleClick(0)}/>
                    <Square value={squares[1]} onClickHandler={() => handleClick(1)}/>
                    <Square value={squares[2]} onClickHandler={() => handleClick(2)}/>
                </div>

                <div className='row'>
                    <Square value={squares[3]} onClickHandler={() => handleClick(3)}/>
                    <Square value={squares[4]} onClickHandler={() => handleClick(4)}/>
                    <Square value={squares[5]} onClickHandler={() => handleClick(5)}/>
                </div>

                <div className='row'>
                    <Square value={squares[6]} onClickHandler={() => handleClick(6)}/>
                    <Square value={squares[7]} onClickHandler={() => handleClick(7)}/>
                    <Square value={squares[8]} onClickHandler={() => handleClick(8)}/>
                </div>

                <div className='row_text'>
                    <h1 className='status_title'>{status}</h1>
                    {!isGameOver && <p className='status_title'>{isXturn ? `It's X turn` : `It's O turn` }</p>}
                </div>

                <div className='row'>
                    <button className='button_restart' onClick={handleRestart}>RESTART GAME</button>
                </div>

        </div>
    );
};

export default Game;