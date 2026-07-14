import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  // SECURE ROUTE: Only allow the specific ADMIN_EMAIL to view this page.
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!session || !session.user || !session.user.email) {
    redirect("/api/auth/signin");
  }
  
  if (!adminEmail || session.user.email.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect("/");
  }

  // Fetch all necessary data
  const totalUsers = await prisma.user.count();
  const totalWaitlist = await prisma.waitlist.count();
  const reservations = await prisma.reservation.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  });
  
  const totalRevenue = reservations.reduce((sum, res) => sum + res.total, 0);

  const recentUsers = await prisma.user.findMany({
    orderBy: { id: 'desc' },
    take: 10
  });

  const recentWaitlist = await prisma.waitlist.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  return (
    <main className="va-view active admin-view">
      <div className="admin-container">
        <header className="admin-header">
          <h1 className="serif">Command Center</h1>
          <p className="admin-subtitle">Authorized Access Only: {adminEmail}</p>
        </header>

        {/* STATS ROW */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <h4>Total Revenue</h4>
            <p className="stat-value">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="admin-stat-card">
            <h4>Reservations</h4>
            <p className="stat-value">{reservations.length}</p>
          </div>
          <div className="admin-stat-card">
            <h4>Registered Users</h4>
            <p className="stat-value">{totalUsers}</p>
          </div>
          <div className="admin-stat-card">
            <h4>Waitlist Size</h4>
            <p className="stat-value">{totalWaitlist}</p>
          </div>
        </div>

        {/* TABLES GRID */}
        <div className="admin-tables-grid">
          {/* RECENT USERS */}
          <section className="admin-card">
            <h3>Newest Users</h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.id ? 'Active' : 'Unknown'}</td>
                    </tr>
                  ))}
                  {recentUsers.length === 0 && (
                    <tr><td colSpan={2} style={{textAlign:'center'}}>No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* RECENT WAITLIST */}
          <section className="admin-card">
            <h3>Waitlist Signups</h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentWaitlist.map(entry => (
                    <tr key={entry.id}>
                      <td>{entry.email}</td>
                      <td>{entry.createdAt.toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {recentWaitlist.length === 0 && (
                    <tr><td colSpan={2} style={{textAlign:'center'}}>No waitlist entries found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* ALL RESERVATIONS */}
        <section className="admin-card" style={{ marginTop: '24px' }}>
          <h3>All Reservations</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(res => (
                  <tr key={res.id}>
                    <td>#{res.id.slice(-6).toUpperCase()}</td>
                    <td>{res.name}</td>
                    <td>{res.email}</td>
                    <td>${res.total}</td>
                    <td>{res.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr><td colSpan={5} style={{textAlign:'center'}}>No reservations yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}
