import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

// 漢字データ
const kanjiData = {
  // 初級: 小学6年生レベル
  easy: [
    // 小6で習う漢字・熟語
    { kanji: '創造', reading: 'そうぞう', romaji: 'souzou' },
    { kanji: '推薦', reading: 'すいせん', romaji: 'suisen' },
    { kanji: '批評', reading: 'ひひょう', romaji: 'hihyou' },
    { kanji: '論理', reading: 'ろんり', romaji: 'ronri' },
    { kanji: '憲法', reading: 'けんぽう', romaji: 'kenpou' },
    { kanji: '政治', reading: 'せいじ', romaji: 'seiji' },
    { kanji: '経済', reading: 'けいざい', romaji: 'keizai' },
    { kanji: '将来', reading: 'しょうらい', romaji: 'shourai' },
    { kanji: '演奏', reading: 'えんそう', romaji: 'ensou' },
    { kanji: '誠実', reading: 'せいじつ', romaji: 'seijitsu' },
    { kanji: '臨時', reading: 'りんじ', romaji: 'rinji' },
    { kanji: '朗読', reading: 'ろうどく', romaji: 'roudoku' },
    { kanji: '疑問', reading: 'ぎもん', romaji: 'gimon' },
    { kanji: '宣言', reading: 'せんげん', romaji: 'sengen' },
    { kanji: '展覧', reading: 'てんらん', romaji: 'tenran' },
    { kanji: '密閉', reading: 'みっぺい', romaji: 'mippei' },
    { kanji: '尊敬', reading: 'そんけい', romaji: 'sonkei' },
    { kanji: '秘密', reading: 'ひみつ', romaji: 'himitsu' },
    { kanji: '補給', reading: 'ほきゅう', romaji: 'hokyuu' },
    { kanji: '宝庫', reading: 'ほうこ', romaji: 'houko' },
    { kanji: '幼稚', reading: 'ようち', romaji: 'youchi' },
    { kanji: '裏切', reading: 'うらぎり', romaji: 'uragiri' },
    { kanji: '激励', reading: 'げきれい', romaji: 'gekirei' },
    { kanji: '障害', reading: 'しょうがい', romaji: 'shougai' },
    { kanji: '勤務', reading: 'きんむ', romaji: 'kinmu' },
    { kanji: '警告', reading: 'けいこく', romaji: 'keikoku' },
    { kanji: '刻印', reading: 'こくいん', romaji: 'kokuin' },
    { kanji: '穀物', reading: 'こくもつ', romaji: 'kokumotsu' },
    { kanji: '砂漠', reading: 'さばく', romaji: 'sabaku' },
    { kanji: '裁判', reading: 'さいばん', romaji: 'saiban' },
    { kanji: '策略', reading: 'さくりゃく', romaji: 'sakuryaku' },
    { kanji: '磁石', reading: 'じしゃく', romaji: 'jishaku' },
    { kanji: '純粋', reading: 'じゅんすい', romaji: 'junsui' },
    { kanji: '熟語', reading: 'じゅくご', romaji: 'jukugo' },
    { kanji: '承認', reading: 'しょうにん', romaji: 'shounin' },
    { kanji: '蒸発', reading: 'じょうはつ', romaji: 'jouhatsu' },
    { kanji: '針路', reading: 'しんろ', romaji: 'shinro' },
    { kanji: '探検', reading: 'たんけん', romaji: 'tanken' },
    { kanji: '忠告', reading: 'ちゅうこく', romaji: 'chuukoku' },
    { kanji: '沈黙', reading: 'ちんもく', romaji: 'chinmoku' },
    { kanji: '展望', reading: 'てんぼう', romaji: 'tenbou' },
    { kanji: '派遣', reading: 'はけん', romaji: 'haken' },
    { kanji: '奮闘', reading: 'ふんとう', romaji: 'funtou' },
    { kanji: '暴露', reading: 'ばくろ', romaji: 'bakuro' },
    { kanji: '模範', reading: 'もはん', romaji: 'mohan' },
    { kanji: '誘惑', reading: 'ゆうわく', romaji: 'yuuwaku' },
    { kanji: '翌朝', reading: 'よくあさ', romaji: 'yokuasa' },
    { kanji: '欲望', reading: 'よくぼう', romaji: 'yokubou' },
    { kanji: '朗報', reading: 'ろうほう', romaji: 'rouhou' },
    { kanji: '枠組', reading: 'わくぐみ', romaji: 'wakugumi' },
  ],
  // 中級: 中学3年生レベル
  medium: [
    { kanji: '概念', reading: 'がいねん', romaji: 'gainen' },
    { kanji: '抽象', reading: 'ちゅうしょう', romaji: 'chuushou' },
    { kanji: '哲学', reading: 'てつがく', romaji: 'tetsugaku' },
    { kanji: '倫理', reading: 'りんり', romaji: 'rinri' },
    { kanji: '矛盾', reading: 'むじゅん', romaji: 'mujun' },
    { kanji: '普遍', reading: 'ふへん', romaji: 'fuhen' },
    { kanji: '恒久', reading: 'こうきゅう', romaji: 'koukyuu' },
    { kanji: '顕著', reading: 'けんちょ', romaji: 'kencho' },
    { kanji: '妥協', reading: 'だきょう', romaji: 'dakyou' },
    { kanji: '懸念', reading: 'けねん', romaji: 'kenen' },
    { kanji: '漠然', reading: 'ばくぜん', romaji: 'bakuzen' },
    { kanji: '煩雑', reading: 'はんざつ', romaji: 'hanzatsu' },
    { kanji: '脆弱', reading: 'ぜいじゃく', romaji: 'zeijaku' },
    { kanji: '陳腐', reading: 'ちんぷ', romaji: 'chinpu' },
    { kanji: '斬新', reading: 'ざんしん', romaji: 'zanshin' },
    { kanji: '簡潔', reading: 'かんけつ', romaji: 'kanketsu' },
    { kanji: '妥当', reading: 'だとう', romaji: 'datou' },
    { kanji: '虚構', reading: 'きょこう', romaji: 'kyokou' },
    { kanji: '洞察', reading: 'どうさつ', romaji: 'dousatsu' },
    { kanji: '逸脱', reading: 'いつだつ', romaji: 'itsudatsu' },
    { kanji: '乖離', reading: 'かいり', romaji: 'kairi' },
    { kanji: '頑固', reading: 'がんこ', romaji: 'ganko' },
    { kanji: '狡猾', reading: 'こうかつ', romaji: 'koukatsu' },
    { kanji: '誇張', reading: 'こちょう', romaji: 'kochou' },
    { kanji: '隠蔽', reading: 'いんぺい', romaji: 'inpei' },
    { kanji: '偏見', reading: 'へんけん', romaji: 'henken' },
    { kanji: '軽蔑', reading: 'けいべつ', romaji: 'keibetsu' },
    { kanji: '傲慢', reading: 'ごうまん', romaji: 'gouman' },
    { kanji: '謙虚', reading: 'けんきょ', romaji: 'kenkyo' },
    { kanji: '卑怯', reading: 'ひきょう', romaji: 'hikyou' },
    { kanji: '寛容', reading: 'かんよう', romaji: 'kanyou' },
    { kanji: '厳粛', reading: 'げんしゅく', romaji: 'genshuku' },
    { kanji: '繊細', reading: 'せんさい', romaji: 'sensai' },
    { kanji: '堅牢', reading: 'けんろう', romaji: 'kenrou' },
    { kanji: '脆弱', reading: 'ぜいじゃく', romaji: 'zeijaku' },
    { kanji: '緻密', reading: 'ちみつ', romaji: 'chimitsu' },
    { kanji: '奇抜', reading: 'きばつ', romaji: 'kibatsu' },
    { kanji: '陰鬱', reading: 'いんうつ', romaji: 'inutsu' },
    { kanji: '爽快', reading: 'そうかい', romaji: 'soukai' },
    { kanji: '朦朧', reading: 'もうろう', romaji: 'mourou' },
    { kanji: '憔悴', reading: 'しょうすい', romaji: 'shousui' },
    { kanji: '倦怠', reading: 'けんたい', romaji: 'kentai' },
    { kanji: '焦燥', reading: 'しょうそう', romaji: 'shousou' },
    { kanji: '葛藤', reading: 'かっとう', romaji: 'kattou' },
    { kanji: '嫉妬', reading: 'しっと', romaji: 'shitto' },
    { kanji: '憎悪', reading: 'ぞうお', romaji: 'zouo' },
    { kanji: '慈悲', reading: 'じひ', romaji: 'jihi' },
    { kanji: '怨恨', reading: 'えんこん', romaji: 'enkon' },
    { kanji: '愁傷', reading: 'しゅうしょう', romaji: 'shuushou' },
    { kanji: '悔恨', reading: 'かいこん', romaji: 'kaikon' },
  ],
  // 上級: 大学受験レベル
  hard: [
    { kanji: '薔薇', reading: 'ばら', romaji: 'bara' },
    { kanji: '憂鬱', reading: 'ゆううつ', romaji: 'yuuutsu' },
    { kanji: '躊躇', reading: 'ちゅうちょ', romaji: 'chuucho' },
    { kanji: '曖昧', reading: 'あいまい', romaji: 'aimai' },
    { kanji: '蒟蒻', reading: 'こんにゃく', romaji: 'konnyaku' },
    { kanji: '蜻蛉', reading: 'とんぼ', romaji: 'tonbo' },
    { kanji: '蟷螂', reading: 'かまきり', romaji: 'kamakiri' },
    { kanji: '向日葵', reading: 'ひまわり', romaji: 'himawari' },
    { kanji: '紫陽花', reading: 'あじさい', romaji: 'ajisai' },
    { kanji: '蒲公英', reading: 'たんぽぽ', romaji: 'tanpopo' },
    { kanji: '齟齬', reading: 'そご', romaji: 'sogo' },
    { kanji: '咀嚼', reading: 'そしゃく', romaji: 'soshaku' },
    { kanji: '逡巡', reading: 'しゅんじゅん', romaji: 'shunjun' },
    { kanji: '蹉跌', reading: 'さてつ', romaji: 'satetsu' },
    { kanji: '瓦解', reading: 'がかい', romaji: 'gakai' },
    { kanji: '怨嗟', reading: 'えんさ', romaji: 'ensa' },
    { kanji: '諧謔', reading: 'かいぎゃく', romaji: 'kaigyaku' },
    { kanji: '韜晦', reading: 'とうかい', romaji: 'toukai' },
    { kanji: '逍遥', reading: 'しょうよう', romaji: 'shouyou' },
    { kanji: '邂逅', reading: 'かいこう', romaji: 'kaikou' },
    { kanji: '彷徨', reading: 'ほうこう', romaji: 'houkou' },
    { kanji: '咆哮', reading: 'ほうこう', romaji: 'houkou' },
    { kanji: '慟哭', reading: 'どうこく', romaji: 'doukoku' },
    { kanji: '嗚咽', reading: 'おえつ', romaji: 'oetsu' },
    { kanji: '呻吟', reading: 'しんぎん', romaji: 'shingin' },
    { kanji: '喧噪', reading: 'けんそう', romaji: 'kensou' },
    { kanji: '静謐', reading: 'せいひつ', romaji: 'seihitsu' },
    { kanji: '蕭条', reading: 'しょうじょう', romaji: 'shoujou' },
    { kanji: '荒涼', reading: 'こうりょう', romaji: 'kouryou' },
    { kanji: '寂寥', reading: 'せきりょう', romaji: 'sekiryou' },
    { kanji: '瀟洒', reading: 'しょうしゃ', romaji: 'shousha' },
    { kanji: '頽廃', reading: 'たいはい', romaji: 'taihai' },
    { kanji: '蹂躙', reading: 'じゅうりん', romaji: 'juurin' },
    { kanji: '杜撰', reading: 'ずさん', romaji: 'zusan' },
    { kanji: '瞠目', reading: 'どうもく', romaji: 'doumoku' },
    { kanji: '瞑想', reading: 'めいそう', romaji: 'meisou' },
    { kanji: '跋扈', reading: 'ばっこ', romaji: 'bakko' },
    { kanji: '闘争', reading: 'とうそう', romaji: 'tousou' },
    { kanji: '蠢動', reading: 'しゅんどう', romaji: 'shundou' },
    { kanji: '佇立', reading: 'ちょりつ', romaji: 'choritsu' },
    { kanji: '屹立', reading: 'きつりつ', romaji: 'kitsuritsu' },
    { kanji: '林立', reading: 'りんりつ', romaji: 'rinritsu' },
    { kanji: '鳥瞰', reading: 'ちょうかん', romaji: 'choukan' },
    { kanji: '俯瞰', reading: 'ふかん', romaji: 'fukan' },
    { kanji: '峻厳', reading: 'しゅんげん', romaji: 'shungen' },
    { kanji: '峻峭', reading: 'しゅんしょう', romaji: 'shunshou' },
    { kanji: '蓋然', reading: 'がいぜん', romaji: 'gaizen' },
    { kanji: '必然', reading: 'ひつぜん', romaji: 'hitsuzen' },
    { kanji: '翻弄', reading: 'ほんろう', romaji: 'honrou' },
    { kanji: '瀕死', reading: 'ひんし', romaji: 'hinshi' },
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

// 難易度ごとの設定（速度を遅めに調整）
const difficultySettings = {
  easy: { baseTime: 12, minTime: 6, speedIncrease: 0.05 },
  medium: { baseTime: 10, minTime: 5, speedIncrease: 0.08 },
  hard: { baseTime: 8, minTime: 4, speedIncrease: 0.1 },
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
  const [showReading, setShowReading] = useState(false);
  
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
    setShowReading(false);
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
    setShowReading(false);
    
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
      setShowReading(true);
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
              <span className="diff-desc">小学6年生レベル</span>
            </button>

            <button onClick={() => startGame('medium')} className="diff-btn medium">
              <span className="diff-level">中級</span>
              <span className="diff-desc">中学3年生レベル</span>
            </button>

            <button onClick={() => startGame('hard')} className="diff-btn hard">
              <span className="diff-level">上級</span>
              <span className="diff-desc">大学受験レベル</span>
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
        
        {/* 読み仮名（ミス後に表示） */}
        {showReading && (
          <div className="reading-display">
            <span className="reading-text">{currentQuestion?.reading}</span>
          </div>
        )}
      </div>

      {/* 入力エリア */}
      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInput}
          className="typing-input"
          placeholder={showReading ? currentQuestion?.romaji : ''}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        {showReading && (
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
        )}
      </div>

      {/* フッター */}
      <div className="game-footer">
        <span>ESC: スキップ</span>
        <span>{difficulty === 'easy' ? '初級' : difficulty === 'medium' ? '中級' : '上級'}</span>
      </div>
    </div>
  );
}
