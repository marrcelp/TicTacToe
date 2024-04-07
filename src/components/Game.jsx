import React, {useState, useEffect} from 'react';

function Square({value, onClickHandler}){
    return (
      <button className='square' onClick={onClickHandler}>{value}</button>
    );
}

//0 1 2
//3 4 5
//6 7 8


const Game = () => {

    const [squares, setSquares] = useState(Array(9).fill(''));
    const [isXturn, setIsXturn] = useState(true);

    function handleClick(squareNumber){
        let squaresCopy = [...squares];
        if (squaresCopy[squareNumber] !== ''){
            return;
        }
        squaresCopy[squareNumber] = isXturn ? 'X' : 'O';
        console.log(squaresCopy);

        setIsXturn(!isXturn);
        setSquares(squaresCopy);

    }

    function handleRestart(){
        setSquares(Array(9).fill(''));
    }

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



    return (
        <div className='game_container'>

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

                <div className='row'>
                    <p>{isXturn ? `It's X turn` : `It's O turn` }</p>
                </div>

                <div className='row'>
                    <button onClick={handleRestart}>RESTART THE GAME</button>
                </div>

        </div>
    );
};

export default Game;