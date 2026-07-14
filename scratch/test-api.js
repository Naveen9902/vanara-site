fetch('http://localhost:3000/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ cartItems: [{ size: "M", num: "001", price: 199 }] })
}).then(res => res.json()).then(console.log).catch(console.error);
