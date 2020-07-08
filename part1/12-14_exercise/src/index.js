/*
 * @Author: SileR
 * @Date: 2020-07-07 15:13:26
 * @Last Modified by: SileR
 * @Last Modified time: 2020-07-07 18:16:09
 */
import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const VoteDisplay = ({ vote }) => <h3>has {vote} votes</h3>;


const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  // 创建与轶事数组相同长度的空数组状态
  const [voteArr, setVoteArr] = useState(new Array(anecdotes.length).fill(0));
  // 返回数组数值最大项下标
  const getMaxIndex = (arr) => {
    let max = arr[0];
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
      if (max < arr[i]) {
        max = arr[i];
        index = i;
      }
    }
    return index;
  };
  console.log(getMaxIndex(voteArr));
  // 状态设置为随机数
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * { anecdotes }.anecdotes.length));
  };
  // 创建编辑空数组状态副本
  const voteClick = () => {
    const copy = [...voteArr];
    copy[selected] += 1;
    setVoteArr(copy);
  };
  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <VoteDisplay vote={voteArr[selected]} />
      <Button onClick={voteClick} text="vote" />
      <Button onClick={handleClick} text="next anecdote" />
      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[getMaxIndex(voteArr)]}</p>
      <VoteDisplay vote={voteArr[getMaxIndex(voteArr)]} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
