(this["webpackJsonp15-18_exercise"]=this["webpackJsonp15-18_exercise"]||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(14),l=t(2),i=t(3),m=t.n(i),s="/api/persons",f=function(){return m.a.get(s).then((function(e){return e.data}))},d=function(e){return m.a.post(s,e).then((function(e){return e.data}))},b=function(e){m.a.delete("".concat(s,"/").concat(e))},p=function(e,n){return m.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},h=(t(37),function(e){var n=e.message,t=e.boIf;return null===n?null:!0===t?r.a.createElement("div",{className:"message success"},n):r.a.createElement("div",{className:"message error"},n)}),E=function(e){var n=e.personsFil,t=e.personAll,a=e.setPersons;return n.map((function(e){return r.a.createElement("div",{key:e.id},r.a.createElement("span",null,e.name),r.a.createElement("span",null," ",e.number),r.a.createElement("button",{onClick:function(){return function(e,n,t){window.confirm("Delete ".concat(e.name," ?"))&&(b(e.id),t(n.filter((function(n){return n.id!==e.id}))))}(e,t,a)}},"delete"))}))},v=function(e){var n=e.filter,t=e.filterInputChange;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},g=function(e){var n=e.addPerson,t=e.newName,a=e.nameInputChange,u=e.newNumber,c=e.numberInputChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),m=i[0],s=i[1],b=Object(a.useState)(""),w=Object(l.a)(b,2),O=w[0],j=w[1],S=Object(a.useState)(""),I=Object(l.a)(S,2),C=I[0],k=I[1],N=Object(a.useState)(null),x=Object(l.a)(N,2),y=x[0],P=x[1],B=Object(a.useState)(!0),A=Object(l.a)(B,2),D=A[0],F=A[1];Object(a.useEffect)((function(){f().then((function(e){return u(e)}))}),[]);var J=C?t.filter((function(e){return-1!==e.name.indexOf(C)})):t;return r.a.createElement("div",null,r.a.createElement("h1",null,"PhoneBook"),r.a.createElement(h,{message:y,boIf:D}),r.a.createElement(v,{filter:C,filterInputChange:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(g,{addPerson:function(e){e.preventDefault();var n={name:m,number:O};if(-1===t.findIndex((function(e){return e.name.toString()===m.toString()})))d(n).then((function(e){F(!0),P("".concat(e.name," phone book created")),setTimeout((function(){P(null)}),3e3),console.log(e),u(t.concat(e))}));else if(window.confirm("".concat(m," is already added to phoneBook, replace the old number with a new one?"))){var a=Object(o.a)({},n,{number:O});p(t.filter((function(e){return e.name.toString()===m.toString()}))[0].id,a).then((function(e){F(!0),P("".concat(e.name," phone book edited")),u(t.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){F(!1),P("Information of ".concat(a.name," has already been removed from server")),setTimeout((function(){P(null)}),3e3),console.log(a),u(t.filter((function(e){return e.name!==a.name})))}))}s(""),j("")},newName:m,newNumber:O,nameInputChange:function(e){s(e.target.value)},numberInputChange:function(e){j(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(E,{personsFil:J,personAll:t,setPersons:u}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.604c9a2a.chunk.js.map