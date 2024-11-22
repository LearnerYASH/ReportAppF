import{a as b,r as n,m as j,j as e,L as m,g as h,h as y,R as p,u as N,C as E}from"./index-vf9rJf0z.js";import{l as C}from"./inextlogo-Co1qBXU0.js";import{a as v}from"./api-9D3PyfUE.js";const A=()=>{const s=b(),[l,o]=n.useState([]),[a,c]=n.useState([]);n.useEffect(()=>{j.items.map((t,f)=>(t.type&&t.type==="group"&&i(t),!1))});const i=(t,f)=>{t.children&&t.children.filter(r=>(r.type&&r.type==="collapse"?i(r):r.type&&r.type==="item"&&s.pathname===r.url&&(o(t),c(r)),!1))};let x,u,g="",d="";return l&&l.type==="collapse"&&(x=e.jsx(m.Item,{as:"li",bsPrefix:" ",className:"breadcrumb-item",children:e.jsx(h,{to:"#",children:l.title})})),a&&a.type==="item"&&(d=a.title,u=e.jsx(m.Item,{as:"li",bsPrefix:" ",className:"breadcrumb-item",children:e.jsx(h,{to:"#",children:d})}),a.breadcrumbs!==!1&&(g=e.jsx("div",{className:"page-header",children:e.jsx("div",{className:"page-block",children:e.jsx("div",{className:"row align-items-center",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("div",{className:"page-header-title",children:e.jsx("h5",{className:"m-b-10",children:d})}),e.jsxs(m,{as:"ul",bsPrefix:" ",className:"breadcrumb",children:[e.jsx(m.Item,{as:"li",bsPrefix:" ",className:"breadcrumb-item",children:e.jsx(h,{to:"/",children:e.jsx("i",{className:"feather icon-home"})})}),x,u]})]})})})})),document.title=d+y),e.jsx(p.Fragment,{children:g})},S=()=>{const[s,l]=n.useState({}),o=N();n.useEffect(()=>{const c=localStorage.getItem("customerId");if(!c){o("/login");return}v.get(`/verify/customers/${c}`).then(i=>l(i.data)).catch(i=>console.error("Error fetching customer details:",i))},[o]);const a=()=>{o("/app/dashboard/default")};return e.jsxs(p.Fragment,{children:[e.jsx(A,{}),e.jsxs("section",{className:"background-radial-gradient overflow-auto min-vh-100",children:[e.jsx("style",{children:`
            .background-radial-gradient {
              background-color: #9ACEEB; /* Change this line to your desired color */
              background-image: radial-gradient(650px circle at 0% 0%,
                #9ACEEB 15%, /* Modify this to match your color */
                #9ACEEB 35%,
                #9ACEEB 75%,
                #9ACEEB 80%,
                transparent 100%),
                radial-gradient(1250px circle at 100% 100%,
                #9ACEEB 15%,
                #9ACEEB 35%,
                #9ACEEB 75%,
                #9ACEEB 80%,
                transparent 100%);
              min-height: 100vh;
            }

            #radius-shape-1 {
              height: 220px;
              width: 220px;
              top: -60px;
              left: -130px;
              background: radial-gradient(#6495ed, #6495ed);
              overflow: hidden;
            }

            #radius-shape-2 {
              border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
              bottom: -60px;
              right: -110px;
              width: 300px;
              height: 300px;
              background: radial-gradient(#6495ed, #6495ed);
              overflow: hidden;
            }

            .bg-glass {
              background-color: hsla(0, 0%, 100%, 0.9) !important;
              backdrop-filter: saturate(200%) blur(25px);
            }

            body, h1, h2, h3, p, button {
              font-family: 'Titillium Web', sans-serif;
            }
          `}),e.jsx("div",{className:"container px-4 py-5 px-md-5 text-center text-lg-start my-5",children:e.jsxs("div",{className:"row gx-lg-5 align-items-center mb-5",children:[e.jsxs("div",{className:"col-lg-6 mb-5 mb-lg-0",style:{zIndex:10},children:[e.jsxs("h1",{className:"my-5 display-5 fw-bold ls-tight",style:{color:"hsl(218, 81%, 95%)"},children:["Welcome to ",e.jsx("br",{}),e.jsx("span",{style:{color:"hsl(218, 81%, 75%)"},children:"iNextErp solutions"})]}),e.jsx("p",{className:"mb-4 opacity-70",style:{color:"hsl(218, 81%, 95%)"},children:'"Empowering Businesses through Innovative and Integrated ERP, CRM, and POS Solutions that Drive Efficiency, Enhance Customer Engagement, and Foster Sustainable Growth in a Dynamic Market."'})]}),e.jsxs("div",{className:"col-lg-6 mb-5 mb-lg-0 position-relative",children:[e.jsx("div",{id:"radius-shape-1",className:"position-absolute rounded-circle shadow-5-strong"}),e.jsx("div",{id:"radius-shape-2",className:"position-absolute shadow-5-strong"}),e.jsx("div",{className:"card bg-glass",children:e.jsxs(E.Body,{children:[e.jsxs("div",{className:"text-center mb-4",children:[e.jsx("img",{src:C,alt:"Company Logo",style:{width:"80px"}}),e.jsx("h3",{className:"mt-3",style:{fontWeight:"bold",color:"#6495ed"},children:"iNextErp"})]}),e.jsx("h3",{className:"card-title mb-4",style:{color:"#6495ed",fontFamily:"Titillium Web, sans-serif",fontSize:"1.8rem"},children:s.CustomerName||"Customer Name"}),e.jsxs("p",{style:{fontSize:"1.2rem",color:"#4f4f4f"},children:[e.jsx("strong",{children:"Business Name:"})," ",s.BusinessName||"N/A"]}),e.jsxs("p",{style:{fontSize:"1.2rem",color:"#4f4f4f"},children:[e.jsx("strong",{children:"Email:"})," ",s.ContactEmail1||"N/A"]}),e.jsxs("p",{style:{fontSize:"1.2rem",color:"#4f4f4f"},children:[e.jsx("strong",{children:"Phone:"})," ",s.ContactPhone1||"N/A"]}),e.jsxs("p",{style:{fontSize:"1.2rem",color:"#4f4f4f"},children:[e.jsx("strong",{children:"Address:"})," ",s.Address||"N/A"]}),e.jsx("button",{onClick:a,className:"btn btn-primary px-5",style:{backgroundColor:"#6495ed",borderColor:"#6495ed"},children:"Proceed to Dashboard"})]})})]})]})})]})]})};export{S as default};
