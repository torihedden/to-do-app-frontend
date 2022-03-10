(this["webpackJsonpto-do-app"]=this["webpackJsonpto-do-app"]||[]).push([[0],{11:function(e,t,n){},12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),o=n(6),l=n.n(o),a=(n(11),n(2)),s=(n(12),n(3)),d=(n(13),n(0)),r=function(e){var t=e.currentTodo,n=e.setisDeleting,c=e.setCurrentTodo,i=e.handleDelete;return Object(d.jsx)("div",{className:"modal",children:Object(d.jsxs)("div",{className:"modal-content",children:[Object(d.jsxs)("div",{children:['Delete "',t.title,'" task?']}),Object(d.jsxs)("div",{className:"button-wrapper",children:[Object(d.jsx)("button",{onClick:function(){n(!1),c({})},children:"Cancel"}),Object(d.jsx)("button",{className:"negative",onClick:function(){n(!1),i(t._id),c({})},children:"Delete"})]})]})})},j=(n(15),function(){var e=(new Date).getHours();return e<12?"Good morning!":e>12&&e<17?"Good afternoon!":"Good evening!"}),u=function(e){var t=e.listLength;return Object(d.jsx)(d.Fragment,{children:0===t?Object(d.jsx)("div",{className:"summary",children:"Congratulations! You are done with your list."}):Object(d.jsxs)("div",{className:"summary",children:[j()," You have ",t," items left on your list."]})})},b=function(e){var t=e.handleAdd,n=e.newTodoTitle,c=e.setNewTodoTitle;return Object(d.jsxs)("div",{className:"new-task-wrapper",children:[Object(d.jsx)("label",{htmlFor:"new-todo",children:Object(d.jsx)("input",{type:"text",name:"todo",placeholder:"Describe your task",id:"new-todo",value:n,onChange:function(e){return c(e.target.value)}})}),Object(d.jsx)("button",{className:"positive",onClick:function(){""!==n&&(t({title:n.trim()}),c(""))},disabled:""===n,children:"Add new task"})]})},h=function(e){var t=e.todos,n=e.handleEdit,i=e.handleAdd,o=e.handleDelete,l=Object(c.useState)(""),j=Object(a.a)(l,2),h=(j[0],j[1]),p=Object(c.useState)(!1),m=Object(a.a)(p,2),O=m[0],f=m[1],x=Object(c.useState)(!1),v=Object(a.a)(x,2),g=v[0],N=v[1],k=Object(c.useState)({}),C=Object(a.a)(k,2),y=C[0],w=C[1];return Object(d.jsxs)(d.Fragment,{children:[g&&Object(d.jsx)(r,{currentTodo:y,setisDeleting:N,setCurrentTodo:w,handleDelete:o}),Object(d.jsx)(u,{listLength:t.filter((function(e){return!e.completed})).length}),Object(d.jsx)(b,{handleAdd:i,setNewTodoTitle:h}),Object(d.jsx)("div",{className:"uncompleted-todos",children:t.filter((function(e){return!e.completed})).map((function(e){return Object(d.jsxs)("div",{className:"todo-wrapper",children:[Object(d.jsxs)("label",{htmlFor:e.title,className:e.completed?"completed-task":"",children:[Object(d.jsx)("input",{type:"checkbox",checked:e.completed,onChange:function(){n(Object(s.a)(Object(s.a)({},e),{},{completed:!e.completed})),O&&f(!1)},id:e.title,name:e.title,value:e.title}),Object(d.jsx)("span",{className:"checkmark",children:e.completed}),!(O&&y._id===e._id)&&Object(d.jsx)("span",{className:"title",children:e.title})]}),Object(d.jsxs)("div",{className:O&&e._id===y._id?"editing-wrapper editing":"editing-wrapper",children:[O&&e._id===y._id&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("input",{type:"text",onChange:function(t){w(Object(s.a)(Object(s.a)({},e),{},{title:t.target.value}))},id:e._id,name:e.title,value:y!=={}?y.title:e.title,readOnly:e.completed}),Object(d.jsxs)("div",{className:"editing-buttons-wrapper",children:[Object(d.jsx)("button",{className:"positive",onClick:function(){n(Object(s.a)(Object(s.a)({},y),{},{title:y.title.trim()})),f(!1)},children:"Save"}),Object(d.jsx)("button",{onClick:function(){w({}),f(!1)},children:"Cancel"})]})]}),!O&&Object(d.jsx)("button",{disabled:e.completed,onClick:function(){w(e),f(!0)},children:"Edit"})]}),Object(d.jsx)("button",{title:"Delete task",className:"negative",onClick:function(){w(e),N(y)},children:"X"})]},e._id)}))}),t.filter((function(e){return e.completed})).map((function(e){return Object(d.jsxs)("div",{className:"todo-wrapper",children:[Object(d.jsxs)("label",{htmlFor:e.title,className:e.completed?"completed-task":"",children:[Object(d.jsx)("input",{type:"checkbox",checked:e.completed,onChange:function(){n(Object(s.a)(Object(s.a)({},e),{},{completed:!e.completed})),O&&f(!1)},id:e.title,name:e.title,value:e.title}),Object(d.jsx)("span",{className:"checkmark",children:e.completed}),!(O&&y._id===e._id)&&Object(d.jsx)("span",{className:"title",children:e.title})]}),Object(d.jsx)("div",{className:"editing-wrapper",children:Object(d.jsx)("button",{title:"Delete task",className:"negative",onClick:function(){w(e),N(y)},children:"X"})})]},e._id)}))]})};n(16).config();var p="http://localhost:5000/";var m=function(){Object(c.useEffect)((function(){fetch(p).then((function(e){return e.json()})).then((function(e){r(!0),m(e)})).catch((function(e){console.log("Error: ",e),i("There was a problem retrieving your to-do list.")}))}),[]);var e=Object(c.useState)(null),t=Object(a.a)(e,2),n=t[0],i=t[1],o=Object(c.useState)(!1),l=Object(a.a)(o,2),s=l[0],r=l[1],j=Object(c.useState)([]),u=Object(a.a)(j,2),b=u[0],m=u[1];return Object(d.jsxs)("div",{className:"app",children:[!s&&!n&&Object(d.jsx)("div",{children:"Loading..."}),s&&!n&&b!==[]&&Object(d.jsx)(h,{todos:b,handleEdit:function(e){fetch(p,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){return m(e)}))},handleAdd:function(e){fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e.userId,title:e.title,completed:e.completed})}).then((function(e){return e.json()})).then((function(e){return m(e)}))},handleDelete:function(e){fetch(p,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e})}).then((function(e){return e.json()})).then((function(e){return m(e)}))}}),n&&n]})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,o=t.getLCP,l=t.getTTFB;n(e),c(e),i(e),o(e),l(e)}))};l.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(m,{})}),document.getElementById("root")),O()}},[[19,1,2]]]);
//# sourceMappingURL=main.7ed9361c.chunk.js.map