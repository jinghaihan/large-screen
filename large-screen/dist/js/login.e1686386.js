(window["webpackJsonp_large-screen"]=window["webpackJsonp_large-screen"]||[]).push([["login"],{"98c3":function(t,a,e){"use strict";e("faad")},dc3f:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"container"},[r("div",{staticClass:"login"},[r("div",{staticClass:"title"},[r("img",{staticClass:"logo",attrs:{src:e("cf05")}}),r("h1",{staticClass:"name"},[t._v(t._s(t.name))])]),r("div",{staticClass:"form"},[r("a-form",{attrs:{form:t.form,autocomplete:"off"}},[r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!0,message:"请输入用户名"}]}],expression:"[\n              'username',\n              { rules: [{ required: true, message: '请输入用户名' }] },\n            ]"}],attrs:{size:"large",placeholder:"用户名"}},[r("a-icon",{staticClass:"form-prefix",attrs:{slot:"prefix",type:"contacts",theme:"filled"},slot:"prefix"})],1)],1),r("a-form-item",[r("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"请输入密码"}]}],expression:"[\n              'password',\n              { rules: [{ required: true, message: '请输入密码' }] },\n            ]"}],attrs:{size:"large",placeholder:"密码"}},[r("a-icon",{staticClass:"form-prefix",attrs:{slot:"prefix",type:"lock",theme:"filled"},slot:"prefix"})],1)],1),r("a-form-item",[r("a-row",[r("a-col",{attrs:{span:15}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["captcha",{rules:[{required:!0,message:"请输入验证码"}]}],expression:"[\n                  'captcha',\n                  { rules: [{ required: true, message: '请输入验证码' }] },\n                ]"}],attrs:{size:"large",type:"captcha",placeholder:"验证码"},on:{pressEnter:t.handleSubmit}},[r("a-icon",{staticClass:"form-prefix",attrs:{slot:"prefix",type:"safety-certificate",theme:"filled"},slot:"prefix"})],1)],1),r("a-col",{attrs:{span:8,offset:1}},[r("div",{staticClass:"captcha",on:{click:function(a){return t.renderCaptcha()}}},[r("canvas",{attrs:{id:"captcha-canvas"}})])])],1)],1)],1),r("a-button",{staticClass:"login-button",attrs:{type:"primary",size:"large"},on:{click:t.handleSubmit}},[t._v("登录")])],1)])])},s=[],o=e("1157"),n=e.n(o),i=e("2b0e"),l={data:function(){return{name:window.custom.systemName.toUpperCase(),form:this.$form.createForm(this)}},mounted:function(){this.renderCaptcha()},methods:{handleSubmit:function(){var t=this;t.form.validateFields((function(a,e){a||t.$store.dispatch("user/Navigation").then((function(){i["default"].ss.set("loggedIn",!0),t.$router.push("/")}))}))},renderCaptcha:function(){var t=document.getElementById("captcha-canvas"),a=[],e=n()(t).width(),r=n()(t).height(),s=t.getContext("2d");t.width=e,t.height=r;for(var o=["A","B","C","E","F","G","H","J","K","M","N","P","Q","R","S","T","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0"],i=o.length,l=0;l<4;l++){var c=Math.floor(Math.random()*i),d=30*Math.random()*Math.PI/180,m=o[c];a[l]=m.toLowerCase();var f=10+20*l,u=20+8*Math.random();s.font="bold 30px arial",s.translate(f,u),s.rotate(d),s.fillStyle=function(){var t=Math.floor(256*Math.random()),a=Math.floor(256*Math.random()),e=Math.floor(256*Math.random());return"rgb("+t+","+a+","+e+")"}(),s.fillText(m,0,0),s.rotate(-d),s.translate(-f,-u)}for(var h=0;h<5;h++)s.strokeStyle=function(){var t=Math.floor(256*Math.random()),a=Math.floor(256*Math.random()),e=Math.floor(256*Math.random());return"rgb("+t+","+a+","+e+")"}(),s.beginPath(),s.moveTo(Math.random()*e,Math.random()*r),s.lineTo(Math.random()*e,Math.random()*r),s.stroke()}}},c=l,d=(e("98c3"),e("2877")),m=Object(d["a"])(c,r,s,!1,null,"5d59fe0d",null);a["default"]=m.exports},faad:function(t,a,e){}}]);
//# sourceMappingURL=login.e1686386.js.map