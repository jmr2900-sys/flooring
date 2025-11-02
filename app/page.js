
"use client";
import { useMemo, useState } from "react";
const productsSeed = [
  { id: "TC851", brand: "Resolve", name: "Country Oak", collection: "Resolve 7.0 Rigid Core", wear: "20mil", thick: "7.0mm", url: "https://resolvefloor.com/products/tc851-country-oak/" },
  { id: "TC290", brand: "Resolve", name: "Volt", collection: "Resolve 6.0 Rigid Core", wear: "12mil", thick: "6.0mm", url: "https://resolvefloor.com/products/tc290-volt/" }
];
export default function Page() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [first, setFirst] = useState(""); const [last, setLast] = useState("");
  const [phone, setPhone] = useState(""); const [email, setEmail] = useState("");
  const [productField, setProductField] = useState(""); const [details, setDetails] = useState("");
  const business = {
    phone: "517-247-7749", sms: "+15172477749", email: "totalhomeliquidation@yahoo.com",
    address: "111 W Edgewood Blvd Unit 4, Lansing, MI 48911",
    map: "https://www.google.com/maps?q=111+W+Edgewood+Blvd+Unit+4,+Lansing,+MI+48911&output=embed"
  };
  const products = useMemo(()=>productsSeed,[]);
  const filtered = useMemo(()=>{
    const q = search.toLowerCase();
    return products.filter(p=>[p.id,p.brand,p.name,p.collection].join(" ").toLowerCase().includes(q));
  },[products,search]);
  const sendEmail = () => {
    const subj = encodeURIComponent(`Quote request – ${first} ${last}`.trim());
    const name = (selected && selected.name) || productField || "(no product specified)";
    const body = encodeURIComponent(`Name: ${first} ${last}\nPhone: ${phone}\nEmail: ${email}\nProduct: ${name}${selected && selected.url ? " ("+selected.url+")":""}\nDetails: ${details}`);
    window.location.href = `mailto:${business.email}?subject=${subj}&body=${body}`;
  };
  return (
    <div>
      <header className="sticky">
        <div className="container nav">
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:32,height:32,background:"#2563eb",borderRadius:12}}/>
            <strong>Flooring Floor Store</strong>
          </div>
          <nav style={{display:"flex",gap:12,alignItems:"center"}}>
            <a href="#products">Products</a>
            <a href="#visualizer">See in My Space</a>
            <a href="#quote">Get a Quote</a>
            <a href="#contact">Contact</a>
          </nav>
          <div style={{display:"flex",gap:8}}>
            <a className="btn btn-outline" href={`tel:${business.phone}`}>Call</a>
            <a className="btn btn-primary" href={`sms:${business.sms}?&body=${encodeURIComponent("Hi! I need a flooring quote.")}`}>Text for Quote</a>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="b1"/><div className="b2"/>
        <div className="container" style={{padding:"56px 0"}}>
          <span className="badge">Lansing • Sales & Installation</span>
          <h1>Premium flooring at outlet pricing</h1>
          <p className="muted" style={{maxWidth:640,marginTop:12}}>Luxury vinyl, laminate, hardwood, carpet & tile. See products in your room with our visualizer and get fast quotes.</p>
          <div style={{display:"flex",gap:8,marginTop:12}}>
            <a className="btn btn-primary" href="#products">Shop Products</a>
            <a className="btn btn-outline" href="https://get.roomvo.com/" target="_blank">See in My Space</a>
          </div>
        </div>
      </section>
      <section id="products" className="section">
        <div className="container">
          <h2 className="title">Featured products</h2>
          <p className="subtitle">Click any item to request a quote or open the distributor page.</p>
          <div style={{marginTop:12}}><input placeholder="Search by color, collection, brand, or SKU" value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <div className="grid grid-4" style={{marginTop:16}}>
            {filtered.map(p=>(
              <div className="card" key={p.id}>
                <div className="pad">
                  <div className="img">Image placeholder</div>
                  <div style={{marginTop:8,fontWeight:700}}>{p.name}</div>
                  <div className="muted" style={{fontSize:12}}>{p.brand} • {p.collection} • {p.wear} • {p.thick}</div>
                  <div style={{display:"flex",gap:8,marginTop:8}}>
                    <button className="btn btn-primary" onClick={()=>setSelected({name:`${p.brand} ${p.name}`,url:p.url})}>Get a Quote</button>
                    <a className="btn btn-outline" href={p.url} target="_blank">View</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="quote" className="section">
        <div className="container" style={{display:"grid",gap:16,gridTemplateColumns:"1fr",maxWidth:1120}}>
          <div className="card"><div className="pad">
            {selected && <div className="muted" style={{fontSize:14,marginBottom:8}}>You’re requesting a quote for <strong>{selected.name}</strong> {selected.url && (<a href={selected.url} target="_blank">(view)</a>)}</div>}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <input placeholder="First name" value={first} onChange={e=>setFirst(e.target.value)}/>
              <input placeholder="Last name" value={last} onChange={e=>setLast(e.target.value)}/>
            </div>
            <input placeholder="Phone (call/text)" value={phone} onChange={e=>setPhone(e.target.value)} style={{marginTop:8}}/>
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{marginTop:8}}/>
            <input placeholder="Product (paste URL or name)" value={productField || (selected?selected.name:"")} onChange={e=>setProductField(e.target.value)} style={{marginTop:8}}/>
            <textarea placeholder="Square footage, timeline, install needed?" value={details} onChange={e=>setDetails(e.target.value)} style={{marginTop:8}}/>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button className="btn btn-primary" onClick={sendEmail}>Email Quote</button>
              <a className="btn btn-outline" href={`tel:${business.phone}`}>Call Now</a>
              <a className="btn btn-outline" href={`sms:${business.sms}?&body=${encodeURIComponent("Hi! I need a flooring quote.")}`}>Text Quote</a>
            </div>
          </div></div>
          <div className="card" id="contact"><div className="pad">
            <h3 className="title" style={{fontSize:20}}>Business Information</h3>
            <p className="muted">Open to the public • No appointments required</p>
            <p style={{marginTop:8}}>{business.address}</p>
            <p><a href={`tel:${business.phone}`}>{business.phone}</a> (Call / Text)</p>
            <p><a href={`mailto:${business.email}`}>{business.email}</a></p>
            <div style={{marginTop:12,border:"1px solid var(--border)",borderRadius:12,overflow:"hidden"}}>
              <iframe title="Map" src={business.map} style={{width:"100%",height:224,border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div></div>
        </div>
      </section>
      <footer>
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <small className="muted">© {new Date().getFullYear()} Flooring Floor Store. All rights reserved.</small>
          <div style={{display:"flex",gap:12}}>
            <a href="#visualizer">Visualizer</a>
            <a href="#quote">Quotes</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
