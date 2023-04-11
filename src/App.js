import { useState, useCallback, useMemo } from "react";
import { ChildArea } from "./ChildArea";
import "./styles.css";

export default function App() {
  console.log("APP");
  const [text, setCount] = useState("");
  const [open, setOpen] = useState(false);

  const onChangeText = (event) => {
    setCount(event.target.value);
  };

  const onClickOpen = () => {
    setOpen(!open);
  };

  const onClickClose = useCallback(() => setOpen(false), [setOpen]);
  // useCallback はmemoの関数版。第一引数にアロー関数を取る。第二引数の値が変更された際にのみ、再レンダリングする。
  // 空の配列を入れておけば、最初の読み込み以外では読み込まない。

  const temp = useMemo(() => 1 + 3, []);

  return (
    <div className="App">
      <input value={text} onChange={onChangeText} />
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClickClose={onClickClose} />
    </div>
  );
}

//アロー関数は、新しい関数を生成するものとして認識される。
//onClickCloseをuseCallbackで囲わずにアロー関数で書くと、ChildAreaに新しくpropsとしてわたってしまうので、コンポーネント側でmemoで囲っても、再レンダリングしてしまう。
