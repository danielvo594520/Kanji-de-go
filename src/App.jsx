import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

// 漢字データ
const kanjiData = {
  easy: [
    { kanji: '山', reading: 'やま', romaji: 'yama' },
    { kanji: '川', reading: 'かわ', romaji: 'kawa' },
    { kanji: '空', reading: 'そら', romaji: 'sora' },
    { kanji: '海', reading: 'うみ', romaji: 'umi' },
    { kanji: '花', reading: 'はな', romaji: 'hana' },
    { kanji: '星', reading: 'ほし', romaji: 'hoshi' },
    { kanji: '月', reading: 'つき', romaji: 'tsuki' },
    { kanji: '雨', reading: 'あめ', romaji: 'ame' },
    { kanji: '風', reading: 'かぜ', romaji: 'kaze' },
    { kanji: '火', reading: 'ひ', romaji: 'hi' },
    { kanji: '水', reading: 'みず', romaji: 'mizu' },
    { kanji: '木', reading: 'き', romaji: 'ki' },
    { kanji: '土', reading: 'つち', romaji: 'tsuchi' },
    { kanji: '金', reading: 'かね', romaji: 'kane' },
    { kanji: '石', reading: 'いし', romaji: 'ishi' },
  ],
  medium: [
    { kanji: '桜', reading: 'さくら', romaji: 'sakura' },
    { kanji: '紅葉', reading: 'もみじ', romaji: 'momiji' },
    { kanji: '蝶', reading: 'ちょう', romaji: 'chou' },
    { kanji: '鶴', reading: 'つる', romaji: 'tsuru' },
    { kanji: '亀', reading: 'かめ', romaji: 'kame' },
    { kanji: '雪', reading: 'ゆき', romaji: 'yuki' },
    { kanji: '霧', reading: 'きり', romaji: 'kiri' },
    { kanji: '雷', reading: 'かみなり', romaji: 'kaminari' },
    { kanji: '虹', reading: 'にじ', romaji: 'niji' },
    { kanji: '夢', reading: 'ゆめ', romaji: 'yume' },
    { kanji: '心', reading: 'こころ', romaji: 'kokoro' },
    { kanji: '愛', reading: 'あい', romaji: 'ai' },
    { kanji: '命', reading: 'いのち', romaji: 'inochi' },
    { kanji: '絆', reading: 'きずな', romaji: 'kizuna' },
    { kanji: '希望', reading: 'きぼう', romaji: 'kibou' },
  ],
  hard: [
    { kanji: '薔薇', reading: 'ばら', romaji: 'bara' },
    { kanji: '憂鬱', reading: 'ゆううつ', romaji: 'yuuutsu' },
    { kanji: '躊躇', reading: 'ちゅうちょ', romaji: 'chuucho' },
    { kanji: '曖昧', reading: 'あいまい', romaji: 'aimai' },
    { kanji: '贅沢', reading: 'ぜいたく', romaji: 'zeitaku' },
    { kanji: '挨拶', reading: 'あいさつ', romaji: 'aisatsu' },
    { kanji: '醤油', reading: 'しょうゆ', romaji: 'shouyu' },
    { kanji: '蒟蒻', reading: 'こんにゃく', romaji: 'konnyaku' },
    { kanji: '胡瓜', reading: 'きゅうり', romaji: 'kyuuri' },
    { kanji: '林檎', reading: 'りんご', romaji: 'ringo' },
    { kanji: '蜻蛉', reading: 'とんぼ', romaji: 'tonbo' },
    { kanji: '蟷螂', reading: 'かまきり', romaji: 'kamakiri' },
    { kanji: '向日葵', reading: 'ひまわり', romaji: 'himawari' },
    { kanji: '紫陽花', reading: 'あじさい', romaji: 'ajisai' },
    { kanji: '蒲公英', reading: 'たんぽぽ', romaji: 'tanpopo' },
  ],
};

// ローマ字の代替入力パターン
const romajiAlternatives = {
  'si': 'shi', 'shi': 'si',
  'ti': 'chi', 'chi': 'ti',
  'tu': 'tsu', 'tsu': 'tu',
  'hu': 'fu', 'fu': 'hu',
  'zi': 'ji', 'ji': 'zi',
  'sya': 'sha', 'sha': 'sya',
  'syu': 'shu', 'shu': 'syu',
  'syo': 'sho', 'sho': 'syo',
  'tya': 'cha', 'cha': 'tya',
  'tyu': 'chu', 'chu': 'tyu',
  'tyo': 'cho', 'cho': 'tyo',
  'zya': 'ja', 'ja': 'zya',
  'zyu': 'ju', 'ju': 'zyu',
  'zyo': 'jo', 'jo': 'zyo',
  'nn': 'n',
};

