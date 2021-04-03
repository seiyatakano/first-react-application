import {createContext} from 'react'

const AppContext = createContext()
//Contextを作成する数は、作成するapplicationの規模による。軽量のapplicationはContext一つでも事足りる。
//データを提供(Provider)したいコンポーネントとデータを受け取りたい(Consumer)コンポーネントの両者にimportして使用する。
//Providerの方はapplicationのトップレベルになる。ラップしてデータを提供できる
//ConsumerはProviderにラップされている場所なら、どこからでもアクセスできる
export default AppContext