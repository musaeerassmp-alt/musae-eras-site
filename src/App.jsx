import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID
const REDIRECT_URI = window.location.origin + '/login'

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
)

const FRASES_FILOSOFICAS = [
  { texto: "A alegria não está nas coisas, está em nós.", autor: "Richard Wagner" },
  { texto: "O coração tem razões que a própria razão desconhece.", autor: "Blaise Pascal" },
  { texto: "Onde há amor, há vida.", autor: "Mahatma Gandhi" },
  { texto: "A música exprime o que não pode ser dito e sobre o qual é impossível calar.", autor: "Victor Hugo" },
  { texto: "A felicidade é a única coisa que se duplica quando se compartilha.", autor: "Albert Schweitzer" },
  { texto: "A beleza das coisas existe no espírito de quem as contempla.", autor: "David Hume" },
  { texto: "O homem é o que ele sente.", autor: "Aristóteles" },
  { texto: "A melancolia é a felicidade de ser triste.", autor: "Victor Hugo" },
  { texto: "Sentir é criar. Sentir é pensar sem ideias.", autor: "Fernando Pessoa" },
  { texto: "A amizade é uma alma que habita em dois corpos.", autor: "Aristóteles" }
]

const Home = () => {
  const [frase, setFrase] = useState({ texto: "", autor: "" })
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * FRASES_FILOSOFICAS.length)
    setFrase(FRASES_FILOSOFICAS[randomIndex])
  }, [])
  return (
    <PageTransition>
      <div className="main-content home-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="home-hero"
        >
          <h1 className="home-title">Musae Eras</h1>
          <div className="quote-container">
            <p className="quote-text">"{frase.texto}"</p>
            <p className="quote-author">— {frase.autor}</p>
          </div>
          <div className="home-divider"></div>
          <p className="home-subtitle">Conecte seu Discord para começar sua sinfonia.</p>
        </motion.div>
      </div>
    </PageTransition>
  )
}

