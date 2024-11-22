import{r as o,u,j as e,R as b,C as y,N as c,B as E}from"./index-vf9rJf0z.js";import{a as j}from"./api-9D3PyfUE.js";import{l as N}from"./inextlogo-Co1qBXU0.js";import{F as t}from"./Form-CQ6Zswsb.js";import"./Col-dhufSHD2.js";const k=()=>{const[r,m]=o.useState(""),[l,g]=o.useState(""),[i,n]=o.useState(""),h=u(),p=async(s,d)=>{try{console.log(s,d);const a=await j.post("/auth/login",{emailid:s,userpwd:d});a.data.success?(localStorage.setItem("token",a.data.token),localStorage.setItem("tokenExpiration",a.data.tokenExpiration),localStorage.setItem("customerId",a.data.customerId),localStorage.setItem("UserName",a.data.UserName),localStorage.setItem("serverIp",a.data.serverIp),localStorage.setItem("sqlPort",a.data.sqlPort),localStorage.setItem("sqlUserId",a.data.sqlUserId),localStorage.setItem("sqlPwd",a.data.sqlPwd),localStorage.setItem("clientDbName",a.data.clientDbName),console.log("Token:",a.data.token),console.log("tokenExpiration:",a.data.tokenExpiration),console.log("CustomerId:",a.data.customerId),console.log("UserName:",a.data.UserName),console.log("Server IP:",a.data.serverIp),console.log("SQL Port:",a.data.sqlPort),console.log("SQL User ID:",a.data.sqlUserId),console.log("SQL Password:",a.data.sqlPwd),console.log("Client Database Name:",a.data.clientDbName),h("/verify")):n("Login failed. Please check your credentials.")}catch(a){console.error("Login error:",a),n("An error occurred during login. Please try again.")}},x=s=>{s.preventDefault(),p(r,l)};return e.jsx(b.Fragment,{children:e.jsxs("section",{className:"background-radial-gradient overflow-auto min-vh-100",children:[e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:"container px-4 py-5 px-md-5 text-center text-lg-start my-5",children:e.jsxs("div",{className:"row gx-lg-5 align-items-center mb-5",children:[e.jsxs("div",{className:"col-lg-6 mb-5 mb-lg-0",style:{zIndex:10},children:[e.jsxs("h1",{className:"my-5 display-5 fw-bold ls-tight",style:{color:"hsl(218, 81%, 95%)"},children:["Welcome to ",e.jsx("br",{}),e.jsx("span",{style:{color:"hsl(218, 81%, 75%)"},children:"iNextErp solutions"})]}),e.jsx("p",{className:"mb-4 opacity-70",style:{color:"hsl(218, 81%, 95%)"},children:'"Empowering Businesses through Innovative and Integrated ERP, CRM, and POS Solutions that Drive Efficiency, Enhance Customer Engagement, and Foster Sustainable Growth in a Dynamic Market."'})]}),e.jsxs("div",{className:"col-lg-6 mb-5 mb-lg-0 position-relative",children:[e.jsx("div",{id:"radius-shape-1",className:"position-absolute rounded-circle shadow-5-strong"}),e.jsx("div",{id:"radius-shape-2",className:"position-absolute shadow-5-strong"}),e.jsx("div",{className:"card bg-glass",children:e.jsxs(y.Body,{children:[e.jsxs("div",{className:"text-center mb-4",children:[e.jsx("img",{src:N,alt:"Company Logo",style:{width:"80px"}}),e.jsx("h3",{className:"mt-3",style:{fontWeight:"bold",fontFamily:"Titillium Web, sans-serif",color:"#6495ed"},children:"iNextErp"})]}),e.jsx("h3",{className:"text-left mb-4",style:{fontFamily:"Titillium Web, sans-serif"},children:"Login"}),e.jsxs(t,{onSubmit:x,children:[e.jsx(t.Group,{controlId:"formemail",className:"mb-4",children:e.jsx(t.Control,{type:"email",placeholder:"Enter Email",size:"lg",value:r,onChange:s=>m(s.target.value),required:!0})}),e.jsx(t.Group,{controlId:"formPassword",className:"mb-4",children:e.jsx(t.Control,{type:"password",placeholder:"Enter Password",size:"lg",value:l,onChange:s=>g(s.target.value),required:!0})}),i&&e.jsx("div",{className:"text-danger mb-3",children:i}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsx(t.Group,{className:"mb-0",children:e.jsx(t.Check,{type:"checkbox",label:"Remember me",id:"formRemember"})}),e.jsx(c,{to:"#",className:"text-body",children:"Forgot password?"})]}),e.jsxs("div",{className:"text-center text-lg-start mt-4 pt-2",children:[e.jsx(E,{type:"submit",variant:"primary",size:"lg",className:"px-5",style:{fontFamily:"Titillium Web, sans-serif",backgroundColor:"#6495ed",borderColor:"#6495ed"},children:"Login"}),e.jsxs("p",{className:"small fw-bold mt-2 pt-1 mb-0",children:["Don’t have an account?"," ",e.jsx(c,{to:"/auth/signup-1",className:"link-danger",children:"Register"})]})]})]})]})})]})]})})]})})};export{k as default};
