# クライアント編集対応の公開手順

このLPは、公開後にクライアントが `/admin` から文言・画像を編集できるように、Decap CMS対応を追加しています。

## 1. まずGitHubにアップロード

1. GitHubで新しいリポジトリを作成します。
2. このフォルダの中身をリポジトリにアップロードします。
3. `index.html`、`styles.css`、`script.js`、`assets`、`content`、`admin` が入っていることを確認します。

## 2. NetlifyでGitHub連携公開

1. Netlifyで「Add new site」からGitHubリポジトリを選びます。
2. ビルドコマンドは空欄で構いません。
3. 公開ディレクトリはリポジトリ直下にします。
4. Deployします。

Netlify Dropではなく、GitHub連携で公開してください。CMSで編集した内容をGitHubに保存し、Netlifyが自動で再公開するためです。

## 3. Netlify IdentityとGit Gatewayを有効化

1. Netlifyのサイト管理画面でIdentityを有効化します。
2. Registration preferencesは、基本的に「Invite only」にします。
3. Git Gatewayを有効化します。
4. クライアントのメールアドレスを招待します。

クライアントは招待メールからアカウントを作成します。

## 4. クライアントの編集方法

1. 公開URLの末尾に `/admin` を付けて開きます。
   - 例: `https://example.netlify.app/admin`
2. 招待されたメールアドレスでログインします。
3. 「LPトップ」を開きます。
4. 文言や画像を編集します。
5. 保存するとGitHubに反映され、Netlifyが自動で再公開します。

## 5. 編集できる内容

- ブラウザタイトル、説明文、フッター
- トップの事業名、説明文、概要チップ
- トップ画像ギャラリー
- 事業説明
- 具体的な活動内容
- 協働の考え方
- 活動の時系列
- 代表者メッセージ
- プロジェクト概要

## 6. ローカル確認

ローカルで確認する場合は、ファイルを直接開くよりも簡易サーバー経由で見るのが確実です。

```powershell
cd C:\Users\mrhar\Documents\Codex\2026-05-06\lp
python -m http.server 8080
```

その後、以下を開きます。

```text
http://127.0.0.1:8080/
```

管理画面の保存機能は、NetlifyとGitHub連携後に使う想定です。
