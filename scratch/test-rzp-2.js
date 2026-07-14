const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_TDMpLDkdEl2Fga',
  key_secret: 'NccFv119ql4CPEDMcdz4h37H'
});

async function run() {
  try {
    const origin = 'http://localhost:3000';
    const cartItems = [{ size: "M", num: "001", price: 199 }];
    const session = {
      user: {
        name: "Test User",
        email: "test@example.com",
        id: "user-123"
      }
    };

    const paymentLink = await razorpay.paymentLink.create({
      amount: 10 * 100, // in cents/paise
      currency: 'USD',
      accept_partial: false,
      description: `VANARA Baiji Edition - Advance`,
      customer: {
        name: session.user.name || "Customer",
        email: session.user.email,
      },
      notify: {
        email: true,
        sms: false
      },
      reminder_enable: false,
      notes: {
        userId: session.user.id,
        cartPayload: JSON.stringify(cartItems)
      },
      callback_url: `${origin}/success`,
      callback_method: 'get'
    });
    console.log("SUCCESS:", paymentLink);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

run();