const Forum = () => {
  const [activeSection, setActiveSection] = useState('intro')
  return (
    <PageTransition>
      <div className="main-content">
        <div className="forum-container">
          <div className="forum-header">
            <h1>📜 Fórum Musae Eras</h1>
            <p className="forum-intro-text">
              Bem-vindo ao centro de conhecimento do nosso mundo. Aqui você encontrará os registros das eras passadas,
              os segredos das raças que habitam estas terras e as leis que regem a nossa sinfonia.
            </p>
          </div>
          <div className="forum-nav">
            <button className={`forum-nav-btn ${activeSection === 'historia' ? 'active' : ''}`} onClick={() => setActiveSection('historia')}>📖 História do Mundo</button>
            <button className={`forum-nav-btn ${activeSection === 'racas' ? 'active' : ''}`} onClick={() => setActiveSection('racas')}>👥 Raças Disponíveis</button>
          </div>
          <div className="forum-content">
            <AnimatePresence mode="wait">
              {activeSection === 'intro' && (
                <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="forum-section-placeholder">
                  <div className="placeholder-card"><h3>Selecione uma categoria acima</h3></div>
                </motion.div>
              )}
              {activeSection === 'historia' && (
                <motion.div key="historia" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lore-section">
                  <div className="lore-intro-card">
                    <h3 className="lore-title">Abertura: O Despertar da Sinfonia</h3>
                    <div className="lore-text-content">
                      <p className="lore-highlight">Na vasta e silenciosa escuridão do universo, algo cantou.</p>
                      <p>Dessa primeira nota, o silêncio foi quebrado e o mundo começou a se moldar. Onde antes havia apenas o vazio, surgiram montanhas que parecem tocar o céu, florestas que sussurram segredos ao vento e oceanos que guardam o peso de eras esquecidas.</p>
                      <div className="lore-divider">🎵</div>
                      <p>Muito antes de sua chegada, no ano 999, as terras deste continente já carregavam cicatrizes de histórias antigas. Agora, no ano 1000, um marco histórico se aproxima: o milésimo aniversário do primeiro reino humano e da fundação da capital <strong>Chrona</strong>.</p>
                      <p>Este vasto território é habitado majoritariamente por <strong>humanos</strong>, mas entre ruelas e mercados, é possível cruzar o caminho de <strong>demônios</strong>, <strong>anjos</strong>, <strong>Quimeras</strong> e <strong>Aquarianos</strong>.</p>
                      <div className="lore-divider">🎵</div>
                      <p className="lore-footer">Ao desembarcar nestas terras, você não é apenas um espectador, mas uma nova nota nesta sinfonia inacabada.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeSection === 'racas' && (
                <motion.div key="racas" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="forum-section">
                  <h2 className="section-title">👥 Raças Disponíveis</h2>
                  <div className="race-grid">
                    {['Humanos', 'Anjos', 'Demônios', 'Quimeras', 'Aquarianos'].map(raca => (
                      <div key={raca} className="race-card placeholder">
                        <h4>{raca}</h4>
                        <p>Informações em breve.</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

const CriarFicha = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(location.state?.loreData || { nick: '', nome: '', idade: '', raca: '', historia: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  if (!user) return <div className="main-content"><h1>Acesso Restrito</h1></div>
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await supabase.from('lores').insert([{
      ...formData,
      discord_tag: user.username + '#' + user.discriminator,
      status: 'Em Análise',
      motivo_recusa: null
    }])
    if (error) { alert('Erro: ' + error.message); setIsSubmitting(false); }
    else { alert('Enviado!'); navigate('/perfil'); }
  }
  return (
    <PageTransition>
      <div className="main-content">
        <div className="compor-container">
          <div className="compor-header"><h1>✍️ Componha sua Obra</h1></div>
          <form className="compor-form" onSubmit={handleSubmit}>
            <div className="form-section-card">
              <div className="form-grid">
                <div className="form-group"><label>Nick</label><input type="text" required value={formData.nick} onChange={(e) => setFormData({...formData, nick: e.target.value})} /></div>
                <div className="form-group"><label>Nome</label><input type="text" required value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} /></div>
                <div className="form-group"><label>Idade</label><input type="number" value={formData.idade} onChange={(e) => setFormData({...formData, idade: e.target.value})} /></div>
                <div className="form-group"><label>Raça</label><input type="text" value={formData.raca} onChange={(e) => setFormData({...formData, raca: e.target.value})} /></div>
              </div>
            </div>
            <div className="form-section-card">
              <label>História</label>
              <textarea required value={formData.historia} onChange={(e) => setFormData({...formData, historia: e.target.value})} style={{ minHeight: '200px' }} />
            </div>
            <button type="submit" disabled={isSubmitting} className="primary-btn">{isSubmitting ? 'Enviando...' : 'Enviar'}</button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

const LoreModal = ({ lore, isOpen, onClose, atualizarStatus, isAdminView }) => {
  const [motivo, setMotivo] = useState('')
  const [showRejectInput, setShowRejectInput] = useState(false)
  if (!isOpen || !lore) return null
  const handleReject = () => {
    if (!motivo.trim()) return alert('Insira um motivo.')
    atualizarStatus(lore.id, 'Recusada', motivo)
    onClose()
  }
  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
      <motion.div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{lore.nome}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="modal-info-grid">
          <div className="modal-info-item"><span>Discord:</span> {lore.discord_tag}</div>
          <div className="modal-info-item"><span>Status:</span> {lore.status}</div>
        </div>
        <div className="modal-lore-text">{lore.historia}</div>
        {showRejectInput && (
          <div className="modal-reject-area">
            <textarea placeholder="Motivo..." value={motivo} onChange={(e) => setMotivo(e.target.value)} />
            <button onClick={handleReject}>Confirmar Recusa</button>
          </div>
        )}
        <div className="modal-actions">
          {isAdminView && !showRejectInput && (
            <>
              <button onClick={() => { atualizarStatus(lore.id, 'Aprovada'); onClose(); }}>Aprovar</button>
              <button onClick={() => setShowRejectInput(true)}>Recusar</button>
            </>
          )}
          <button onClick={onClose}>Fechar</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const LoreCard = ({ f, onExpand }) => (
  <div className="lore-card" onClick={() => onExpand(f)}>
    <div className="lore-card-header">
      <p><strong>{f.nick}</strong></p>
      <span>→</span>
    </div>
    <div className="lore-card-preview">
      <p>Nome: {f.nome}</p>
      <p>Status: {f.status}</p>
    </div>
  </div>
)

const Profile = ({ user }) => {
  const [myLores, setMyLores] = useState([])
  const [selectedLore, setSelectedLore] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()
  useEffect(() => { if (user) fetchMyLores() }, [user])
  const fetchMyLores = async () => {
    const discordTag = user.username + '#' + user.discriminator
    const { data } = await supabase.from('lores').select('*').eq('discord_tag', discordTag).order('created_at', { ascending: false })
    setMyLores(data || [])
  }
  if (!user) return <div className="main-content"><h1>Login necessário</h1></div>
  const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`
  return (
    <PageTransition>
      <div className="main-content">
        <div className="profile-header">
          <img src={avatarUrl} alt="Avatar" className="profile-avatar" />
          <div className="profile-info"><h1>@{user.username}</h1></div>
        </div>
        <div className="profile-content">
          <h2 className="profile-section-title">Suas Partituras</h2>
          <div className="profile-lores-grid">
            {myLores.map(lore => (
              <div key={lore.id} className="profile-lore-item">
                <LoreCard f={lore} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />
                {lore.status === 'Recusada' && <button onClick={() => navigate('/compor', { state: { loreData: lore } })} className="profile-fix-btn">Corrigir</button>}
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence>{modalOpen && <LoreModal lore={selectedLore} isOpen={modalOpen} onClose={() => setModalOpen(false)} isAdminView={false} />}</AnimatePresence>
      </div>
    </PageTransition>
  )
}

const AdminPanel = ({ user }) => {
  const [lores, setLores] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState('lores')
  const [selectedLore, setSelectedLore] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => { if (user) verificarAdmin() }, [user])
  const verificarAdmin = async () => {
    const { data } = await supabase.from('admins').select('*').eq('discord_id', user.id).single()
    if (data) { setIsAdmin(true); fetchLores(); }
  }
  const fetchLores = async () => {
    const { data } = await supabase.from('lores').select('*').order('created_at', { ascending: false })
    setLores(data || [])
  }
  const atualizarStatus = async (id, status, motivo = null) => {
    await supabase.from('lores').update({ status, motivo_recusa: motivo }).eq('id', id)
    fetchLores()
  }
  if (!isAdmin) return <div className="main-content"><h1>Acesso Negado</h1></div>
  return (
    <PageTransition>
      <div className="main-content">
        <div className="admin-header"><h1>Painel do Maestro</h1></div>
        <div className="admin-columns">
          {['Em Análise', 'Aprovada', 'Recusada'].map(status => (
            <div key={status} className="admin-column">
              <h2>{status}</h2>
              {lores.filter(f => f.status === status).map(f => <LoreCard key={f.id} f={f} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />)}
            </div>
          ))}
        </div>
        <AnimatePresence>{modalOpen && <LoreModal lore={selectedLore} isOpen={modalOpen} onClose={() => setModalOpen(false)} atualizarStatus={atualizarStatus} isAdminView={true} />}</AnimatePresence>
      </div>
    </PageTransition>
  )
}

const WhiteList = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)
  const handleSearch = async (e) => {
    e.preventDefault()
    const { data } = await supabase.from('lores').select('*').eq('nick', search).order('created_at', { ascending: false }).limit(1)
    setResult(data?.[0] || 'not_found')
  }
  return (
    <PageTransition>
      <div className="main-content">
        <div className="whitelist-container">
          <h1>🔍 Consulta</h1>
          <form onSubmit={handleSearch} className="whitelist-search-card">
            <input type="text" placeholder="Nick..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit">Consultar</button>
          </form>
          {result && result !== 'not_found' && (
            <div className="result-card">
              <h2>{result.nome}</h2>
              <p>Status: {result.status}</p>
              {result.motivo_recusa && <p>Motivo: {result.motivo_recusa}</p>}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

const LoginPage = () => {
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1))
    const accessToken = fragment.get('access_token')
    if (accessToken) {
      fetch('https://discord.com/api/users/@me', { headers: { authorization: `Bearer ${accessToken}` } })
        .then(res => res.json())
        .then(user => { localStorage.setItem('discord_user', JSON.stringify(user)); window.location.href = '/'; })
    } else {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`
    }
  }, [])
  return <h1>Conectando...</h1>
}

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('discord_user')))
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => { if (user) verificarAdmin() }, [user])
  const verificarAdmin = async () => {
    const { data } = await supabase.from('admins').select('*').eq('discord_id', user.id).single()
    setIsAdmin(!!data)
  }
  return (
    <Router>
      <div className="container">
        <aside className="sidebar">
          <Link to="/" className="logo-section"><img src="/rat1.png" alt="Logo" className="sidebar-logo" /><span className="sidebar-title">Musae Eras</span></Link>
          <nav className="sidebar-nav">
            {user && <Link to="/perfil" className="nav-item"><span>Perfil</span></Link>}
            <Link to="/forum" className="nav-item"><span>Fórum</span></Link>
            <Link to="/compor" className="nav-item"><span>Compor</span></Link>
            <Link to="/whitelist" className="nav-item"><span>WhiteList</span></Link>
            {isAdmin && <Link to="/admin" className="nav-item"><span>👑 Admin</span></Link>}
            {user ? <button onClick={() => { localStorage.removeItem('discord_user'); window.location.href = '/'; }}>Sair</button> : <Link to="/login">Login</Link>}
          </nav>
        </aside>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Profile user={user} />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/compor" element={<CriarFicha user={user} />} />
          <Route path="/whitelist" element={<WhiteList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
