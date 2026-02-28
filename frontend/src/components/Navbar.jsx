import { NavLink } from 'react-router-dom'
import {
    Home, Upload, Wand2, BarChart2, Download, Sun, Moon, Database, Menu, X, LogIn, LogOut, UserPlus, User
} from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'

const links = [
    { to: '/', label: 'Home', icon: Home, exact: true },
    { to: '/upload', label: 'Upload', icon: Upload },
    { to: '/clean', label: 'Clean', icon: Wand2 },
    { to: '/visualize', label: 'Visualize', icon: BarChart2 },
    { to: '/export', label: 'Export', icon: Download },
]

export default function Navbar() {
    const { theme, toggleTheme, filename, sessionId } = useApp()
    const { isAuthenticated, user, logout } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <nav
            style={{
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
            }}
        >
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', height: 64 }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1 }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: 'linear-gradient(135deg,#6366f1,#22d3ee)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Database size={20} color="white" />
                    </div>
                    <div>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                            Data<span style={{ color: '#6366f1' }}>Clean</span>
                        </span>
                        {filename && (
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1 }}>
                                📁 {filename.length > 22 ? filename.slice(0, 22) + '…' : filename}
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop links */}
                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
                    {links.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            style={({ isActive }) => ({
                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                padding: '0.45rem 0.9rem', borderRadius: '0.5rem',
                                fontSize: '0.88rem', fontWeight: 600,
                                textDecoration: 'none',
                                color: isActive ? '#6366f1' : 'var(--text-secondary)',
                                background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                                transition: 'all 0.15s',
                            })}
                        >
                            <Icon size={15} />
                            {label}
                        </NavLink>
                    ))}

                    <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 0.5rem' }} />

                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: '0.5rem', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>
                                <LogIn size={15} /> Login
                            </NavLink>
                            <NavLink to="/register" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: '0.5rem', fontSize: '0.88rem', fontWeight: 600, color: 'white', background: '#6366f1', textDecoration: 'none' }}>
                                <UserPlus size={15} /> Sign Up
                            </NavLink>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                                <User size={14} color="var(--text-secondary)" />
                                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'User'}</span>
                            </div>
                            <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.88rem', fontWeight: 600, color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Logout">
                                <LogOut size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    style={{
                        marginLeft: '1rem', border: '1px solid var(--border)', borderRadius: '0.5rem',
                        background: 'var(--bg-input)', padding: '0.45rem', cursor: 'pointer',
                        color: 'var(--text-secondary)', display: 'flex', alignItems: 'center',
                    }}
                    title="Toggle theme"
                >
                    {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </button>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen((o) => !o)}
                    style={{
                        marginLeft: '0.5rem', border: '1px solid var(--border)', borderRadius: '0.5rem',
                        background: 'var(--bg-input)', padding: '0.45rem', cursor: 'pointer',
                        color: 'var(--text-secondary)', display: 'none',
                    }}
                    className="mobile-menu-btn"
                >
                    {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div style={{ padding: '0.75rem 1.5rem 1rem', borderTop: '1px solid var(--border)' }}>
                    {links.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            onClick={() => setMobileOpen(false)}
                            style={({ isActive }) => ({
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.65rem 0.9rem', borderRadius: '0.5rem',
                                fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
                                color: isActive ? '#6366f1' : 'var(--text-secondary)',
                                background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                                marginBottom: '0.25rem',
                            })}
                        >
                            <Icon size={17} />
                            {label}
                        </NavLink>
                    ))}

                    <div style={{ height: 1, background: 'var(--border)', margin: '0.75rem 0' }} />

                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 0.9rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', marginBottom: '0.25rem' }}>
                                <LogIn size={17} /> Login
                            </NavLink>
                            <NavLink to="/register" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 0.9rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'white', background: '#6366f1', textDecoration: 'none' }}>
                                <UserPlus size={17} /> Sign Up
                            </NavLink>
                        </>
                    ) : (
                        <button onClick={() => { logout(); setMobileOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 0.9rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                            <LogOut size={17} /> Logout ({user?.name || 'User'})
                        </button>
                    )}
                </div>
            )}

            <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </nav>
    )
}
