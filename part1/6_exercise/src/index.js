/*
 * @Author: SileR 
 * @Date: 2020-07-07 13:43:11 
 * @Last Modified by:   SileR 
 * @Last Modified time: 2020-07-07 13:43:11 
 */
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick,text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const Statistic = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({good,neutral,bad,feedbackOj}) => {
  if(good === 0 && neutral === 0 && bad=== 0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>
      <Statistic text = {feedbackOj.good.text} value = {feedbackOj.good.value} />
      <Statistic text = {feedbackOj.neutral.text} value = {feedbackOj.neutral.value} />
      <Statistic text = {feedbackOj.bad.text} value = {feedbackOj.bad.value} />
      <Statistic text = {feedbackOj.all.text} value = {feedbackOj.all.value} />
      <Statistic text = {feedbackOj.average.text} value = {feedbackOj.average.value} />
      <Statistic text = {feedbackOj.postitive.text} value = {feedbackOj.postitive.value} />
      </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good+1)
  const neutralClick = () => setNeutral(neutral+1)
  const badClick = () => setBad(bad+1)

  const feedbackOj = {
    good : {
      text : "good ",
      value : good
    },
    neutral : {
      text : "neutral ",
      value : neutral
    },
    bad : {
      text : "bad ",
      value : bad
    },
    all : {
      text : "all ",
      value : (good+neutral+bad)
    },
    average : {
      text : "average ",
      value : (((good*1)+(neutral*0)+(bad*-1))/(good+neutral+bad))
    },
    postitive : {
      text : "postitive ",
      value : ((good/(good+neutral+bad))/100 + " %")
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodClick} text="good"/>
      <Button onClick={neutralClick} text="neutra"/>
      <Button onClick={badClick} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral = {neutral} bad = {bad} feedbackOj = {feedbackOj}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)