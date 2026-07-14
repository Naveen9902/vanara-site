const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_TDMpLDkdEl2Fga',
  key_secret: 'NccFv119ql4CPEDMcdz4h37H'
});

async function run() {
  try {
    const paymentLink = await razorpay.paymentLink.create({
      amount: 1000,
      currency: 'USD',
      accept_partial: false,
      description: `VANARA Baiji Edition - Advance`,
      customer: {
        name: "Test User",
        email: "test@example.com",
      },
      notify: {
        email: true,
        sms: false
      },
      reminder_enable: false,
      callback_url: `http://localhost:3000/success`,
      callback_method: 'get'
    });
    console.log(paymentLink);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

run();
