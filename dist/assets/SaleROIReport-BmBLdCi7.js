import{a as n,j as s,C as t,b as l}from"./index-vf9rJf0z.js";import{C as c}from"./Col-dhufSHD2.js";const m=()=>{const e=n(),{reportData:a}=e.state||{};return!a||a.length===0?s.jsx("div",{children:"No data available for this report."}):s.jsx("div",{className:"container",children:s.jsx("div",{className:"row g-3",children:a.map((o,r)=>s.jsx(c,{sm:"12",md:"6",lg:"4",children:s.jsx(t,{className:"h-100 shadow-sm",children:s.jsxs(l,{children:[s.jsxs("div",{className:"mt-3",style:{fontSize:"1.2rem"},children:[s.jsx("strong",{children:"Sale:"})," ₹",o["(No column name)"]&&!isNaN(o["(No column name)"])?o["(No column name)"].toFixed(2):"0.00"]}),s.jsxs("div",{className:"mt-2",style:{fontSize:"1.2rem"},children:[s.jsx("strong",{children:"Cost:"})," ₹",o["(No column name)1"]&&!isNaN(o["(No column name)"])?o["(No column name)1"].toFixed(2):"0.00"]}),s.jsxs("div",{className:"mt-2 text-success",style:{fontSize:"1.2rem"},children:[s.jsx("strong",{children:"Profit:"})," ₹",o.Profit&&!isNaN(o.Profit)?o.Profit.toFixed(2):"0.00"]})]})})},r))})})};export{m as default};
