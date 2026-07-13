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
          <h1 className="serif">Your Record</h1>
          <p className="account-email">{session.user.email}</p>
        </header>

        <div className="account-grid">
          <section className="account-card">
            <h3>Waitlist Status</h3>
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
            <h3>Reservation</h3>
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
                  <p>You haven't secured a pair yet.</p>
                </div>
                <Link href="/shop" className="va-btn secondary small">Go to Shop</Link>
              </div>
            )}
          </section>

          <section className="account-card">
            <h3>Personal Details</h3>
            <EditProfileForm initialName={dbUser.name || ""} email={dbUser.email || ""} />
            
            <h3>Shipping Default</h3>
            <EditAddressForm initialAddress={dbUser.address || ""} />
          </section>
        </div>

        <div className="account-actions">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
