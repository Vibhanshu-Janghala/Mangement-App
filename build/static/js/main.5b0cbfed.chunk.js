(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[1],{10:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return u}));var c=n(9),r=n(0),i=n.n(r),a=n(1),l=i.a.createContext(null);function s(){return Object(r.useContext)(l)}function u(e){var t=e.children,n=Object(r.useState)({}),i=Object(c.a)(n,2),s=i[0],u=i[1];return Object(a.jsx)(l.Provider,{value:{profileData:s,setProfileData:u},children:t})}},11:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return u}));var c=n(9),r=n(0),i=n.n(r),a=n(1),l=i.a.createContext(null);function s(){return Object(r.useContext)(l)}function u(e){var t=e.children,n=Object(r.useState)(null!=window.localStorage.getItem("themeNumber")?window.localStorage.getItem("themeNumber"):"first"),i=Object(c.a)(n,2),s=i[0],u=i[1];return Object(a.jsx)(l.Provider,{value:{themeData:s,setThemeData:u},children:t})}},19:function(e,t,n){"use strict";n(31);var c=n(1);t.a=function(){return Object(c.jsxs)("div",{className:"loading-page",children:[Object(c.jsx)("span",{children:"Loading ..."}),Object(c.jsxs)("svg",{height:"400",width:"400",id:"preloader",children:[Object(c.jsxs)("g",{filter:"url(#goo)",children:[Object(c.jsx)("circle",{className:"outer",cx:"200",cy:"200",r:"150"}),Object(c.jsx)("circle",{className:"drop",cx:"200",cy:"200",r:"20"})]}),Object(c.jsx)("defs",{children:Object(c.jsxs)("filter",{id:"goo",children:[Object(c.jsx)("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"8",result:"blur"}),Object(c.jsx)("feColorMatrix",{in:"blur",mode:"matrix",values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",result:"goo"})]})})]})]})}},28:function(e,t,n){},29:function(e,t,n){},31:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(21),i=n.n(r),a=(n(28),n(29),n(17)),l=n(2),s=n(10),u=n(11),j=n(19),o=n(1),b=Object(c.lazy)((function(){return Promise.all([n.e(3),n.e(5)]).then(n.bind(null,118))})),d=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,114))})),h=Object(c.lazy)((function(){return n.e(6).then(n.bind(null,115))})),O=Object(c.lazy)((function(){return n.e(7).then(n.bind(null,119))})),x=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,116))}));var f=function(){var e=Object(s.b)().profileData,t=Object(u.b)().themeData;return Object(o.jsx)("div",{className:"route-container ".concat("theme-"+t),children:Object(o.jsx)(a.a,{children:Object(o.jsx)(c.Suspense,{fallback:Object(o.jsx)(j.a,{}),children:Object(o.jsxs)(l.d,{children:[Object(o.jsx)(l.b,{exact:!0,path:"/",children:Object(o.jsx)(h,{})}),Object(o.jsx)(l.b,{exact:!0,path:"/login",children:Object(o.jsx)(x,{})}),Object(o.jsx)(l.b,{exact:!0,path:"/signup",children:Object(o.jsx)(d,{})}),Object(o.jsx)(l.b,{path:"/dashboard",children:null!=e.name?Object(o.jsx)(b,{}):Object(o.jsx)(l.a,{push:!0,to:"/"})}),Object(o.jsx)(l.b,{path:"*",children:Object(o.jsx)(O,{})})]})})})})},m=function(e){e&&e instanceof Function&&n.e(10).then(n.bind(null,117)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))};i.a.render(Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(u.a,{children:Object(o.jsx)(s.a,{children:Object(o.jsx)(f,{})})})}),document.getElementById("root")),m()}},[[36,2,4]]]);
//# sourceMappingURL=main.5b0cbfed.chunk.js.map