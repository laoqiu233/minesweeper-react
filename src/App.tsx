import React from 'react';
import Game from './features/game/Game';

function App() {
    return (
        <div className="App">
            <Game settings={{height:16, width: 16, minesCount: 40}}/>
        </div>
    );
}

export default App;