const isValidInput = (input, target) => {
  if (target.startsWith(input)) return true;
  for (const [alt, orig] of Object.entries(romajiAlternatives)) {
    const altTarget = target.replace(new RegExp(orig, 'g'), alt);
    if (altTarget.startsWith(input)) return true;
  }
  return false;
};

const isComplete = (input, target) => {
  if (input === target) return true;
  for (const [alt, orig] of Object.entries(romajiAlternatives)) {
    const altTarget = target.replace(new RegExp(orig, 'g'), alt);
    if (input === altTarget) return true;
  }
  return false;
};

// 難易度ごとの設定
const difficultySettings = {
  easy: { baseTime: 8, minTime: 4, speedIncrease: 0.1 },
  medium: { baseTime: 6, minTime: 3, speedIncrease: 0.15 },
  hard: { baseTime: 5, minTime: 2, speedIncrease: 0.2 },
};

export default function App() {
  const [gameState, setGameState] = useState('title');
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalMiss, setTotalMiss] = useState(0);
  const [showEffect, setShowEffect] = useState(null);
  
  // 迫ってくる演出用
  const [scale, setScale] = useState(1);
  const [timeForQuestion, setTimeForQuestion] = useState(8);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const inputRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(null);

  // ゲーム開始
  const startGame = (diff) => {
    const shuffled = [...kanjiData[diff]].sort(() => Math.random() - 0.5);
    const settings = difficultySettings[diff];
    
    setQuestions(shuffled);
    setCurrentQuestion(shuffled[0]);
    setQuestionIndex(0);
    setInput('');
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setTotalCorrect(0);
    setTotalMiss(0);
    setDifficulty(diff);
    setScale(1);
    setTimeForQuestion(settings.baseTime);
    setElapsedTime(0);
    setGameState('playing');
  };

  // 次の問題へ
  const nextQuestion = useCallback((success = true) => {
    const nextIndex = (questionIndex + 1) % questions.length;
    const settings = difficultySettings[difficulty];
    
    if (nextIndex === 0) {
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setCurrentQuestion(shuffled[0]);
    } else {
      setCurrentQuestion(questions[nextIndex]);
    }
    
    setQuestionIndex(nextIndex);
    setInput('');
    setScale(1);
    setElapsedTime(0);
    
    // 成功時は時間を短縮
    if (success) {
      setTimeForQuestion(prev => Math.max(settings.minTime, prev - settings.speedIncrease));
    }
  }, [questionIndex, questions, difficulty]);

  // 迫ってくるアニメーション
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      setElapsedTime(prev => {
        const newTime = prev + delta;
        
        // 時間切れ
        if (newTime >= timeForQuestion) {
          setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setGameState('result');
            } else {
              setCombo(0);
              setTotalMiss(m => m + 1);
              setShowEffect('timeout');
              setTimeout(() => {
                setShowEffect(null);
                nextQuestion(false);
              }, 500);
            }
            return newLives;
          });
          return 0;
        }
        
        // スケール計算（1 → 20 に拡大）
        const progress = newTime / timeForQuestion;
        const newScale = 1 + (progress * progress * 19); // 二次関数で加速
        setScale(newScale);
        
        return newTime;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, timeForQuestion, nextQuestion]);

  // フォーカス管理
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentQuestion]);

  // キー入力処理
  const handleKeyDown = (e) => {
    if (gameState !== 'playing') return;
    
    if (e.key === 'Escape') {
      setCombo(0);
      setTotalMiss(prev => prev + 1);
      nextQuestion(false);
    }
  };

  // 入力処理
  const handleInput = (e) => {
    if (gameState !== 'playing' || !currentQuestion) return;
    
    const newInput = e.target.value.toLowerCase();
    const target = currentQuestion.romaji;

    if (isComplete(newInput, target)) {
      const baseScore = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 150 : 200;
      const comboBonus = Math.floor(combo * 10);
      const timeBonus = Math.floor((1 - elapsedTime / timeForQuestion) * 50);
      const newCombo = combo + 1;
      
      setScore(prev => prev + baseScore + comboBonus + timeBonus);
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setTotalCorrect(prev => prev + 1);
      setShowEffect('correct');
      
      setTimeout(() => {
        setShowEffect(null);
        nextQuestion(true);
      }, 200);
      return;
    }

    if (isValidInput(newInput, target)) {
      setInput(newInput);
    } else {
      setCombo(0);
      setTotalMiss(prev => prev + 1);
      setShowEffect('miss');
      setTimeout(() => setShowEffect(null), 200);
    }
  };

  // タイトル画面
  if (gameState === 'title') {
    return (
      <div className="game-container title-screen">
        <div className="background-kanji">
          <span className="bg-char bg-char-1">漢</span>
          <span className="bg-char bg-char-2">字</span>
          <span className="bg-char bg-char-3">打</span>
          <span className="bg-char bg-char-4">鍵</span>
        </div>

        <div className="title-content">
          <div className="title-header">
            <h1 className="game-title">漢字タイピング</h1>
            <p className="game-subtitle">KANJI TYPING GAME</p>
          </div>

          <div className="difficulty-buttons">
            <p className="select-text">難易度を選択</p>
            
            <button onClick={() => startGame('easy')} className="diff-btn easy">
              <span className="diff-level">初級</span>
              <span className="diff-desc">基本の漢字</span>
            </button>

            <button onClick={() => startGame('medium')} className="diff-btn medium">
              <span className="diff-level">中級</span>
              <span className="diff-desc">少し難しい漢字</span>
            </button>

            <button onClick={() => startGame('hard')} className="diff-btn hard">
              <span className="diff-level">上級</span>
              <span className="diff-desc">難読漢字</span>
            </button>
          </div>

          <div className="instructions">
            <p>漢字の読みをローマ字で入力</p>
            <p>時間内に打たないと漢字が迫ってくる！</p>
          </div>
        </div>
      </div>
    );
  }

  // リザルト画面
  if (gameState === 'result') {
    const accuracy = totalCorrect + totalMiss > 0 
      ? Math.round((totalCorrect / (totalCorrect + totalMiss)) * 100) 
      : 0;
    
    const rank = score >= 3000 ? 'S' : score >= 2000 ? 'A' : score >= 1500 ? 'B' : score >= 1000 ? 'C' : 'D';

    return (
      <div className="game-container result-screen">
        <div className="result-content">
          <h2 className="result-title">RESULT</h2>
          
          <div className={`rank rank-${rank}`}>{rank}</div>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">SCORE</span>
              <span className="stat-value">{score.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">MAX COMBO</span>
              <span className="stat-value combo">{maxCombo}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">正解数</span>
              <span className="stat-value correct">{totalCorrect}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">正確率</span>
              <span className="stat-value accuracy">{accuracy}%</span>
            </div>
          </div>

          <div className="result-buttons">
            <button onClick={() => startGame(difficulty)} className="btn-retry">
              RETRY
            </button>
            <button onClick={() => setGameState('title')} className="btn-title">
              TITLE
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ゲーム画面
  const progress = elapsedTime / timeForQuestion;
  const urgency = progress > 0.7 ? 'critical' : progress > 0.4 ? 'warning' : 'normal';

  return (
    <div 
      className={`game-container playing-screen ${showEffect || ''} ${urgency}`}
      onKeyDown={handleKeyDown}
    >
      {/* 背景エフェクト */}
      <div className="danger-overlay" style={{ opacity: progress * 0.5 }} />
      
      {/* ヘッダー */}
      <div className="game-header">
        <div className="header-left">
          <div className="score-display">
            <span className="label">SCORE</span>
            <span className="value">{score.toLocaleString()}</span>
          </div>
          <div className="combo-display">
            <span className="label">COMBO</span>
            <span className="value">{combo}</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="lives-display">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`life ${i < lives ? 'active' : 'lost'}`}>
                ♥
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* タイムバー */}
      <div className="time-bar-container">
        <div 
          className={`time-bar ${urgency}`}
          style={{ width: `${(1 - progress) * 100}%` }}
        />
      </div>

      {/* メイン：迫ってくる漢字 */}
      <div className="kanji-stage">
        <div 
          className={`approaching-kanji ${showEffect === 'correct' ? 'success' : ''}`}
          style={{
            transform: `scale(${scale})`,
            opacity: Math.min(1, 0.3 + scale * 0.1),
          }}
        >
          {currentQuestion?.kanji}
        </div>
        
        {/* 読み仮名（固定位置） */}
        <div className="reading-display">
          <span className="reading-text">{currentQuestion?.reading}</span>
        </div>
      </div>

      {/* 入力エリア */}
      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInput}
          className="typing-input"
          placeholder={currentQuestion?.romaji}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        <div className="romaji-progress">
          {currentQuestion?.romaji.split('').map((char, i) => (
            <span
              key={i}
              className={i < input.length ? 'typed' : 'pending'}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* フッター */}
      <div className="game-footer">
        <span>ESC: スキップ</span>
        <span>{difficulty === 'easy' ? '初級' : difficulty === 'medium' ? '中級' : '上級'}</span>
      </div>
    </div>
  );
}
