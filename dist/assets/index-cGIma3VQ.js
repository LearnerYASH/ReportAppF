import{r,d as w,e as B,f as D,j as e,c as R,R as y,C as x,B as E}from"./index-vf9rJf0z.js";import{C as S}from"./Col-dhufSHD2.js";const j=r.forwardRef(({bsPrefix:d,className:f,as:u="div",...c},p)=>{const l=w(d,"row"),h=B(),o=D(),i=`${l}-cols`,n=[];return h.forEach(s=>{const a=c[s];delete c[s];let t;a!=null&&typeof a=="object"?{cols:t}=a:t=a;const m=s!==o?`-${s}`:"";t!=null&&n.push(`${i}${m}-${t}`)}),e.jsx(u,{ref:p,...c,className:R(f,l,...n)})});j.displayName="Row";const C=()=>{const[d,f]=r.useState({PointofSale:[2,2,3],Inventory:[2,2,3],Accounts:[2,3,3],Production:[0,0,0]}),[u,c]=r.useState(!1),[p,l]=r.useState(null);r.useEffect(()=>{(async()=>{const i=await fetch("/api/pointOfSale").then(t=>t.json()),n=await fetch("/api/inventory").then(t=>t.json()),s=await fetch("/api/accounts").then(t=>t.json()),a=await fetch("/api/production").then(t=>t.json());f({PointofSale:i,Inventory:n,Accounts:s,Production:a})})()},[]);const h=o=>{l(o),c(!0)};return e.jsx(y.Fragment,{children:Object.entries(d).map(([o,i],n)=>e.jsxs(j,{className:"mb-4",children:[e.jsx("h5",{children:o.replace(/([A-Z])/g," $1").trim()}),i.map((s,a)=>e.jsx(S,{xl:4,children:e.jsx(x,{children:e.jsxs(x.Body,{children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h6",{className:"mb-4",children:s.title}),e.jsx(E,{variant:"link",onClick:()=>h(o),children:"Edit"})]}),e.jsx("h3",{children:s.amount}),e.jsx("p",{children:"Additional card data..."})]})})},a))]},n))})};export{C as default};