(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[7],{116:function(e,t,n){"use strict";n.r(t);var s=n(98),a=n.n(s),r=n(99),c=n(97),o=n(100),i=n(18),u=n(0),j=n(102),b=n(2),p=n(30),x=n(13),l=n(103),O=(n(104),n(1));t.default=function(){var e=Object(b.g)(),t=Object(x.b)(),n=t.profileData,s=t.setProfileData,f=Object(u.useState)({}),h=Object(i.a)(f,2),d=h[0],m=h[1],g=Object(u.useState)({exists:!1,content:""}),v=Object(i.a)(g,2),y=v[0],w=v[1];Object(u.useEffect)((function(){null!=n.name&&e.push("/dashboard")}),[n]);var S=function(e,t){return m((function(n){return Object(o.a)(Object(o.a)({},n),{},Object(c.a)({},e,t))}))},k=function(){var e=Object(r.a)(a.a.mark((function e(t){var n,r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,fetch("http://localhost:8080/api/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(d),cache:"no-cache",referrerPolicy:"no-referrer",mode:"cors"});case 3:if(200!==(n=e.sent).status){e.next=11;break}return e.next=7,n.json();case 7:r=e.sent,s((function(){return r})),e.next=19;break;case 11:if(401!==n.status){e.next=18;break}return e.next=14,n.text();case 14:c=e.sent,w((function(){return{exists:!0,content:c}})),e.next=19;break;case 18:w((function(){return{exists:!0,content:"Internal Server Error"}}));case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(O.jsxs)("div",{className:"login-box",children:[Object(O.jsx)("h2",{children:"Login"}),Object(O.jsxs)("form",{onSubmit:function(e){return k(e)},children:[Object(O.jsx)(j.a,{name:"name",type:"text",placeholder:"Username",onChange:S,className:"user-box"}),Object(O.jsx)(j.a,{name:"password",type:"password",placeholder:"Password",onChange:S,className:"user-box"}),Object(O.jsxs)("button",{type:"submit",value:"Submit",className:"log-in",children:[Object(O.jsx)("span",{}),Object(O.jsx)("span",{}),Object(O.jsx)("span",{}),Object(O.jsx)("span",{}),"Log In"]})]}),Object(O.jsx)(l.a,{showError:y.exists,errorContent:y.content}),Object(O.jsxs)(p.b,{to:"/signup",className:"sign-up",children:[Object(O.jsx)("span",{}),Object(O.jsx)("span",{}),Object(O.jsx)("span",{}),Object(O.jsx)("span",{}),"Sign Up!"]})]})}}}]);
//# sourceMappingURL=7.5a13d012.chunk.js.map