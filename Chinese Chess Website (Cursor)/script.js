class ChineseChess {
    constructor() {
        this.board = document.getElementById('chess-board');
        this.boardContainer = document.querySelector('.board-container');
        this.currentPlayer = 'red';
        this.selectedPiece = null;
        this.gameEnded = false;
        
        // Initialize sound effects
        this.soundEnabled = false;
        this.sounds = {
            select: document.getElementById('select-sound'),
            move: document.getElementById('move-sound'),
            capture: document.getElementById('capture-sound')
        };
        
        // Set optimal volume levels
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5;  // Set to 50% volume
        });
        
        // Create check announcement element
        this.checkAnnouncement = document.createElement('div');
        this.checkAnnouncement.className = 'check-announcement';
        document.body.appendChild(this.checkAnnouncement);
        
        this.setupSoundToggle();
        this.initializeBoard();
        this.setupEventListeners();
        
        // Flip the board at the start since red player is starting
        this.boardContainer.classList.add('flipped');
    }

    setupSoundToggle() {
        const soundToggle = document.getElementById('sound-toggle');
        
        const enableSound = () => {
            this.soundEnabled = true;
            soundToggle.textContent = '🔊 Sound On';
            // Play a test sound at low volume
            const testSound = this.sounds.select;
            testSound.volume = 0.2;
            testSound.play().then(() => {
                testSound.volume = 0.5;  // Reset to normal volume
            }).catch(console.error);
        };

        soundToggle.addEventListener('click', () => {
            if (!this.soundEnabled) {
                enableSound();
            } else {
                this.soundEnabled = false;
                soundToggle.textContent = '🔇 Enable Sound';
            }
        });

        // Try to enable sound automatically
        enableSound();
    }

    playSound(soundType) {
        if (!this.soundEnabled) return;
        
        const sound = this.sounds[soundType];
        if (!sound) return;
        
        // Ensure the sound can be replayed quickly
        sound.currentTime = 0;
        
        // Play the sound
        sound.play().catch(error => {
            console.error(`Error playing ${soundType} sound:`, error);
            // If we get an error, don't disable sound - it might just be a temporary issue
        });
    }

    initializeBoard() {
        // Create the board cells
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                // Add river background for rows 4 and 5
                if (i === 4 || i === 5) {
                    const riverBg = document.createElement('div');
                    riverBg.className = 'river-bg';
                    cell.appendChild(riverBg);
                }
                
                this.board.appendChild(cell);
            }
        }

        // Initialize pieces
        const initialPieces = {
            red: {
                '0,0': '車', '0,1': '馬', '0,2': '相', '0,3': '仕', '0,4': '帥',
                '0,5': '仕', '0,6': '相', '0,7': '馬', '0,8': '車',
                '2,1': '炮', '2,7': '炮',
                '3,0': '兵', '3,2': '兵', '3,4': '兵', '3,6': '兵', '3,8': '兵'
            },
            black: {
                '9,0': '俥', '9,1': '傌', '9,2': '象', '9,3': '士', '9,4': '將',
                '9,5': '士', '9,6': '象', '9,7': '傌', '9,8': '俥',
                '7,1': '砲', '7,7': '砲',
                '6,0': '卒', '6,2': '卒', '6,4': '卒', '6,6': '卒', '6,8': '卒'
            }
        };

        for (const [color, pieces] of Object.entries(initialPieces)) {
            for (const [position, piece] of Object.entries(pieces)) {
                this.createPiece(piece, position, color);
            }
        }
    }

    createPiece(piece, position, color) {
        const [row, col] = position.split(',').map(Number);
        const cell = this.board.children[row * 9 + col];
        const pieceElement = document.createElement('div');
        pieceElement.className = `piece ${color}`;
        pieceElement.textContent = piece;
        pieceElement.dataset.row = row;
        pieceElement.dataset.col = col;
        cell.appendChild(pieceElement);
    }

    setupEventListeners() {
        this.board.addEventListener('click', (e) => {
            if (this.gameEnded) return;
            
            // Ensure the check announcement doesn't interfere with clicks
            if (e.target.classList.contains('check-announcement')) return;
            
            const piece = e.target.closest('.piece');
            const cell = e.target.closest('.cell');
            
            if (piece) {
                this.handlePieceClick(piece);
            } else if (cell) {
                this.handleCellClick(cell);
            }
        });

        document.getElementById('reset-game').addEventListener('click', () => {
            this.resetGame();
        });

        document.getElementById('new-game').addEventListener('click', () => {
            this.resetGame();
        });
    }

    handlePieceClick(piece) {
        const pieceColor = piece.classList.contains('red') ? 'red' : 'black';
        
        if (pieceColor === this.currentPlayer) {
            this.selectPiece(piece);
        } else if (this.selectedPiece) {
            this.movePiece(piece);
        }
    }

    handleCellClick(cell) {
        if (this.selectedPiece) {
            this.movePiece(cell);
        }
    }

    selectPiece(piece) {
        if (this.selectedPiece) {
            this.selectedPiece.classList.remove('selected');
            this.clearValidMoves();
        }
        this.selectedPiece = piece;
        piece.classList.add('selected');
        this.showValidMoves(piece);
        this.playSound('select');
    }

    clearValidMoves() {
        const cells = this.board.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.classList.remove('valid-move');
            cell.classList.remove('in-check');
            // Remove valid move indicators
            const indicators = cell.getElementsByClassName('valid-move-indicator');
            while (indicators.length > 0) {
                indicators[0].remove();
            }
        }
    }

    showValidMoves(piece) {
        this.clearValidMoves();
        const currentRow = parseInt(piece.dataset.row);
        const currentCol = parseInt(piece.dataset.col);
        const pieceType = piece.textContent;
        const isRed = piece.classList.contains('red');

        // Check all possible positions
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.isValidMove(piece, row, col)) {
                    // Create a temporary piece to simulate the move
                    const tempPiece = piece.cloneNode(true);
                    tempPiece.dataset.row = row;
                    tempPiece.dataset.col = col;
                    
                    // Check if the move would put/leave the king in check
                    if (!this.wouldBeInCheck(tempPiece, row, col)) {
                        const cell = this.board.children[row * 9 + col];
                        cell.classList.add('valid-move');
                        
                        // Add valid move indicator
                        const indicator = document.createElement('div');
                        indicator.className = 'valid-move-indicator';
                        cell.appendChild(indicator);
                    }
                }
            }
        }
    }

    wouldBeInCheck(piece, targetRow, targetCol) {
        const currentRow = parseInt(piece.dataset.row);
        const currentCol = parseInt(piece.dataset.col);
        const isRed = piece.classList.contains('red');
        
        // Create a temporary board state
        const tempBoard = new Array(10).fill(null).map(() => new Array(9).fill(null));
        
        // Copy current board state
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = this.board.children[row * 9 + col];
                const piece = cell.querySelector('.piece');
                if (piece) {
                    tempBoard[row][col] = {
                        type: piece.textContent,
                        color: piece.classList.contains('red') ? 'red' : 'black'
                    };
                }
            }
        }

        // Simulate the move
        tempBoard[currentRow][currentCol] = null;
        tempBoard[targetRow][targetCol] = {
            type: piece.textContent,
            color: isRed ? 'red' : 'black'
        };

        // Find the king's position in the temporary board
        const kingChar = isRed ? '帥' : '將';
        let kingRow = -1, kingCol = -1;
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 9; col++) {
                if (tempBoard[row][col] && 
                    tempBoard[row][col].type === kingChar && 
                    tempBoard[row][col].color === (isRed ? 'red' : 'black')) {
                    kingRow = row;
                    kingCol = col;
                    break;
                }
            }
            if (kingRow !== -1) break;
        }

        // Check if any opponent piece can capture the king
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 9; col++) {
                const piece = tempBoard[row][col];
                if (piece && piece.color === (isRed ? 'black' : 'red')) {
                    // Create a temporary piece object for move validation
                    const tempPiece = {
                        textContent: piece.type,
                        classList: { contains: (color) => piece.color === color },
                        dataset: { row: row, col: col }
                    };
                    
                    if (this.isValidMove(tempPiece, kingRow, kingCol)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    isInCheck(isRed) {
        // Find the king's position
        const kingChar = isRed ? '帥' : '將';
        let kingRow = -1, kingCol = -1;
        
        // Find king position
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = this.board.children[row * 9 + col];
                const piece = cell.querySelector('.piece');
                if (piece && piece.textContent === kingChar && piece.classList.contains(isRed ? 'red' : 'black')) {
                    kingRow = row;
                    kingCol = col;
                    console.log(`Found ${isRed ? 'red' : 'black'} king at ${row},${col}`);
                    break;
                }
            }
            if (kingRow !== -1) break;
        }

        // Check if any opponent piece can capture the king
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = this.board.children[row * 9 + col];
                const piece = cell.querySelector('.piece');
                if (piece && piece.classList.contains(isRed ? 'black' : 'red')) {
                    if (this.isValidMove(piece, kingRow, kingCol)) {
                        console.log(`${isRed ? 'Red' : 'Black'} king is in check by ${piece.textContent} at ${row},${col}`);
                        return true;
                    }
                }
            }
        }

        return false;
    }

    hasLegalMoves(isRed) {
        // Check all pieces of the current color
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = this.board.children[row * 9 + col];
                const piece = cell.querySelector('.piece');
                if (piece && piece.classList.contains(isRed ? 'red' : 'black')) {
                    // Check all possible moves for this piece
                    for (let targetRow = 0; targetRow < 10; targetRow++) {
                        for (let targetCol = 0; targetCol < 9; targetCol++) {
                            if (this.isValidMove(piece, targetRow, targetCol)) {
                                // Check if this move would get out of check
                                if (!this.wouldBeInCheck(piece, targetRow, targetCol)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    isCheckmate(isRed) {
        // Must be in check and have no legal moves
        return this.isInCheck(isRed) && !this.hasLegalMoves(isRed);
    }

    endGame(winner) {
        this.gameEnded = true;
        const gameEndMessage = document.querySelector('.game-end-message');
        const gameEndText = document.getElementById('game-end-text');
        gameEndText.textContent = `${winner} wins by checkmate!`;
        gameEndMessage.classList.add('show');

        // Play a dramatic sound effect for checkmate
        if (this.soundEnabled) {
            // Play all sounds at once for dramatic effect
            Object.values(this.sounds).forEach(sound => {
                sound.currentTime = 0;
                sound.play().catch(console.error);
            });
        }

        // Start the fade to black
        setTimeout(() => {
            const overlay = document.querySelector('.fade-overlay');
            overlay.classList.add('active');

            // Wait for the fade to complete, then reload
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Match this with the CSS transition duration
        }, 1500); // Give time to see the game end message
    }

    movePiece(target) {
        if (!this.selectedPiece || this.gameEnded) return;

        const targetCell = target.classList.contains('cell') ? target : target.parentElement;
        const targetRow = parseInt(targetCell.dataset.row);
        const targetCol = parseInt(targetCell.dataset.col);

        if (this.isValidMove(this.selectedPiece, targetRow, targetCol)) {
            if (this.wouldBeInCheck(this.selectedPiece, targetRow, targetCol)) {
                return;
            }
            
            // Store the moving player's color before making any changes
            const movingPlayer = this.currentPlayer;
            
            const existingPiece = targetCell.querySelector('.piece');
            const isCapture = existingPiece !== null;
            
            if (existingPiece) {
                existingPiece.remove();
            }

            const newPiece = document.createElement('div');
            newPiece.className = this.selectedPiece.className;
            newPiece.textContent = this.selectedPiece.textContent;
            newPiece.dataset.row = targetRow;
            newPiece.dataset.col = targetCol;
            
            this.selectedPiece.remove();
            targetCell.appendChild(newPiece);
            
            // Play sound effect
            this.playSound(isCapture ? 'capture' : 'move');
            
            this.selectedPiece = null;
            this.clearValidMoves();

            // Switch player
            this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
            document.getElementById('current-player').textContent = 
                `Current Player: ${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)}`;
            
            // Check if the opponent is in check
            const opponentColor = movingPlayer === 'red' ? 'black' : 'red';
            const isInCheckNow = this.isInCheck(opponentColor === 'red');
            console.log(`After ${movingPlayer}'s move, is ${opponentColor} in check?`, isInCheckNow);

            // Check for checkmate
            if (isInCheckNow && this.isCheckmate(opponentColor === 'red')) {
                const winner = movingPlayer.charAt(0).toUpperCase() + movingPlayer.slice(1);
                this.endGame(winner);
                return;
            }

            // Always ensure the check announcement is cleared first
            this.checkAnnouncement.classList.remove('show');
            this.checkAnnouncement.style.transform = '';
            
            // Flip board after a delay
            setTimeout(() => {
                this.boardContainer.classList.toggle('flipped');
                
                // If in check, show the announcement
                if (isInCheckNow && !this.gameEnded) {
                    console.log(`${movingPlayer} player put ${opponentColor} in check!`);
                    
                    // Play check sound
                    if (this.soundEnabled) {
                        this.playSound('capture');
                    }
                    
                    // Force a reflow to ensure the animation plays
                    void this.checkAnnouncement.offsetWidth;
                    
                    // Show check announcement with proper rotation
                    this.checkAnnouncement.textContent = "将军! 你傻逼!";
                    this.checkAnnouncement.classList.add('show');
                    
                    // Rotate based on who made the checking move
                    // The announcement should be right-side up for the player who made the check
                    if (movingPlayer === 'black') {
                        this.checkAnnouncement.style.transform = 'translate(-50%, -50%) rotate(180deg)';
                    }
                    
                    // Remove the announcement after delay
                    setTimeout(() => {
                        if (!this.gameEnded) {
                            this.checkAnnouncement.classList.remove('show');
                            // Clear the transform after the animation
                            setTimeout(() => {
                                if (!this.gameEnded) {
                                    this.checkAnnouncement.style.transform = '';
                                }
                            }, 500);
                        }
                    }, 1500);
                }
            }, 500);
        }
    }

    isValidMove(piece, targetRow, targetCol) {
        const currentRow = parseInt(piece.dataset.row);
        const currentCol = parseInt(piece.dataset.col);
        const pieceType = piece.textContent;
        const isRed = piece.classList.contains('red');
        
        // Can't capture your own pieces
        const targetCell = this.board.children[targetRow * 9 + targetCol];
        const targetPiece = targetCell.querySelector('.piece');
        if (targetPiece && targetPiece.classList.contains(isRed ? 'red' : 'black')) {
            return false;
        }

        // Helper function to check if a position is within the palace
        const isInPalace = (row, col) => {
            if (isRed) {
                return row >= 0 && row <= 2 && col >= 3 && col <= 5;
            } else {
                return row >= 7 && row <= 9 && col >= 3 && col <= 5;
            }
        };

        // Helper function to check if a position is within the river
        const isInRiver = (row) => {
            return row >= 4 && row <= 5;
        };

        // Helper function to count pieces between two positions
        const countPiecesBetween = (startRow, startCol, endRow, endCol) => {
            let count = 0;
            if (startRow === endRow) {
                // Horizontal movement
                const start = Math.min(startCol, endCol);
                const end = Math.max(startCol, endCol);
                for (let col = start + 1; col < end; col++) {
                    if (this.board.children[startRow * 9 + col].querySelector('.piece')) {
                        count++;
                    }
                }
            } else if (startCol === endCol) {
                // Vertical movement
                const start = Math.min(startRow, endRow);
                const end = Math.max(startRow, endRow);
                for (let row = start + 1; row < end; row++) {
                    if (this.board.children[row * 9 + startCol].querySelector('.piece')) {
                        count++;
                    }
                }
            }
            return count;
        };

        // Movement rules for each piece type
        switch (pieceType) {
            case '帥': case '將': // General/King
                // Must stay within palace
                if (!isInPalace(targetRow, targetCol)) return false;
                
                // Can only move one step horizontally or vertically
                if ((Math.abs(targetRow - currentRow) + Math.abs(targetCol - currentCol)) !== 1) return false;
                
                // Check for facing generals rule (only if moving to the same column as the opponent's general)
                if (targetCol === currentCol) {
                    // Already in the same column, no need to check
                } else {
                    // Find opponent's general
                    const opponentKingChar = isRed ? '將' : '帥';
                    let opponentKingRow = -1, opponentKingCol = -1;
                    
                    for (let row = 0; row < 10; row++) {
                        const cell = this.board.children[row * 9 + targetCol]; // Same column as target position
                        const cellPiece = cell.querySelector('.piece');
                        if (cellPiece && cellPiece.textContent === opponentKingChar) {
                            opponentKingRow = row;
                            opponentKingCol = targetCol;
                            break;
                        }
                    }
                    
                    if (opponentKingRow !== -1) {
                        // Check if there are pieces between the kings
                        if (countPiecesBetween(targetRow, targetCol, opponentKingRow, opponentKingCol) === 0) {
                            return false; // Invalid move, generals would be facing each other
                        }
                    }
                }
                return true;

            case '仕': case '士': // Advisor
                // Must stay within palace
                if (!isInPalace(targetRow, targetCol)) return false;
                // Can only move one step diagonally
                return Math.abs(targetRow - currentRow) === 1 && Math.abs(targetCol - currentCol) === 1;

            case '相': case '象': // Elephant
                // Cannot cross river
                if (isRed && targetRow > 4) return false;
                if (!isRed && targetRow < 5) return false;
                // Must move exactly two steps diagonally
                if (Math.abs(targetRow - currentRow) !== 2 || Math.abs(targetCol - currentCol) !== 2) return false;
                // Check if the path is blocked
                const elephantRow = currentRow + (targetRow - currentRow) / 2;
                const elephantCol = currentCol + (targetCol - currentCol) / 2;
                return !this.board.children[elephantRow * 9 + elephantCol].querySelector('.piece');

            case '馬': case '傌': // Horse
                // Must move in an L shape
                const rowDiff = Math.abs(targetRow - currentRow);
                const colDiff = Math.abs(targetCol - currentCol);
                if (!((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2))) return false;
                // Check if the path is blocked
                let blockingRow, blockingCol;
                if (rowDiff === 2) {
                    // Moving 2 steps vertically
                    blockingRow = currentRow + (targetRow - currentRow) / 2;
                    blockingCol = currentCol;
                } else {
                    // Moving 2 steps horizontally
                    blockingRow = currentRow;
                    blockingCol = currentCol + (targetCol - currentCol) / 2;
                }
                return !this.board.children[blockingRow * 9 + blockingCol].querySelector('.piece');

            case '車': case '俥': // Chariot
                // Must move horizontally or vertically
                if (currentRow !== targetRow && currentCol !== targetCol) return false;
                // Cannot jump over pieces
                return countPiecesBetween(currentRow, currentCol, targetRow, targetCol) === 0;

            case '炮': case '砲': // Cannon
                // Must move horizontally or vertically
                if (currentRow !== targetRow && currentCol !== targetCol) return false;
                const piecesBetween = countPiecesBetween(currentRow, currentCol, targetRow, targetCol);
                // Can only capture if exactly one piece is between
                if (targetPiece) {
                    return piecesBetween === 1;
                }
                // Cannot jump over pieces when not capturing
                return piecesBetween === 0;

            case '兵': case '卒': // Pawn
                const forward = isRed ? 1 : -1;
                const isCrossedRiver = isRed ? currentRow > 4 : currentRow < 5;
                
                if (isCrossedRiver) {
                    // After crossing river, can move sideways
                    return (targetRow === currentRow && Math.abs(targetCol - currentCol) === 1) ||
                           (targetCol === currentCol && targetRow === currentRow + forward);
                } else {
                    // Before crossing river, can only move forward
                    return targetCol === currentCol && targetRow === currentRow + forward;
                }

            default:
                return false;
        }
    }

    resetGame() {
        // Clear the board
        while (this.board.firstChild) {
            this.board.removeChild(this.board.firstChild);
        }

        // Reset game state
        this.currentPlayer = 'red';
        this.selectedPiece = null;
        this.gameEnded = false;
        document.getElementById('current-player').textContent = 'Current Player: Red';
        this.boardContainer.classList.remove('flipped');
        
        // Hide game end message and check announcement
        document.querySelector('.game-end-message').classList.remove('show');
        this.checkAnnouncement.classList.remove('show');
        this.checkAnnouncement.textContent = '';

        // Reinitialize the board
        this.initializeBoard();
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new ChineseChess();
}); 