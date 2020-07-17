import React, { useState, useEffect } from "react";
import personService from "./service/service";
import "./index.css";
// 成功提示
const Notification = ({ message, boIf }) => {
  if (message === null) {
    return null;
  } else if (boIf === true) {
    return <div className="message success">{message}</div>;
  } else {
    return <div className="message error">{message}</div>;
  }
};
const ErrNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="success">{message}</div>;
};
// 删除事件
const deleteFun = (person, personAll, setPersons) => {
  // 弹出对话框
  if (window.confirm(`Delete ${person.name} ?`)) {
    // 如用户确定发送delete请求
    personService.dele(person.id);
    // 更新状态，过滤删除项
    setPersons(personAll.filter((n) => n.id !== person.id));
  }
};
// 联系人信息显示组件
const PersonsDisplay = ({ personsFil, personAll, setPersons }) =>
  // 显示联系人信息及删除按钮
  personsFil.map((person) => (
    <div key={person.id}>
      <span>{person.name}</span>
      <span> {person.number}</span>
      <button onClick={() => deleteFun(person, personAll, setPersons)}>
        delete
      </button>
    </div>
  ));
// 过滤组件
const Filter = ({ filter, filterInputChange }) => (
  <div>
    filter shown with: <input value={filter} onChange={filterInputChange} />
  </div>
);

// 添加通讯录表单
const PersonForm = ({
  addPerson,
  newName,
  nameInputChange,
  newNumber,
  numberInputChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={nameInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [boIf, setBoIf] = useState(true);
  // 获取通讯录，更新状态
  useEffect(() => {
    personService.getAll().then((personAll) => setPersons(personAll));
  }, []);
  // 如过滤输入框有内容则过滤掉不含有过滤输入框内容的联系人信息
  const personsToShow = !filter
    ? persons
    : persons.filter((person) => person.name.indexOf(filter) !== -1);
  // 添加联系人事件
  const addPerson = (event) => {
    event.preventDefault();
    // 创建新对象
    const personOj = { name: newName, number: newNumber };
    // 如果原有联系人任意一项的姓名没有含新建姓名
    if (
      persons.findIndex((arr) => arr.name.toString() === newName.toString()) ===
      -1
      // 发送创建请求，更新状态
    ) {
      personService.creat(personOj).then((returnPerson) => {
        setBoIf(true);
        setMessage(`${returnPerson.name} phone book created`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        console.log(returnPerson);
        setPersons(persons.concat(returnPerson));
      });
      // 如果含有新建姓名
    } else {
      // 弹出选择对话框，询问是否更新号码
      if (
        window.confirm(
          `${newName} is already added to phoneBook, replace the old number with a new one?`
        )
        // 点击确定后
      ) {
        // 新建含有原先新建对象的对象，更新对象中号码
        const newObj = { ...personOj, number: newNumber };
        // 发送更新请求
        personService
          .update(
            persons.filter((n) => n.name.toString() === newName.toString())[0]
              .id,
            newObj
          )
          .then((returnPerson) => {
            setBoIf(true);
            setMessage(`${returnPerson.name} phone book edited`);
            // 更新状态
            setPersons(
              persons.map((person) =>
                person.id !== returnPerson.id ? person : returnPerson
              )
            );
          })
          .catch((error) => {
            setBoIf(false);
            setMessage(
              `Information of ${newObj.name} has already been removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 3000);
            console.log(newObj);
            setPersons(persons.filter((n) => n.name !== newObj.name));
          });
      }
    }
    // 初始化
    setNewName("");
    setNewNumber("");
  };
  // input同步
  const nameInputChange = (event) => {
    setNewName(event.target.value);
  };
  const numberInputChange = (event) => {
    setNewNumber(event.target.value);
  };
  const filterInputChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification message={message} boIf={boIf} />
      <Filter filter={filter} filterInputChange={filterInputChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        nameInputChange={nameInputChange}
        numberInputChange={numberInputChange}
      />
      <h2>Numbers</h2>
      <PersonsDisplay
        personsFil={personsToShow}
        personAll={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
