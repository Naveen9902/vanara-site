import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import EditProfileForm from "./EditProfileForm";
import EditAddressForm from "./EditAddressForm";

export default async function AccountPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }

  // Fetch the latest user from DB to bypass stale JWT cached fields
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!dbUser) {
    redirect("/api/auth/signin");
  }

  // Fetch waitlist status by email
  const waitlist = await prisma.waitlist.findUnique({
    where: { email: session.user.email }
  });

  // Fetch reservations linked to user id
  const reservation = await prisma.reservation.findFirst({
    where: { userId: (session.user as any).id },
    include: { items: true }
  });

  return (
    <main className="va-view active account-view">
      <div className="account-container">
        <header className="account-header">
          <div className="account-header-left">
            <h1 className="serif">Your Record</h1>
            <p className="account-email">{session.user.email}</p>
          </div>
          <SignOutButton />
        </header>

        <div className="account-grid">
          <section className="account-card">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Waitlist Status
            </h3>
            {waitlist ? (
              <div className="status-box active">
                <span className="status-dot"></span>
                <div>
                  <strong>Joined</strong>
                  <p>{waitlist.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
            ) : (
              <div className="status-box inactive">
                <div>
                  <strong>Not on Waitlist</strong>
                  <p>You haven't joined the main record.</p>
                </div>
                <Link href="/waitlist" className="va-btn secondary small">Join Now</Link>
              </div>
            )}
          </section>

          <section className="account-card">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Reservation
            </h3>
            {reservation ? (
              <div className="reservation-details">
                <div className="res-header">
                  <strong>Order #{reservation.id.slice(-6).toUpperCase()}</strong>
                  <span>{reservation.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="res-items">
                  {reservation.items.map((item) => (
                    <div key={item.id} className="res-item">
                      <div>
                        <span>Baiji Edition</span>
                        <span className="meta">Size {item.size} · No. {item.editionNumber.padStart(3, '0')}</span>
                      </div>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="res-total">
                  <span>Total</span>
                  <span>${reservation.total}</span>
                </div>
                <p className="res-note">Your reservation is confirmed. We will email you when shipping begins.</p>
              </div>
            ) : (
              <div className="status-box inactive">
                <div>
                  <strong>No Reservations</strong>
                  <p>You haven't secured a piece yet.</p>
                </div>
                <Link href="/shop" className="va-btn secondary small">Go to Shop</Link>
              </div>
            )}
          </section>

          <section className="account-card">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Personal Details
            </h3>
            <EditProfileForm initialName={dbUser.name || ""} email={dbUser.email || ""} />
            
            <h3 style={{ marginTop: '16px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"></circle><path d="M12 217c0-5 8-11.5 8-11.5S20 10 20 7a8 8 0 0 0-16 0c0 3 8 11.5 8 11.5z"></path></svg>
              Shipping Default
            </h3>
            <EditAddressForm initialAddress={dbUser.address || ""} />
          </section>
        </div>
      </div>
    </main>
  );
}
