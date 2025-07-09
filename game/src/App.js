import { useState, useEffect, useRef } from 'react';
import './CatchTheEmoji.css'; // Optional for additional styling

export default function CatchTheEmoji() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [emojiSize, setEmojiSize] = useState(50);
  const [speed, setSpeed] = useState(1000);
  const [position, setPosition] = useState({ top: '0%', right: '0%' });
  const [currentEmoji, setCurrentEmoji] = useState('🐻');
  const timerRef = useRef(null);
  const moveTimerRef = useRef(null);

  const emojis = ['🐻', '🐶', '🐱', '🦊', '🐵', '🐮', '🐨', '🐯', '🐷'];

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setEmojiSize(50);
    setSpeed(1000);
    moveEmoji();
  };

  const stopGame = () => {
    setIsPlaying(false);
    clearTimeout(moveTimerRef.current);
    clearInterval(timerRef.current);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const moveEmoji = () => {
    if (!isPlaying) return;

    setPosition({
      top: `${Math.random() * 80}%`,
      right: `${Math.random() * 80}%`
    });

    // Increase difficulty as score increases
    if (score > 0 && score % 5 === 0) {
      setEmojiSize(prev => Math.max(prev * 0.9, 20));
      setSpeed(prev => Math.max(prev * 0.9, 300));
    }

    // Change emoji randomly
    setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);

    // Schedule next move if not clicked
    moveTimerRef.current = setTimeout(moveEmoji, speed);
  };

  const handleEmojiClick = () => {
    setScore(prev => prev + 1);
    clearTimeout(moveTimerRef.current);
    moveEmoji();
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(moveTimerRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="game-container">
      <h1>Catch the Emoji!</h1>
      
      <div className="game-info">
        <div>Time: {timeLeft}s</div>
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>

      {!isPlaying ? (
        <button className="start-button" onClick={startGame}>
          {score === 0 ? 'Start Game' : 'Play Again'}
        </button>
      ) : (
        <span 
          onClick={handleEmojiClick}
          className="emoji"
          style={{
            top: position.top,
            right: position.right,
            fontSize: `${emojiSize}px`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          {currentEmoji}
        </span>
      )}

      <div className="difficulty">
        {isPlaying && (
          <>
            <div>Size: {Math.round(emojiSize)}px</div>
            <div>Speed: {Math.round(1000/speed)}x</div>
          </>
        )}
      </div>
    </div>
  );
}