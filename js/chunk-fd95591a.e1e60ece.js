(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fd95591a"],{5142:function(t,s,a){},6135:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"main"},[a("div",{staticClass:"column-left column"},[a("AdminNavbar")],1),a("div",{staticClass:"column-main column"},[a("div",{staticClass:"card main-content"},[a("ul",{staticClass:"list-group list-group-flush"},[a("PageHead"),a("li",{staticClass:"list-group-item user-card-group"},[t.isLoading?a("p",{staticClass:"loading"},[t._v("努力加載中...")]):t._l(t.users,(function(t){return a("AdminUserCard",{key:t.id,attrs:{user:t}})}))],2)],1)])])])},r=[],i=a("1da1"),c=(a("96cf"),a("7d03")),n=a("cb06"),o=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card"},[a("img",{staticClass:"card-img-top",attrs:{src:t._f("emptyImage")(t.user.cover),alt:"user cover"}}),a("div",{staticClass:"card-body"},[a("div",{staticClass:"card-body-avatar"},[a("img",{staticClass:"avatar",attrs:{src:t._f("emptyImage")(t.user.avatar),alt:"user avatar"}})]),a("div",{staticClass:"card-body-top"},[a("p",{staticClass:"card-title"},[t._v(t._s(t.user.name))]),a("p",{staticClass:"text-muted text-sm"},[t._v(t._s(t.user.account))])]),a("div",{staticClass:"card-body-mid"},[a("div",{staticClass:"tweets"},[a("font-awesome-icon",{staticClass:"icon text-muted",attrs:{icon:"comment"}}),a("span",[t._v(" "+t._s(t.user.tweetsNumber))])],1),a("div",{staticClass:"likes"},[a("font-awesome-icon",{staticClass:"icon text-muted",attrs:{icon:"heart"}}),a("span",[t._v(" "+t._s(t.user.gotLikesNumber))])],1)]),a("div",{staticClass:"card-body-bot"},[a("span",[t._v(t._s(t.user.followingsNumber)+"位"),a("span",{staticClass:"text-muted"},[t._v("追蹤中 ")])]),a("span",[t._v(t._s(t.user.followersNumber)+"位"),a("span",{staticClass:"text-muted"},[t._v("跟隨者")])])])])])},u=[],l=a("2708"),d={props:{user:{type:Object,required:!0}},mixins:[l["a"]]},m=d,v=(a("d2f1"),a("2877")),f=Object(v["a"])(m,o,u,!1,null,"5c7a91d3",null),p=f.exports,C=a("be6c"),b=a("2fa3"),g={components:{AdminNavbar:c["a"],PageHead:n["a"],AdminUserCard:p},data:function(){return{users:[],isLoading:!0}},methods:{fetchUsers:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,C["a"].getLightUsers();case 3:if(a=s.sent,"OK"===a.statusText){s.next=6;break}throw new Error(a.statusText);case 6:t.isLoading=!1,t.users=a.data,s.next=14;break;case 10:s.prev=10,s.t0=s["catch"](0),b["a"].fire({icon:"error",title:"無法取得所有使用者，請稍後再試"}),console.log(s.t0);case 14:case"end":return s.stop()}}),s,null,[[0,10]])})))()}},created:function(){this.fetchUsers()}},_=g,w=(a("ae18"),Object(v["a"])(_,e,r,!1,null,"225f8b70",null));s["default"]=w.exports},ae18:function(t,s,a){"use strict";a("5142")},d2f1:function(t,s,a){"use strict";a("faa2")},faa2:function(t,s,a){}}]);
//# sourceMappingURL=chunk-fd95591a.e1e60ece.js.map