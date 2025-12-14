# 漢字タイピングゲーム 🎮

漢字でGOにインスパイアされた、漢字の読みをタイピングするゲームです。
時間が経過すると漢字が迫ってきます！

## ✨ 特徴

- **迫ってくる漢字**: 時間経過で漢字が画面いっぱいに拡大
- **3段階の難易度**: 初級・中級・上級（難読漢字）
- **ライフ制**: 3回ミスでゲームオーバー
- **コンボシステム**: 連続正解でボーナス加算
- **ローマ字入力対応**: shi/si、chi/ti など複数の入力方式に対応

## 🚀 セットアップ手順

### 1. リポジトリの作成

```bash
# 新しいディレクトリを作成
mkdir kanji-typing-game
cd kanji-typing-game

# Gitリポジトリを初期化
git init
```

### 2. ファイルの配置

以下の構成でファイルを配置してください：

```
kanji-typing-game/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── App.css
└── README.md
```

### 3. 依存関係のインストール

```bash
npm install
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてゲームを確認できます。

### 5. 本番ビルド

```bash
npm run build
```

`dist/` フォルダに静的ファイルが生成されます。

## 🌐 デプロイ方法

### Vercel（推奨）

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

### Netlify

```bash
# ビルド
npm run build

# dist フォルダをNetlifyにドラッグ&ドロップ
# または Netlify CLIを使用
```

### GitHub Pages

```bash
# gh-pages パッケージをインストール
npm install --save-dev gh-pages

# package.json の scripts に追加
# "deploy": "gh-pages -d dist"

# デプロイ
npm run build
npm run deploy
```

## 🎮 操作方法

| 操作 | 説明 |
|------|------|
| キーボード入力 | 漢字の読みをローマ字で入力 |
| ESC | 現在の問題をスキップ（コンボリセット） |

## ⚙️ カスタマイズ

### 漢字データの追加

`src/App.jsx` の `kanjiData` オブジェクトに追加：

```javascript
const kanjiData = {
  easy: [
    { kanji: '新しい漢字', reading: 'よみがな', romaji: 'yomigana' },
    // ...
  ],
  // ...
};
```

### 難易度調整

`difficultySettings` で時間や速度を調整：

```javascript
const difficultySettings = {
  easy: { baseTime: 8, minTime: 4, speedIncrease: 0.1 },
  medium: { baseTime: 6, minTime: 3, speedIncrease: 0.15 },
  hard: { baseTime: 5, minTime: 2, speedIncrease: 0.2 },
};
```

## 📝 今後の拡張案

- [ ] サウンドエフェクト追加
- [ ] ローカルランキング機能
- [ ] 四字熟語モード
- [ ] 地名モード
- [ ] タイムアタックモード
- [ ] オンラインランキング

## 🛠️ 技術スタック

- React 18
- Vite 5
- CSS3 (アニメーション)

## 📄 ライセンス

MIT License
