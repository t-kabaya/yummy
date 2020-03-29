## 規約
hooksのstateは、先頭に_をつける。
例） const [_name, setName] = useState('bob')

firestoreは、timeStampを保持していない。
createdAtに、サーバーの時間を追加する。


## いいねの仕様
いいねボタンはトグル式
最近いいねされた人のリストが表示される。

ユーザーが名前を変更しても、Feed内部の名前は変更されない。これで良いか。

Feedのデータ構造の中に、

nicedUsers: [
  {
    userId: 'aoeua',
    userName: 'kabaya'
  },
  {
    userId: 'aoeuaoeuaoe'
    userName: 'foo bar'
  }
]

firestoreでのデータ設計
document
multipul collections
subcollections within document


subCollectionsは、案外すぐに破綻しそう。
なるべくインデックスを貼った、普通のcollectionを普通のsubCollectionの代わりとして使ってあげたほうが良さそう。

FireStore上の全てのデータにIDを与える必要があるな。
idは、
data.data()ではなく、data.idで取得出来るらしい。